import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import { baseUrl } from '@/constants/Http';

const IndividualPayment = (props: any) => {
  const { studentID, setShowPayment } = props;
  const [monthlyRent, setMonthlyRent] = useState(0);
  const [paymentTo, setPaymentTo] = useState('');
  const [paymentVia, setPaymentVia] = useState('Cash');
  const [paymentDate, setPaymentDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [otherPayment, setOtherPayment] = useState(0);
  const [otherPaymentDetails, setOtherPaymentDetails] = useState('');

  const handleDateChange = (event : any, selectedDate:any) => {
    const currentDate = selectedDate || paymentDate;
    setShowDatePicker(false);
    setPaymentDate(currentDate);
  };


  const handlePaymentSubmit = async () => {
    const paymentData = {
      studentID,
      monthlyRent,
      paymentTo,
      paymentVia,
      paymentDate,
      otherPayment,
      otherPaymentDetails
    };
    console.log('Payment Data:', paymentData);

    try {
      const response = await axios.post(`${baseUrl}/api/payment_details/add_payment_details`, paymentData);
      console.log('Payment submitted successfully:', response.data);
    } catch (error) {
      console.log('Error submitting payment:', error);
    }
  };

  return (
    <View className='p-4'>
      {/* Monthly Hostel Rent */}
      <View className='mb-4'>
        <Text className='text-lg font-bold'>Monthly Hostel Rent</Text>
        <TextInput
          className='border p-2 mt-2'
          placeholder="Enter rent amount"
          keyboardType="numeric"
          value={monthlyRent}
          onChangeText={setMonthlyRent}
        />
      </View>

      {/* Payment To */}
      <View className='mb-4'>
        <Text className='text-lg font-bold'>Payment To</Text>
        <TextInput
          className='border p-2 mt-2'
          placeholder="Enter payment recipient"
          value={paymentTo}
          onChangeText={setPaymentTo}
        />
      </View>

      {/* Payment Via */}
      <View className='mb-4'>
        <Text className='text-lg font-bold'>Payment Via</Text>
        <Picker
          selectedValue={paymentVia}
          className='border p-2 mt-2'
          onValueChange={(itemValue:any) => setPaymentVia(itemValue)}
        >
          <Picker.Item label="Cash" value="Cash" />
          <Picker.Item label="Gpay" value="Gpay"  />
          <Picker.Item label="Phonepe" value="Phonepe" />
          <Picker.Item label="Paytm" value="Paytm" />
          <Picker.Item label="Debit/Credit/Netbanking" value="Debit/Credit/Netbanking" /> 

         
        </Picker>
      </View>

      {/* Date of Payment */}
      <View className='mb-4'>
        <Text className='text-lg font-bold'>Date of Payment</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <View className='border p-2 mt-2'>
            <Text>{paymentDate.toDateString()}</Text>
          </View>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
          
            value={paymentDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>

      {/* Other Payment */}
      <View className='mb-4'>
        <Text className='text-lg font-bold'>Other Payment Amount</Text>
        <TextInput
        
          className='border p-2 mt-2'
          placeholder="Enter any other payment amount"
          keyboardType="numeric"
          value={otherPayment}
          onChangeText={setOtherPayment}
        />
      </View>
      <View className='mb-4'>
        <Text className='text-lg font-bold'>Other Payment Details</Text>
        <TextInput
          className='border p-2 mt-2'
          placeholder="Enter any other payment details"
          value={otherPaymentDetails}
          onChangeText={setOtherPaymentDetails}
        />
      </View>

      {/* Submit Button */}
      <Button title="Submit Payment" onPress={() => {
        handlePaymentSubmit();
        setShowPayment(false)

      }} />
    </View>
  );
};

export default IndividualPayment;

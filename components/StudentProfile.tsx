import { StyleSheet, Text, View, ScrollView, Button, ScrollViewBase } from "react-native";
import React, { useState, useEffect } from "react";
import IndividualPayment from "./IndividualPayment";
import axios from "axios";
import { baseUrl } from "@/constants/Http";
import { toDate } from "validator";

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const StudentProfile = (props: any) => {
  const { id } = props;

  const [showPayment, setShowPayment] = useState(false);
  const [studentID, setStudentID] = useState(id);
  const [paymentData, setPaymentData] = useState<{ paymentDate: string; RentAmount: number; otherPayment: number; paymentMode: string; }[]>([]);
  const [studentData, setStudentData] = useState<{ name?: string; admissionDate?: string; paymentDetails?: { month: string; amount: number; paymentMethod: string; paymentDate: string; }[] }>({});

  

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        console.log('inside::'+studentID);
        const bodyParams:any = {  id: studentID };
        console.log('bodyParams::'+bodyParams.id);
        const studentRes=await axios.post(`${baseUrl}/api/add_student/one_student`, bodyParams)
        
        setStudentData(studentRes.data.data[0]);
        console.log(studentData);

        await axios.get(`${baseUrl}/api/payment_details/get_payment_details`, {
          params: {
            studentID: studentID
          }
        }).then((response) => {
          setPaymentData(response.data.data);
          console.log(response.data);
          return response;
        });  
        //setPaymentData(payData.data);
        //console.log('paymentData::'+paymentData);
        
      } catch (error) {
        console.log(error);
      }
    };


    fetchStudent();
    setStudentID(id);

    
  }, [showPayment]);

  return (
    <View>
      <View className="bg-gray-100 p-4 ">
        <View className="mb-6 flex justify-center items-center">
          <Text className="text-3xl font-bold text-center">
            {studentData.name}
          </Text>
          <Text className="text-center text-gray-600 mt-2">
            Admission date: {formatDate(studentData.admissionDate || '')}
          </Text>
          <View className="w-1/2 mt-4">
            <Button
              onPress={() => setShowPayment(!showPayment)}
              title="Add Payment"
              color="#841584"
              accessibilityLabel=""
            />
          </View>
        </View>
        {showPayment ? (
          <View>
            <IndividualPayment setShowPayment={setShowPayment} studentID={studentID}  />
          </View>
        ) : null}
        <View className="mb-8 h-5/6">
          <Text className="text-2xl font-semibold mb-4">
            Previous Payment Details
          </Text>

            <ScrollView>
            {Array.isArray(paymentData) && paymentData.map((payment, index) => (
              <View key={index} className="bg-white p-4 mb-4 rounded-lg shadow">
              <Text className="text-xl font-medium">
                Date Range {payment.paymentDate}
              </Text>
              <Text className="text-lg text-gray-700">
                Amount: ₹{ Number(payment.otherPayment) }
              </Text>
              <Text className="text-lg text-gray-700">
                Payment Method: {payment.paymentMode}
              </Text>
              <Text className="text-lg text-gray-700">
                Payment Date: {payment.paymentDate}
              </Text>
              </View>
            ))}
            </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default StudentProfile;

const styles = StyleSheet.create({});

import { StyleSheet, Text, View,TextInput , Button} from 'react-native'
import React from 'react'
import { useState , useEffect} from 'react';
import axios from 'axios';
import { baseUrl } from '@/constants/Http';
import { router } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { indianStates } from '@/constants/Country';
import { getIndiaDistrict } from '@/constants/Country';
import { stateListCode } from '@/constants/DropDownData';

const AddNewHostel = () => {

    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [stateName, setStateName] = useState("");
    const [districtList, setDistrictList] = useState([]);
    const [hostelID, setHostelID] = useState("");
    const [counter, setCounter] = useState(0);
    const [hostelList, setHostelList] = useState([]);

    useEffect(() => {
        const fetchHostelList = async () => {
          try {
            const response = await axios.get(`${baseUrl}/api/hostel_list/get_hostels`);
            //console.log(response.data.data.length);
            const data=response.data.data;
            setCounter(data.length);
            setHostelList(data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchHostelList();
        setHostelID( generateHostelID(counter));
      }, [name]);



    const handleDistrict= (stateName:any) => {
        //setStateCode(key);
        setStateName(stateName);
        //console.log(stateName, stateCode);
        
       const data=getIndiaDistrict(stateListCode[stateName]);
       setDistrictList(data);
      }

    const dataPickerCommon = (dataTemp: any)=>  dataTemp?.map((item:any) => {
        //console.log("inside picker"+item)
        return (
          
          <Picker.Item
          
            label={item.Name}
            value={item.Name}
            key={item.state?item.code:item.Name}
            
          />
        );
      })

      const  generateHostelID=(counter:any)=> {
        const currentYear = new Date().getFullYear();
        const lastTwoDigitsOfYear = currentYear % 100;  // Get the last two digits of the year
      
        let hostelID;
        if (counter < 100) {
          hostelID = `${lastTwoDigitsOfYear}H000${counter}`;
        } else {
          hostelID = `${lastTwoDigitsOfYear}H00${counter}`;
        }
      
        counter++;
      
        return hostelID;
      }

    const handleAddHostel = async () => {
      
      const paramsBody: any = {
        name: name,
        city: city,
        mobile: phone,
        email:email,
        state:stateName,
        hostelID:hostelID
      };
      console.log(paramsBody);
      await axios
        .post(`${baseUrl}/api/hostel_list/add_hostels`, paramsBody)
        .then((response) => {
          console.log(response.status);
          if (response.status == 201) {
            alert("hostel added successfully");
            router.push("/pages/dash/OwnerHome");
          }
          //console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          // always executed
        })
      
    }



  return (
    <View className='flex-1' >
      <View className="flex-1 w-full items-center justify-center bg-gray-950">
      <View className="px-4 w-full max-w-sm">
        <Text className="text-5xl font-bold mb-6 text-gray-50">Add New Hostel</Text>
        <View className="flex flex-col gap-4 my-8">
          <TextInput
            placeholder="Name"
            className="bg-white"
            onChangeText={(e) => setName(e)}
          />
          <TextInput
            placeholder="Mobile Number"
            className="bg-white"
            keyboardType='numeric'
            maxLength={10}
            onChangeText={(e) => setPhone(e)}
          />
          <TextInput
          
          placeholder="email"
          className="bg-white"
          onChangeText={(e) => setEmail(e)}
        />
            <View className=" bg-white rounded-md py-1">
            <Text className="text-lg font-bold">State</Text>
            <Picker
              selectedValue={stateName}
              className="border p-1 mt-1"
              onValueChange={(itemValue: any) => {

                handleDistrict(itemValue);
                setStateName(itemValue)
              }}
            >
              {dataPickerCommon(indianStates)}
              
            </Picker>
          </View>
          <View className=" bg-white rounded-md py-1">
            <Text className="text-lg font-bold">City</Text>
            <Picker
              selectedValue={city}
              className="border p-1 mt-1"
              onValueChange={(itemValue: any) => setCity(itemValue)}
            >
              
              {
                dataPickerCommon(districtList)
              
              }
              
            </Picker>
          </View>
          
          
        </View>

        
        <View className="my-5"></View>

        <Button
          onPress={() => handleAddHostel()}
          title="Add Hostel"
          color="#841584"
          accessibilityLabel=""
        />
      </View>
    </View>
    </View>
  )
}

export default AddNewHostel

const styles = StyleSheet.create({})
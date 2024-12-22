import { View, Text, Pressable, TextInput, Button,ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import validator, { isLocale } from "validator";
import axios from "axios";
import { baseUrl } from "@/constants/Http";
import Toast from 'react-native-toast-message';
import { Link, router } from "expo-router";



const Register = () => {
  const [userName, setName] = useState("");
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState("");
  const [disable, setDisable] = useState(true);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [disableVerifyPhone, setDisableVerifyPhone] = useState(false);
  const [otp, setOtp] = useState("");
  const [mail, setEmail] = useState('');

  const handleRegister = async () => {
    //console.log(validator.isEmail(email));
    //console.log(validator.isAlphanumeric(password ));
  
    const paramsBody: any = {
      name: userName,
      phone: phone,
      city: city,
      email:mail,
    };
    await axios
      .post(`${baseUrl}/api/user_details/create_account`, paramsBody)
      .then((response) => {
        console.log(response.status)
        if(response.status==201){
          alert("user added successfully");
          router.push("/pages/dash/OwnerHome");
        }
        //console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  const verifyPhone = async () => {
    console.log(phone.length);
    if (phone.length == 10 && otp.length == 6) {
      await axios
        .post(`${baseUrl}/api/otp_service/verifyOTP`, {
          mobile: phone,
          otp: otp,
        })
        .then((response) => {
          const data=response.data.data;
          console.log(data);
          
          
          if(data.status=='approved'){
            alert("phone verified successfully");
            setPhoneVerified(true);
          }else{
            alert("invalid otp, try again!");
          }
        });
    } else {
      alert("invalid otp");
    }
  };
  const sendOTP = async (e:any) => {
    setIsLoading(true);
    setPhone(e);
    console.log(e);
    try {
      if (e.length == 10) {
        console.log("otp sent");
        await axios
          .post(`${baseUrl}/api/otp_service/sendOTP`, {
            mobile: e,
          })
          .then((response) => {
            console.log(response.data);
            alert("otp sent");
          });
      } else {
        console.log("invalid phone");
      }
      
    } catch (error) {
      console.log(error);
      
    }
    finally{
      setIsLoading(false);
    }
  };

  /*
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [serverUrl, roomId]);
*/
  return (
    <View className="flex-1 w-full items-center justify-center bg-gray-950">
      <View className="px-4 w-full max-w-sm">
        <Text className="text-5xl font-bold mb-6 text-gray-50">Register</Text>
        <View className="flex flex-col gap-4 my-8">
          <TextInput
            placeholder="Name"
            className="bg-white"
            onChangeText={(e) => setName(e)}
          />
          <TextInput
          
            placeholder="city"
            className="bg-white"
            onChangeText={(e) => setCity(e)}
          />
          <TextInput
          
          placeholder="email"
          className="bg-white"
          onChangeText={(e) => setEmail(e)}
        />
          <View className="relative" >
           
          <TextInput
            placeholder="Enter 10 digit of phone"
            maxLength={10}
            keyboardType="numeric"
            className="bg-white "
            onChangeText={(e) => {
              
              if (e.length == 10) {
                
                setDisableVerifyPhone(false);
                sendOTP(e);
              } else {
                setDisableVerifyPhone(true);
              }
            }}
          />
           {isLoading ?<ActivityIndicator size="small"  color="#bc2b78" className="absolute right-2 top-1/2 transform -translate-y-2" />:null }
          
          </View>
          {!phoneVerified && (
            <TextInput
            placeholder="Enter OTP"
            
            maxLength={6}
            keyboardType="numeric"
            className="bg-white"
            onChangeText={(e) => {
              setOtp(e);
            }}
          />
          )}
        </View>

        {!phoneVerified && (
          <Button
            onPress={() => verifyPhone()}
            title="Verify phone"
            color="#841584"
            accessibilityLabel=""
            disabled={disableVerifyPhone}
          />
        )}
        <View className="my-5"></View>

        <Button
          disabled={!phoneVerified}
          onPress={() => handleRegister()}
          title="Register"
          color="#841584"
          accessibilityLabel=""
        />
      </View>
    </View>
  );
};

export default Register;

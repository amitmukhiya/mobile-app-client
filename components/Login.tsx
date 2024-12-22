import { View, Text, Pressable, TextInput, Button } from "react-native";
import React, {useEffect, useState} from 'react';
import validator, { isLocale } from 'validator';
import axios from 'axios';
import {baseUrl} from '@/constants/Http';
import { Link, router } from "expo-router";





const Login = () => {
  const [phone, setPhone]=useState('');
  const [otp, setOTP] = useState('');
  const [disable, setDisable] = useState(false);

  const handleLogin = async() => {
  
    const paramsBody:any={
      phone:phone,
    }

      await axios.post(`${baseUrl}/api/user_details/login_account`, paramsBody )
      .then( (response) =>{
        if(response.status==200){
          alert("user logged in successfully");
          router.push("/pages/dash/OwnerHome");
        }
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  
  };

  const verifyOTP = async () => {
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
            handleLogin();
            //alert("phone verified successfully");
          }else{
            alert("invalid otp, try again!");
          }
        });
    } else {
      alert("invalid otp");
    }
  };
  const sendOTP = async () => {
    console.log(phone.length);
    try {
      if (phone.length == 10) {
        console.log("otp sent");
        await axios
          .post(`${baseUrl}/api/otp_service/sendOTP`, {
            mobile: phone,
          })
          .then((response) => {
            if(response.status==200){
              alert("otp sent");
            }else{
              alert("otp not sent, try again!");
            }
            console.log(response.data);
            
          });
      } else {
        alert("invalid phone no");
      }
      
    } catch (error) {
      console.log(error);
      
    }
    finally{
      
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
        <Text className="text-5xl font-bold mb-6 text-gray-50">Login</Text>
        <View className="flex flex-col gap-4">
          <TextInput placeholder="Enter Phone no" maxLength={10} className="bg-white" onChangeText={(e)=>setPhone(e)} keyboardType="numeric" />
          <TextInput placeholder="OTP" className="bg-white" onChangeText={(e)=>setOTP(e)} />
        </View>

        <View className="flex flex-row justify-between items-center my-8">

        <View className="min-w-1/3" >
        <Button
          onPress={()=>{
            sendOTP();
            setDisable(true);
            setTimeout(function() {
              setDisable(false);
         },3000);
          }}
          title={disable ? "Try Again in 30s" : "Send OTP"}
          color="#841584"
          accessibilityLabel=""
          disabled={disable}
        />
        </View>
          
          <Pressable >
            <Text onPress={()=>router.push("/pages/register") } className="text-gray-50 font-bold bg-red-700 p-2 rounded-sm ">Register</Text>
          </Pressable>
        </View>

        <Button
          onPress={()=>handleLogin() }
          title="Login"
          color="#841584"
          accessibilityLabel=""
        />
      </View>
    </View>
  );
};

export default Login;

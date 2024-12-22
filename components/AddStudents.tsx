import {
  View,
  Text,
  Pressable,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Alert,
  ScrollView
} from "react-native";
import React, { Key, useEffect, useState } from "react";
import validator, { isLocale } from "validator";
import axios from "axios";
import DropDownViewer from "@/constants/DropDownViewer";
import { PreperationNames,classNameDrop ,coachingName,stateListCode } from "@/constants/DropDownData";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import { baseUrl } from "@/constants/Http";
import { Picker } from "@react-native-picker/picker";
import {indianStates, getIndiaDistrict} from "@/constants/Country";
import { h } from "ionicons/dist/types/stencil-public-runtime";
import { router } from 'expo-router';


const AddStudents = () => {
  const [studentName, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("");
  const [Preparation, setPreparation] = useState("");
  const [className, setClassName] = useState("Select Class");
  const [coaching, setCoaching] = useState("Select Coaching");
  const [gname, setGname] = useState("");
  const [stateName, setStateName] = useState("");
  const [rent, setRent] = useState(Number);
  const [admissionDate, setAdmissionDate] = useState(Date);
  //const [selectedValue, setSelectedValue] = useState("select class");
  const [isClickedClass, setIsClickedClass] = useState(false);
  const [isClickedCoach, setIsClickedCoach] = useState(false);

  const [date, setDate] = useState(dayjs());
  const [dateSelected, setDateSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hostel, setHostel] = useState("select hostel");
  const [hostelList, setHostelList] = useState([]);
  const [stateCode, setStateCode] = useState('UK');
  const [districtList, setDistrictList] = useState([]);
  const [studentID, setStudentID] = useState("");
  const [counter, setCounter] = useState(0);
  const [hostelID, setHostelID] = useState("");

  
  useEffect(() => {
    const fetchHostelList = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/hostel_list/get_hostels`);
        const data=response.data.data;
        setHostelList(data);
        //setCounter(data.length);
        const studentRes=await axios.get(`${baseUrl}/api/add_student/all_students`);
        const studentData=studentRes.data.data;
        setCounter(studentData.length);
        console.log(hostelList)
      } catch (error) {
        console.log(error);
      }
    };


    fetchHostelList();
    setStudentID(generateStudentID(counter));

    
  }, [phone]);

  const handleHostelId= (name:any) => {
    console.log(name);
     return hostelList.find((item: any) => item.Name === name)?._id;
     
  }

  const  generateStudentID=(counter:any)=> {
    // Step 1: Get the last two digits of the current year
    const currentYear = new Date().getFullYear();
    const lastTwoDigitsOfYear = currentYear % 100;  // Get the last two digits of the year
  
    // Step 2: Check if the counter is greater than or equal to 100
    let studentID;
    if (counter < 100) {
      // If counter is less than 100, add 3 zeros
      studentID = `${lastTwoDigitsOfYear}S000${counter}`;
    } else {
      // If counter is greater than or equal to 100, add 2 zeros
      studentID = `${lastTwoDigitsOfYear}S00${counter}`;
    }
  
    // Step 3: Increment the counter for the next student
    counter++;
  
    return studentID;
  }
  const handleDistrict= (stateName: keyof typeof stateListCode) => {
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
      key={item.Name}
      
    />
  );
})
  const handleSaveStudent = async () => {
    const bodyParams = {
      id: studentID,
      name: studentName,
      guardian: gname,
      mobile: phone,
      preparation: Preparation,
      className: className,
      coaching: coaching,
      state: stateName,
      city: district,
      monthlyRent: rent,
      admissionDate: admissionDate,
      hostelName: hostel,
      hostelID: hostelID
    };
    try {
      const response = await axios.post(
        `${baseUrl}/api/add_student`,
        bodyParams
      );
      //console.log(response.data);
      if(response.status==201){
        Alert.alert("Student Added Successfully");
        router.back();
      }
      console.log(response.status);
    } catch (error) {
      Alert.alert("Failed to add the student");
      console.log(error);
    }

    //console.log(classNameDrop);
    console.log("student added");
  };

  return (
    <ScrollView>
      <View className="flex-1 w-full items-center justify-center bg-gray-950 py-2">
      <View className="px-4 w-full max-w-md">
        <Text className="text-4xl font-bold my-2 text-gray-50 px-5  items-center text-center">
          Add Student
        </Text>
        <View className="flex flex-col gap-4 my-4 color-black w-full ">
          <TextInput
            placeholder="Student Name"
            className="bg-white rounded-md"
            onChangeText={(e) => setName(e)}
          />
          <TextInput
            placeholder="Guardian's Name"
            className="bg-white rounded-md"
            onChangeText={(e) => setGname(e)}
          />
          <TextInput
            placeholder="Mobile Number"
            maxLength={10}
            keyboardType="numeric"
            className="bg-white rounded-md"
            onChangeText={(e) => setPhone(e)}
          />
          {/* for Hostel */}

          

          <TextInput
            placeholder="Monthly Hostel Rent"
            className="bg-white rounded-md"
            keyboardType="numeric"
            onChangeText={(text) => {
              //let text2=text.replace(/[^0-9]/g, '')
              setRent(Number(text));
            }}
          />

<View className=" bg-white rounded-md py-1">
            <Text className="text-lg font-bold">Select Hostel</Text>
            <Picker
              selectedValue={hostel}
              className="border p-2 mt-1"
              onValueChange={(itemValue: any) => {
                setHostelID(handleHostelId(itemValue));
                setHostel(itemValue)
              }
              }
            >
              {dataPickerCommon(hostelList)}
            </Picker>
          </View>

          <View className=" bg-white rounded-md py-1">
            <Text className="text-lg font-bold">Preparation</Text>
            <Picker
              selectedValue={Preparation}
              className="border p-2 mt-1"
              onValueChange={(itemValue: any) => setPreparation(itemValue)}
            >
              {dataPickerCommon(PreperationNames)}
            </Picker>
          </View>

          <View className=" bg-white rounded-md py-1">
            <Text className="text-lg font-bold">Class</Text>
            <Picker
              selectedValue={className}
              className="border p-2 mt-1"
              onValueChange={(itemValue: any) => setClassName(itemValue)}
            >
              {dataPickerCommon(classNameDrop)}
            </Picker>
          </View>

          <View className=" bg-white rounded-md py-1">
            <Text className="text-lg font-bold">Coaching</Text>
            <Picker
              selectedValue={coaching}
              className="border p-2 mt-1"
              onValueChange={(itemValue: any) => setCoaching(itemValue)}
            >
              {dataPickerCommon(coachingName)}
              
            </Picker>
          </View>

          <View className=" bg-white rounded-md py-1">
            <Text className="text-lg font-bold">State</Text>
            <Picker
              selectedValue={stateName}
              className="border p-2 mt-1"
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
              selectedValue={district}
              className="border p-2 mt-1"
              onValueChange={(itemValue: any) => setDistrict(itemValue)}
            >
              
              {
                dataPickerCommon(districtList)
              
              }
              
            </Picker>
          </View>

          {/* <TextInput
            placeholder="Preparation"
            className="bg-white"
            onChangeText={(e) => setPreparation(e)}
          />
          <View className="bg-white rounded-sm py-3">
            <TouchableOpacity onPress={() => setIsClickedClass(!isClickedClass)}>
              <Text className=" rounded-sm "> {className} </Text>
            </TouchableOpacity>
            {isClickedClass ? (
              <DropDownViewer
                setSelectedValue={setClassName}
                setIsClickedData={setIsClickedClass}
                dataPass={classNameDrop}
              />
            ) : null}
          </View> 

          <View className="bg-white rounded-sm py-3">
            <TouchableOpacity
              onPress={() => setIsClickedCoach(!isClickedCoach)}
            >
              <Text className=" rounded-sm "> {coaching} </Text>
            </TouchableOpacity>
            {isClickedCoach ? (
              <DropDownViewer
                setSelectedValue={setCoaching}
                setIsClickedData={setIsClickedCoach}
                dataPass={coachingName}
              />
            ) : null}
          </View>
          

          <TextInput
            placeholder="State"
            className="bg-white rounded-md"
            onChangeText={(e) => setState(e)}
          />
          
          <TextInput
            placeholder="District "
            className="bg-white rounded-md"
            onChangeText={(e) => setDistrict(e)}
          />
          */}
          

          <TextInput
            placeholder="Date of Admission"
            value={date.format("DD-MM-YYYY")}
            className="bg-white"
            onPress={() => setDateSelected(!dateSelected)}
          />
          {dateSelected && (
            <View className="flex bg-slate-50">
              <DateTimePicker
                mode="single"
                date={date}
                onChange={(params) => {
                  setDate(dayjs(params.date));
                  setDateSelected(!dateSelected);
                }}
              />
            </View>
          )}
        </View>

        <Button
          onPress={handleSaveStudent}
          title="Save Student"
          color="#841584"
          accessibilityLabel=""
        />
      </View>
    </View>
    </ScrollView>
  );
};

export default AddStudents;

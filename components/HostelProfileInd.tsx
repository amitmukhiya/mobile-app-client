import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    TouchableOpacity,
    FlatList,
    ScrollView,
    SafeAreaView
  } from "react-native";
  import React, { useState , useEffect} from "react";
  import { router } from "expo-router";
  import axios from "axios";
  import { baseUrl } from "@/constants/Http";

const HostelProfileInd = (props:any) => {
    const { h_id } = props;
    const [studentData, setStudentData] = useState([]);
    const [hostelID, setHostelID] = useState(h_id);
    console.log(hostelID);

    useEffect(() => {
      const fetchStudentlList = async () => {
        try {
          const response = await axios.get(`${baseUrl}/api/add_student/hostel_students`, {
            params: {
              hostelID: hostelID,
            },
          });
          const data=response.data.data;
          setStudentData(data);
          console.log(data);
          
          
        } catch (error) {
          console.log(error);
        }
      };
  
  
      fetchStudentlList();
      
  
      
    }, []);
  
    const renderItem = ({ item }: any ) => (
      <>
        <View className=" ">
          <TouchableOpacity onPress={() => router.push(`/pages/studentProfilePage/${item._id}`) }> 
            <View className="p-4 mb-4 bg-gray-100 rounded-lg border border-gray-300">
              <Text className="text-lg font-semibold mb-2">ID: {item.id}</Text>
              <Text className="text-lg font-semibold mb-2 text-blue-500">
                Name: {item.name}
              </Text>
  
              <Text className="text-lg font-semibold mb-2">
                
                Hostel Name: {item.hostelName}
              </Text>
              <Text className="text-lg font-semibold mb-2">
                Status: {item.status}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  
    return (
      <>
        <View className="flex justify-center items-center ">
          <TextInput
            placeholder="Search student"
            className="bg-white rounded-lg border-red-800 w-11/12 m-4 text-center border-2 "
          />
          <View className="flex flex-row  justify-between w-10/12">
            <View className="bg-green-700 px-4 rounded-lg ">
              <Button
                onPress={() => console.log("all")}
                title="All"
                color="#15803d"
                accessibilityLabel="All Students"
              />
            </View>
            <View className="bg-red-700 px-4 rounded-lg ">
              <Button
                onPress={() => console.log("all")}
                title="Due"
                color="#b91c1c"
                accessibilityLabel=""
              />
            </View>
            <View className="bg-green-950 px-4 rounded-lg">
              <Button
                onPress={() => console.log("all")}
                title="Paid"
                color="#052e16"
                accessibilityLabel=""
              />
            </View>
            <View className="bg-teal-950 px-4 rounded-lg">
              <Button
                onPress={() => console.log("all")}
                title="X"
                color=" #042f2e"
                accessibilityLabel=""
              />
            </View>
          </View>
  
          <View>
            <View>
              <Text>Students List</Text>
            </View>
          </View>
        </View>
        <SafeAreaView className="mb-36" >
          
          <View className="" >
            <FlatList
              data={studentData}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
            />
          </View>
          
        </SafeAreaView>
      </>
    );
  };

export default HostelProfileInd

const styles = StyleSheet.create({})
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import axios from "axios";
import { baseUrl } from "@/constants/Http";

const Dashboard = () => {
  const [studentData, setStudentData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchStudentlList = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/add_student/all_students`
        );
        const data = response.data.data;
        setStudentData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudentlList();
  }, [searchQuery]);

  const getSearchedStudent = (text: string) => {
    const filteredData = studentData.filter((item: any) => {
      return (
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.id.toLowerCase().includes(text.toLowerCase())
      );
    });
    setStudentData(filteredData);
  };

  const renderItem = ({ item }: any) => (
    <>
      <View className=" ">
        <TouchableOpacity
          onPress={() => router.push(`/pages/studentProfilePage/${item._id}`)}
        >
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
        <View className="flex-row items-center bg-white p-4 rounded-lg">
          {/* Search Input */}
          <TextInput
            className="flex-1 p-3 border rounded-lg border-red-950"
            placeholder="Search..."
            placeholderTextColor="#A1A1A1"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          {/* Search Button on the right side */}
          <TouchableOpacity
            className="ml-2 p-3 bg-blue-500 rounded-lg"
            onPress={() => getSearchedStudent(searchQuery)}
          >
            <Text className="text-white font-bold">Search</Text>
          </TouchableOpacity>
        </View>
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
      <SafeAreaView className="mb-36">
        <View className="">
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

export default Dashboard;

const styles = StyleSheet.create({});

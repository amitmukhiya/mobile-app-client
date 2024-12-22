import {
  View,
  Text,
  Pressable,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Link, router } from "expo-router";
import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { SearchBar } from "react-native-screens";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { baseUrl } from "@/constants/Http";

const renderItem = ({ item }: any) => (
  <>
    <View className=" ">
      <TouchableOpacity
        onPress={() => router.push(`/pages/hostelProfile/${item._id}`)}
      >
        <View className="p-4 mb-4 bg-gray-100 rounded-lg border border-gray-300">
          
          <Text className="text-xl font-semibold mb-2 text-blue-500">
            Hostel Name: {item.Name}
          </Text>
          <Text className="text-lg font-semibold mb-2">ID: {item.hostelID}</Text>

          <Text className="text-lg font-semibold mb-2">
            Total students: {item.hostelName}
          </Text>
          <Text className="text-lg font-semibold mb-2">
            Status: <Text className="text-green-500">Available</Text>
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  </>
);
function HostelsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [hostelData, setHostelData] = useState([]);

  useEffect(() => {
    const getHostelData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/hostel_list/get_hostels`
        );
        setHostelData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getHostelData();
  }, [searchQuery]);

  const getSearchedHostel = (text: string) => {
    const filteredData = hostelData.filter((item: any) => {
      return (
        item.Name.toLowerCase().includes(text.toLowerCase()) ||
        item.hostelID.toLowerCase().includes(text.toLowerCase())
      );
    });
    setHostelData(filteredData);
  };

  return (
    <View className="flex-1 w-full items-center justify-center">
      
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
                  onPress={() => getSearchedHostel(searchQuery)}
                >
                  <Text className="text-white font-bold">Search</Text>
                </TouchableOpacity>
              </View>

      <View className="flex-1 bg-gray-100 p-4 w-full">
        <Text className="text-2xl font-bold text-center mb-6">Hostel List</Text>
        <Button
          onPress={() => {
            router.push("/pages/addNewHostel");
          }}
          title="Add New Hostel"
          color="#841584"
        />
        <SafeAreaView className="mt-2 mb-36">
          <View className="">
            <FlatList
              data={hostelData}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
            />
          </View>
        </SafeAreaView>

        
      </View>
    </View>
  );
}

export default HostelsPage;

const styles = StyleSheet.create({
  container: {
    flex: 5,
    padding: 10,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 1,
    paddingHorizontal: 0,
    marginBottom: 5,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 5,
    justifyContent: "space-between",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
  },
});

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OwnerHome from "./OwnerHome";
import HostelSection from "./HostelSection";
import AddStudentsSection from "./AddStudentsSection";
import Profile from "./Profile";
import { Ionicons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

const _layout = () => {
  return (
    <Tab.Navigator screenOptions={{
        animation: 'fade',
        tabBarActiveTintColor: '#e91e63', // Active tab color
        tabBarInactiveTintColor: 'gray', // Inactive tab color
        tabBarStyle: {
          backgroundColor: '#333', // Tab bar background color
          borderTopWidth: 0, // Remove top border
          height: 60, // Tab bar height
        },
        tabBarLabelStyle: {
          fontSize: 14, // Label font size
          fontWeight: 'bold', // Label font weight
        },
        tabBarIconStyle: {
          marginBottom: 5, // Space below icon
        },
        
      }}  >
      <Tab.Screen name="Home" component={OwnerHome }  options={{
        
        headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }} />
      <Tab.Screen name="Hostels" component={HostelSection } options={{
        headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="business-outline" color={color} size={size} />
          ),
        }} />
      <Tab.Screen name="Add Student" component={AddStudentsSection } options={{
        headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" color={color} size={size} />
          ),
        }} />
      <Tab.Screen name="Profile" component={Profile } options={{
        headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }} />
      
    </Tab.Navigator>
  );
};

export default _layout;

const styles = StyleSheet.create({});

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StudentProfile from '@/components/StudentProfile'
import { useLocalSearchParams } from 'expo-router';

const studentProfilePage = () => {
    const { id } = useLocalSearchParams();
    const studentID= Array.isArray(id) ? id[0] : id || '';
  return (
    <View className='flex-1' >
      <StudentProfile id={studentID}  />
    </View>
  )
}







export default studentProfilePage

const styles = StyleSheet.create({})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StudentProfile from '@/components/StudentProfile'

const studentProfilePage = () => {
  return (
    <View className='flex-1' >
      <StudentProfile/>
    </View>
  )
}

export default studentProfilePage

const styles = StyleSheet.create({})
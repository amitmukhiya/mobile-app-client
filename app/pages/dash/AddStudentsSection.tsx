import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AddStudents from '@/components/AddStudents'

const AddStudentsSection = () => {
  return (
    <View className='flex-1' >
      <AddStudents/>
    </View>
  )
}

export default AddStudentsSection

const styles = StyleSheet.create({})
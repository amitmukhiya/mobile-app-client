import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HostelProfileInd from '@/components/HostelProfileInd'
import { useLocalSearchParams } from 'expo-router';

const hostelProfile = () => {
     const { id } = useLocalSearchParams();
    const h_id= Array.isArray(id) ? id[0] : id || '';
  return (
    <View>
      <HostelProfileInd h_id={h_id} />
    </View>
  )
}

export default hostelProfile

const styles = StyleSheet.create({})
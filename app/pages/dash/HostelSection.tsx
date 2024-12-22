import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HostelsPage from '@/components/HostelsPage'

const HostelSection = () => {
  return (
    <View className='flex-1' >
      <HostelsPage/>
    </View>
  )
}

export default HostelSection

const styles = StyleSheet.create({})
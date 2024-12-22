import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'

const DropDownViewer = (props:any) => {
  //const {dataPass, setSelectedValue, isClicked, setIsClicked} = props
  //console.log(dataPass)
  return (
    <View className="p-2 h-300 bg-white elevation-sm mt-2 rounded-lg " >
                <FlatList
                  data={props.dataPass}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        props.setSelectedValue(item.Name);
                        props.setIsClickedData(false);
                      }}
                    >
                      <Text className="p-2  border-b-2 self-center justify-center ">{item.Name}</Text>
                    </TouchableOpacity>
                  )}
                />
                
              </View>
  )
}

export default DropDownViewer

const styles = StyleSheet.create({})
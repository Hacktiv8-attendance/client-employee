import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ListAbsence ({ absence, no }) {
  console.log('===============================', absence, '============================')
  return (
    <View>
      <Text>{no + 1}. Work Started: {absence.in.split('T')[0]}, Work Finished: {absence.out.split('T')[0]}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4f9f5',
  },
})
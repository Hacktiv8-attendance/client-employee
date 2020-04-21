import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ListInbox ({ message }) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Ionicons
          name='ios-mail-unread'
          size={30}
          style={{marginBottom: 10, marginLeft: 10}}
          color='#e4f9f5'
        />
        <Text style={styles.textSubject}>{message.message}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#11999e',
    padding: 10,
    paddingBottom: 0,
    borderRadius: 15
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center', 
  },
  textSubject: {
    marginBottom: 10,
    marginLeft: 30,
    color: '#e4f9f5'
  }
})
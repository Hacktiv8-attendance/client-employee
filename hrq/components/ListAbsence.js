import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';

export default function ListAbsence ({ absence, no }) {
  return (
    <View style={styles.container}>
        <Text style={styles.textDate}>Date: {absence.in.split('T')[0]}</Text>
        
        <View style={styles.data}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.text}>Start : {moment(absence.in).format('LT')}</Text>
            <Text style={styles.text}>Work Time : {absence.worktime} Hour's</Text>
          </View>
          
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.text}>Finish : {moment(absence.out).format('LT')}</Text>
            <Text style={styles.text}>Status : {absence.status ? 'Worked' : 'Absent'}</Text>
          </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30
  },
  text: {
    color: '#e4f9f5',
    fontFamily: 'lato'
  },
  textDate: {
    padding: 10,
    borderRadius: 45,
    backgroundColor: '#30e3ca',
    marginBottom: -20,
    zIndex: 1,
    fontFamily: 'lato',
    paddingLeft: 20
  },
  data: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#11999e',
  }
})
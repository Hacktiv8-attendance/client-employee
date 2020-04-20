import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import Constant from 'expo-constants';
import Header from '../components/Header';
import allAction from '../store/actions';

export default function ClaimCutiScreen ({ navigation }) {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [reason, setReason] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('');

  function handleButton () {
    dispatch(allAction.user)
  }

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}/>

      <View style={styles.containerBody}>
        <Text style={styles.textHeader}>Form Paid Leave</Text>

        <Text>Remaining Paid Leave : {user.payload.paidLeave}</Text>
        
        <View style={styles.containerInput}>
          <Text>Reason :</Text>
          <TextInput
            style={styles.input}
            value={reason}
            onChangeText={reason => setReason(reason)}
            placeholder="The reason you claim paid leave"
          />

          <Text>Duration :</Text>
          <TextInput
            style={styles.input}
            value={duration}
            onChangeText={duration => setDuration(duration)}
            keyboardType="numeric"
            placeholder={`cannot exceed ${user.payload.paidLeave}`}
          />

          <Text>Date :</Text>
          <TextInput
            style={styles.input}
            value={date}
            onChangeText={date => setDate(date)}
            keyboardType="numeric"
            placeholder={`YYYY/MM/DD`}
          />
        </View>

        <View>
          <TouchableOpacity style={styles.button} onPress={() => alert('claim cuti')}>
            {user.loading
              ? <ActivityIndicator
                  size='small'
                  color='#e4f9f5'
                />
              : <Text style={styles.buttonText}>Login</Text>}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4f9f5',
  },
  containerBody: {
    padding: 30
  },
  containerInput: {
    paddingTop: 20
  },
  statusBar: {
    height: Constant.statusBarHeight,
    backgroundColor: '#11999e'
  },
  textHeader: {
    fontWeight: 'bold',
    fontSize: 20
  },
  input: {
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 30,
    maxWidth: 700,
    height: 50,
    borderColor: '#30e3ca',
    borderRadius: 5,
  },
  button: {
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#11999e',
  }
})
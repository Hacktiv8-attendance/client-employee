import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator, AsyncStorage } from 'react-native';
import Constant from 'expo-constants';
import Header from '../components/Header';
import allAction from '../store/actions';
import moment from 'moment';
import Footer from '../components/Footer';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ClaimCutiScreen ({ navigation }) {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [reason, setReason] = useState('');
  const [show, setShow] = useState(false)
  const [start, setStart] = useState(new Date());
  const [finish, setFinish] = useState(new Date());
  const [btnLoading, setBtnLoading] = useState(false);
  const today = new Date()
  
  function handleButton () {
    setBtnLoading(true);
    let now = moment(start)
    let end = moment(finish)
    let duration = moment.duration(end.diff(now)).asDays() + 1
    dispatch(allAction.user.requestPaidLeave({ SuperiorId: user.payload.SuperiorId, token: user.token, reason, duration: Math.ceil(duration), leaveDate: new Date(start) }))
  }

  if (user.statusPaidLeave) {
    setTimeout(() => {
      setBtnLoading(false)
      setReason('')
      setStart(new Date())
      setFinish(new Date())
      dispatch(allAction.user.setStatusPaidLeave(''))
    }, 2000)
  }

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}/>

      <Header
        title='Request Paid Leave'
      />

      <ScrollView>
        <View style={styles.containerBody}>
          <Text>Remaining Paid Leave : {user.payload.paidLeave}</Text>

          {user.statusPaidLeave ? <Text style={styles.statusText}>{user.statusPaidLeave}</Text> : <Text style={styles.hiddenText}>test</Text>}
          
          <View style={styles.containerInput}>
            <Text>Reason :</Text>
            <TextInput
              style={styles.input}
              value={reason}
              onChangeText={reason => setReason(reason)}
              placeholder="The reason you claim paid leave"
            />

            <View style={{flexDirection: 'row', marginBottom: 30}}>
              <View style={{flex: 1, marginRight: 8}}>
                <Text>Start Date :</Text>
                <TouchableOpacity
                  style={styles.inputDate}
                  onPress={() => setShow('start')}
                >
                  <Text>{moment(start).format('L')}</Text>
                </TouchableOpacity>
                {show === 'start' && <DateTimePicker 
                  value={start}
                  mode='date'
                  display="default"
                  onChange={(_, selectedDate) => {
                    const date = selectedDate || start
                    setShow('')
                    setStart(date)
                    setFinish(date)
                  }}
                  minimumDate={today}
                />}
              </View>

              <View style={{flex: 1,marginLeft: 8}}>
                <Text>Finish Date :</Text>
                <TouchableOpacity
                  style={styles.inputDate}
                  onPress={() => setShow('finish')}
                >
                  <Text>{moment(finish).format('L')}</Text>
                </TouchableOpacity>
                {show === 'finish' && <DateTimePicker 
                  value={finish}
                  mode='date'
                  display="default"
                  onChange={(_, selectedDate) => {
                    const date = selectedDate || start
                    setShow('')
                    setFinish(date)
                  }}
                  minimumDate={start}
                  maximumDate={new Date(moment(start).add(user.payload.paidLeave - 1, 'd').format('DD MMMM YYYY'))}
                />}
              </View>
            </View>
          </View>

          <View>
            <TouchableOpacity disabled={user.payload.paidLeave === 0 ? true : false} style={styles.button} onPress={() => handleButton()}>
              {btnLoading
                ? <ActivityIndicator
                    size='small'
                    color='#e4f9f5'
                  />
                : <Text style={styles.buttonText}>Request Paid Leave</Text>}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4f9f5',
    justifyContent: 'center'
  },
  containerBody: {
    flex: 1,
    padding: 30,
    paddingTop: 20
  },
  buttonText: {
    textAlign: 'center',
    color: '#e4f9f5'
  },
  containerInput: {
    // paddingTop: 20
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
    marginTop: 10,
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
  },
  hiddenText: {
    marginBottom: 10,
    fontSize: 12,
    color: '#e4f9f5'
  },
  statusText: {
    marginBottom: 10,
    fontSize: 12,
    fontWeight: 'bold',
  },
  inputDate: {
    borderWidth: 1,
    height: 50,
    marginTop: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#30e3ca'
  }
})
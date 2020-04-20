import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator, AsyncStorage } from 'react-native';
import Constant from 'expo-constants';
import Header from '../components/Header';
import allAction from '../store/actions';
import moment from 'moment';
import Footer from '../components/Footer';
// import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-datepicker'

export default function ClaimCutiScreen ({ navigation }) {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [reason, setReason] = useState('');
  const [start, setStart] = useState(new Date());
  const [finish, setFinish] = useState(new Date());
  const [btnLoading, setBtnLoading] = useState(false);

  function handleButton () {
    // setBtnLoading(true);
    let now = moment(start)
    let end = moment(finish)
    let duration = moment.duration(end.diff(now))
    duration = duration.asDays()
    dispatch(allAction.user.requestPaidLeave({ SuperiorId: user.payload.SuperiorId, token: user.token, reason, duration: Math.ceil(duration), leaveDate: new Date(start) }))
  }

  if (user.statusPaidLeave) {
    setTimeout(() => {
      dispatch(allAction.user.setStatusPaidLeave(''))
    }, 3000)
    setTimeout(() => {
      console.log('masuk')
      setBtnLoading(false)
      setReason('')
      setStart(new Date())
      setFinish(new Date())
    }, 1000)
  }

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}/>

      <Header />

      <ScrollView>
        <View style={styles.containerBody}>
          <Text style={styles.textHeader}>Form Paid Leave</Text>

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
                <DatePicker
                  date={start}
                  mode="date"
                  placeholder="select date"
                  minDate={start}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      display: 'none'
                    },
                    dateInput: styles.inputDate
                    
                  }}
                  onDateChange={(date) => {
                    setStart(date)
                    setFinish(date)
                  }}
                />
              </View>

              <View style={{flex: 1,marginLeft: 8}}>
                <Text>Finish Date :</Text>
                <DatePicker
                  date={finish}
                  mode="date"
                  placeholder="select date"
                  minDate={start}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      display: 'none'
                    },
                    dateInput: styles.inputDate
                    
                  }}
                  onDateChange={(date) => {setFinish(date)}}
                />
              </View>
            </View>
          </View>

          <View>
            <TouchableOpacity style={styles.button} onPress={() => handleButton()}>
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
  },
  containerBody: {
    flex: 1,
    padding: 30
  },
  buttonText: {
    textAlign: 'center',
    color: '#e4f9f5'
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
  },
  hiddenText: {
    marginLeft: 30,
    marginBottom: 10,
    fontSize: 10,
    color: '#e4f9f5'
  },
  statusText: {
    marginBottom: 10,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center'
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
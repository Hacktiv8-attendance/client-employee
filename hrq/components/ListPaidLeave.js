import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import allAction from '../store/actions';

export default function ListPaidLeave ({data}) {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [click, setClick] = useState(false)
  const [approve, setApprove] = useState(false)
  const [reject, setReject] = useState(false)
  const [height, setHeight] = useState(0)
  const [marginTop, setMarginTop] = useState(-60)
  const [border, setBorder] = useState(15)
  const [bottom, setBottom] = useState(30)

  const approval = (status) => {
    const payload = { status, id: data.id, token: user.token }
    dispatch(allAction.user.approvePaidLeave(payload))
  }

  const unClick = (type) => {
    if (type === 'approve') {
      setApprove(false)
      dispatch(allAction.user.setClick(false))
      Alert.alert('Success', `You approved this paid leave.`)
    } else {
      setReject(false)
      dispatch(allAction.user.setClick(false))
      Alert.alert('Success', `You rejected this paid leave.`)
    }
  }

  return (
    <View style={{marginBottom: bottom}}>
      <TouchableOpacity style={styles.containerTitle} 
        onPress={() => {
          setClick(!click)
          setHeight(click ? 0 : 300)
          setMarginTop(click ? -60 : -20)
          setBorder(click ? 15 : 0)
          setBottom(click ? 30 : 20)
        }}
        activeOpacity={1}
      >
        <View style={styles.row}>
          <Image
            style={styles.containerImage}
            source={{
              uri: data.Employee.image_url
            }}
          />
          <Text style={styles.textSubject}>{data.Employee.name}</Text>
          <Text style={styles.textSubject}>{moment(data.createdAt).format('dddd, DD MMMM YYYY')}</Text>
        </View>
      </TouchableOpacity>
      
      <View style={[styles.contentContainer, {maxHeight: height, marginTop, borderTopLeftRadius: border, borderTopRightRadius: border}]}>
        <View style={[styles.row, {alignItems: 'flex-start'}]}>
          <Text style={[styles.textBody, {maxHeight: height}]}>Reason : </Text>
          <Text style={[styles.textBody, {maxHeight: height, width: 200}]}>{data.reason}</Text>
        </View>
          <Text style={[styles.textBody, {maxHeight: height}]}>Duration : {data.duration} {data.duration === 1 ? "day": "day's"}</Text>
        <Text style={[styles.textBody, {maxHeight: height}]}>Start : {moment(data.leaveDate).format('dddd, DD MMMM YYYY')}</Text>
        <Text style={[styles.textBody, {maxHeight: height}]}>End : {moment(data.leaveDate).add(data.duration - 1, 'd').format('dddd, DD MMMM YYYY')}</Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              approval(true)
              setApprove(true)
              dispatch(allAction.user.setClick(true))
            }}
            activeOpacity={1}
          > 
            {
              approve
              ? user.loading
              ? <ActivityIndicator
                  size='small'
                  color='#e4f9f5'
                />
              : unClick('approve')
              : <Text style={styles.buttonText}>Approve</Text>
            }
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              approval(false)
              setReject(true)
              dispatch(allAction.user.setClick(true))
            }}
            activeOpacity={1}
          >
            {
              reject
              ? user.loading
              ? <ActivityIndicator
                  size='small'
                  color='#e4f9f5'
                />
              : unClick('reject')
              : <Text style={styles.buttonText}>Reject</Text>
            }
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  containerTitle: {
    backgroundColor: '#11999e',
    padding: 10,
    paddingBottom: 0,
    borderRadius: 15,
    marginBottom: 10,
    zIndex: 1
  },
  containerImage: {
    height: 30,
    width: 30,
    borderRadius:30,
    marginBottom: 10,
    marginLeft: 10
  },
  contentContainer: {
    backgroundColor: '#30e3ca',
    padding: 10,
    paddingTop: 20,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center', 
  },
  textSubject: {
    marginBottom: 10,
    marginLeft: 10,
    color: '#e4f9f5'
  },
  textBody: {
    paddingLeft: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#e4f9f5'
  },
  button: {
    height: 30,
    width: 100,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#11999e',
    margin: 10,
    padding: 10
  }
})
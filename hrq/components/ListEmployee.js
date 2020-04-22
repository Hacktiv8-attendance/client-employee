import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import moment from 'moment';

export default function ListEmployee ({data}) {
  const employee = data.data.Employee
  const dayWorks = data.y
  const [click, setClick] = useState(false)
  const [height, setHeight] = useState(0)
  const [marginTop, setMarginTop] = useState(-60)
  const [border, setBorder] = useState(15)
  const [bottom, setBottom] = useState(30)

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
              uri: employee.image_url
            }}
          />
          <Text style={styles.textSubject}>{employee.name.split(' ')[0]}</Text>
          <Text style={[styles.textSubject, { fontWeight: '100', fontSize: 15, marginTop: 3}]}>Total Work Day's: {dayWorks}</Text>
        </View>
      </TouchableOpacity>
      
      <View style={[styles.contentContainer, {maxHeight: height, marginTop, borderTopLeftRadius: border, borderTopRightRadius: border}]}>
        <View style={[styles.row, {justifyContent: 'space-between'}]}>
        </View>
        <Text style={[styles.textBody, {maxHeight: height}]}>Age : {moment().format('YYYY') - moment(employee.birthDate).format('YYYY')}</Text>
        <Text style={[styles.textBody, {maxHeight: height}]}>Role : {employee.role}</Text>
        <Text style={[styles.textBody, {maxHeight: height}]}>Address : {employee.address}</Text>
        <Text style={[styles.textBody, {maxHeight: height}]}>Email : {employee.email}</Text>
        <Text style={[styles.textBody, {maxHeight: height}]}>Phone Number : {employee.phoneNumber}</Text>
        <Text style={[styles.textBody, {maxHeight: height}]}>Remaining Paid Leave : {employee.paidLeave} {employee.paidLeave === 1 ? 'Day' : "Day's"}</Text>
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
    backgroundColor: '#dad7cd',
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
    color: '#e4f9f5',
    fontSize: 18,
    fontWeight: 'bold'
  },
  textBody: {
    paddingLeft: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#e4f9f5',
    fontWeight: 'bold'
  },
  button: {
    height: 30,
    width: 100,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#11999e',
    margin: 10,
    padding: 10,
  }
})
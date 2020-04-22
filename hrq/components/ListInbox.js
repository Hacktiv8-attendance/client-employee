import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ListInbox ({ message }) {
  const [icon, setIcon] = useState('ios-mail-unread')
  const [click, setClick] = useState(false)
  const [height, setHeight] = useState(0)
  const [marginTop, setMarginTop] = useState(-60)
  const [border, setBorder] = useState(15)
  const [bottom, setBottom] = useState(30)

  return (
    <View style={{marginBottom: bottom}}>
      <TouchableOpacity style={styles.containerTitle} 
        onPress={() => {
          setIcon(click ? 'ios-mail' : 'ios-mail-open')
          setClick(!click)
          setHeight(click ? 0 : 300)
          setMarginTop(click ? -60 : -20)
          setBorder(click ? 15 : 0)
          setBottom(click ? 30 : 20)
        }}
        activeOpacity={1}
      >
        <View style={styles.row}>
          <Ionicons
            name={icon}
            size={30}
            style={{marginBottom: 10, marginLeft: 10}}
            color='#e4f9f5'
          />
          {message.message && <Text style={styles.textSubject}>{message.title}</Text>}
        </View>
      </TouchableOpacity>
      
      <View style={[styles.contentContainer, {maxHeight: height, marginTop, borderTopLeftRadius: border, borderTopRightRadius: border}]}>
        <Text style={[styles.textBody, {maxHeight: height}]}>{message.message}</Text>
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
    marginLeft: 30,
    color: '#e4f9f5'
  },
  textBody: {
    paddingLeft: 10,
  }
})
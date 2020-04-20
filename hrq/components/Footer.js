import React from 'react';
import { View, TouchableOpacity, StyleSheet,Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Footer () {
  const navigation = useNavigation()

  function handleTouch () {
    console.log(('masuk'))
    navigation.navigate('scan')
  }

  return (
    <View style={styles.containerFooter}>
      <TouchableOpacity style={styles.logo} onPress={() => handleTouch()}>
        <Ionicons
          name='ios-qr-scanner'
          size={50}
          color="#e4f9f5"
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  containerFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#11999e',
    paddingBottom: 20,
    paddingTop: 5,
  },
  logo: {
    backgroundColor: '#30e3ca',
    borderRadius: 45,
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: -35
  },
})
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Constant from 'expo-constants';
import { useSelector } from 'react-redux';

import BackHeader from '../components/BackHeader';
import Footer from '../components/Footer';

export default function ProfileScreen () {
  const user = useSelector(state => state.user)

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}/>

      <BackHeader
        title="My Profile"
      />

      <View style={styles.containerBody}>
        <View style={styles.containerImage}>
          <Image
            style={styles.image}
            source={{
              uri: user.payload.image_url
            }}
          />
        </View>
        <View style={styles.containerData}>
          <View style={{paddingTop: 80, backgroundColor: '#30e3ca', borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}>
            <Text style={[styles.textData, {fontSize: 30, textAlign: 'center', color: 'black'}]}>{user.payload.name}</Text>
            <Text style={[styles.textData, {fontSize: 15, textAlign: 'center', color: 'black'}]}>{user.payload.role}</Text>
            <Text style={[styles.textData, {fontSize: 15, marginBottom: 20, textAlign: 'center', color: 'black'}]}>{user.payload.email}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flex: 1, marginRight: 10}}>
              <Text style={[styles.textData, {fontSize: 15, fontWeight: 'bold', marginTop: 15}]}>Contact</Text>
              <View >
                <Text style={styles.textData}>Address : {user.payload.address}</Text>
                <Text style={styles.textData}>Phone Number : {user.payload.phoneNumber}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <Footer/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4f9f5',
    justifyContent: 'center',
  },
  statusBar: {
    height: Constant.statusBarHeight,
    backgroundColor: '#11999e',
  },
  textData: {
    color: '#e4f9f5'
  },
  containerBody: {
    flex: 1,
    padding: 30,
    paddingTop: 20
  },
  containerData: {
    padding: 30,
    paddingTop: 0,
    borderRadius: 30,
    backgroundColor: '#11999e'
  },
  containerImage: {
    marginBottom: -75,
    zIndex: 1,
    alignSelf: 'center'
  },
  image: {
    borderRadius: 90,
    height: 150,
    width: 150,
  },
})
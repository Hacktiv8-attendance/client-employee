import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native'
import TabBarIcon from './TabBarIcon';

import * as Font from 'expo-font';
import { AppLoading } from 'expo';

const fetchFont = () => {
  return Font.loadAsync({
    'source-sans': require('../assets/fonts/SourceSansPro-Bold.ttf'),
  })
}

export default function Header ({title}) {
  const user = useSelector(state => state.user)
  const navigation = useNavigation()

  const [dataLoaded, setDataLoaded] = useState(false)

  if(!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFont}
        onFinish={() => setDataLoaded(true)}
      />
    )
  }

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <TabBarIcon name="ios-list"/>
        </TouchableOpacity>
        {title && <Text style={styles.title}>{title}</Text>}
      </View>

      <View>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
          <Image
            style={styles.containerImage}
            source={{
              uri: user.payload.image_url
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingRight: 30,
    paddingLeft: 30
  },
  containerImage: {
    height: 40,
    width: 40,
    borderRadius: 25,
    marginTop: 5,
    borderWidth: 2,
    borderColor: '#30e3ca'
  },
  title: {
    fontSize: 22,
    marginLeft: 10,
    fontFamily: 'source-sans'
  }
})
import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native'
import TabBarIcon from './TabBarIcon';


export default function Header ({title}) {
  const user = useSelector(state => state.user)
  const navigation = useNavigation()

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
    height: 30,
    width: 30,
    borderRadius:30,
    marginTop: 5
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10
  }
})
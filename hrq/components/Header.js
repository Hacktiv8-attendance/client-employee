import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native'
import TabBarIcon from './TabBarIcon';


export default function Header () {
  const user = useSelector(state => state.user)
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <TabBarIcon name="ios-list"/>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity onPress={() => navigation.navigate('home')}>
          <TabBarIcon name="md-qr-scanner"/>
        </TouchableOpacity>
      </View>

      <View>
        <Image
          style={styles.containerImage}
          source={{
            uri: user.payload.image_url
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  containerImage: {
    height: 30,
    width: 30,
    borderRadius:30,
    marginTop: 5
  },
})
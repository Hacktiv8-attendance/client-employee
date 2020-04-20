import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Constant from 'expo-constants';
import { useSelector } from 'react-redux';
import Header from '../components/Header';

export default function InboxScreen () {
  const user = useSelector(state => state.user)


  if (user.loading) return (
    <View style={styles.container}>
      <View style={styles.statusBar} />

      <Header
        title="Absence Monthly"
      />

      <View style={styles.containerLoading}>
        <ActivityIndicator
          size='large'
          color='#11999e'
        />
      </View>

      <Footer />
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}/>

      <Header
        title='Inbox'
      />

      <View style={styles.containerBody}>
        <Text>Inbox</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  statusBar: {
    height: Constant.statusBarHeight,
    backgroundColor: '#11999e',
  },
  container: {
    flex: 1,
    backgroundColor: '#e4f9f5',
    justifyContent: 'center',
  },
  containerLoading: {
    flex: 1,
    backgroundColor: '#e4f9f5',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerBody: {
    flex: 1,
    padding: 30,
    paddingTop: 20
  },
})
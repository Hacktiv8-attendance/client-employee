import React, { useEffect, useState, useCallback } from 'react';
import { View, RefreshControl, StyleSheet, ActivityIndicator } from 'react-native';
import { ScrollView } from  'react-native-gesture-handler';
import Constant from 'expo-constants';
import { useSelector,useDispatch } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import allAction from '../store/actions';
import ListInbox from '../components/ListInbox';

export default function InboxScreen () {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [refreshing, setRefreshing] = useState(false)

  function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const onRefresh = useCallback(() => {
    console.log(user)
    console.log('masukkk')
    setRefreshing(true);
    dispatch(allAction.user.fetchAbsence({ id: user.payload.id, token: user.token }))
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  useEffect(() => {
    dispatch(allAction.user.fetchBroadcast(user.token))
  }, [])

  if (user.loading) return (
    <View style={styles.container}>
      <View style={styles.statusBar} />

      <Header
        title="Inbox"
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

      <ScrollView
        style={styles.containerBody}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View>
          { user.broadcast && user.broadcast.map(message => <ListInbox key={message.id} message={message} />) }
        </View>
      </ScrollView>

      <Footer />
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
  contentContainer: {
    padding: 30,
    paddingTop: 20
  },
  containerLoading: {
    flex: 1,
    backgroundColor: '#e4f9f5',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerBody: {
    flex: 1,
  },
})
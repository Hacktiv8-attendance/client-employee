import React, { useEffect, useState, useCallback } from 'react';
import { View, RefreshControl, ActivityIndicator, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import Constant from 'expo-constants';
import allAction from '../store/actions';
import ListAbsence from '../components/ListAbsence';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function History () {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [refreshing, setRefreshing] = useState(false)

  function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const onRefresh = useCallback(() => {
    console.log('masukkk')
    setRefreshing(true);
    dispatch(allAction.user.fetchAbsence({ id: user.payload.id, token: user.token }))
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  useEffect(() => {
    dispatch(allAction.user.fetchAbsence({ id: user.payload.id, token: user.token }))
  }, [])

  if (user.loading) return (
    <View style={styles.container}>
      <View style={styles.statusBar} />

      <Header
        title="Monthly Absence"
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
        title="Monthly Absence"
      />

      <ScrollView
        style={[styles.container, {marginTop: 20}]}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View>
          {user.absences && user.absences.map((absence, i) => <ListAbsence key={absence.id} absence={absence} no={i}/>)}
        </View>
      </ScrollView>

      <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4f9f5',
  },
  containerLoading: {
    flex: 1,
    backgroundColor: '#e4f9f5',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textHeader: {
    fontWeight: 'bold',
    fontSize: 20
  },
  contentContainer: {
    padding: 30,
    paddingTop:0
  },
  statusBar: {
    height: Constant.statusBarHeight,
    backgroundColor: '#11999e'
  },
})
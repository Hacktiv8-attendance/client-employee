import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, ScrollView, RefreshControl, ActivityIndicator, Dimensions } from 'react-native';
import Constant from'expo-constants';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ListEmployee from '../components/ListEmployee';
import allAction from '../store/actions';
import moment from 'moment';

export default function Employees () {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [refreshing, setRefreshing] = useState(false)
  const month = moment().format('MMMM')
  const data = {
    labels: user.employees.map(employee => employee.label),
    datasets: [
      {
        data: user.employees.map(employee => employee.y)
      }
    ]
  }

  console.log(data)

  function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  useEffect(() => {
    dispatch(allAction.user.fetchEmployees(user.token))
  }, [])

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(allAction.user.fetchBroadcast(user.token))
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  if (user.loading) return (
    <View style={styles.container}>
      <View style={styles.statusBar} />

      <Header
        title="Employees"
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
      <View style={styles.statusBar} />

      <Header
        title="Employees"
      />

      <ScrollView
        style={[styles.container, {marginTop: 20}]}
        contentContainerStyle={[styles.contentContainer, {paddingBottom: 80}]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        { user.employees && user.employees.map((employee, i) => <ListEmployee key={i} data={employee} />) }
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
  textBlank: {
      textAlign: 'center',
      fontSize: 20,
      marginTop: 200
  },
  statusBar: {
      height: Constant.statusBarHeight,
      backgroundColor: '#11999e'
  },
  contentContainer: {
      padding: 30,
      paddingTop:0
  },
  containerLoading: {
      flex: 1,
      backgroundColor: '#e4f9f5',
      alignItems: 'center',
      justifyContent: 'center'
  },
  textTitle: {
    marginBottom: 20,
    color: '#e4f9f5',
    fontSize: 18,
    fontWeight: 'bold'
  }
})
import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import Constant from 'expo-constants';
import allAction from '../store/actions';
import ListAbsence from '../components/ListAbsence';

export default function History () {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(allAction.user.fetchAbsence({ id: user.payload.id, token: user.token }))
  }, [])

  if (user.loading) return (
    <View style={styles.container}>
      <View style={styles.statusBar} />
      <View style={styles.containerLoading}>
        <ActivityIndicator
          size='large'
          color='#11999e'
        />
      </View>
    </View>
  )
  console.log(user.absences)
  return (
    <View style={styles.container}>
      <View style={styles.statusBar}/>

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View>
          <Text style={styles.textHeader}>Absence Monthly:</Text>
        </View>

        <View>
          {user.absences && user.absences.map((absence, i) => <ListAbsence key={absence.id} absence={absence} no={i}/>)}
        </View>
      </ScrollView>
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
    padding: 30
  },
  statusBar: {
    height: Constant.statusBarHeight,
    backgroundColor: '#11999e'
  },
})
import React from 'react';
import { View, AsyncStorage } from 'react-native';
import { useDispatch } from 'react-redux';
import allAction from '../store/actions';

export default function Logout ({ navigation }) {
  const dispatch = useDispatch()

    AsyncStorage.removeItem('userStorage')
    dispatch(allAction.user.setUser({token: '', payload: {
      id: 0,
      email: '',
      authLevel: 0,
    }}))
    navigation.navigate('Login')

  return(<View>

  </View>)
}
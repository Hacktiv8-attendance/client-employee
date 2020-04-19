import React from 'react';
import { View, Text } from 'react-native';
import Constant from 'expo-constants';

export default function ClaimCutiScreen () {
  return (
    <View style={{marginTop: Constant.statusBarHeight, flex: 1, alignItems: 'center'}}>
      <Text>Claim cuti</Text>
    </View>
  )
}
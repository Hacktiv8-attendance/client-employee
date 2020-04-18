import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Button, AsyncStorage, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Constant from 'expo-constants';
import allAction from '../store/actions';

export default function HomeScreen () {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const storeData = async (user) => {
    try {
      console.log(user, '==========store data================')
      await AsyncStorage.setItem('userStorage', JSON.stringify(user))
    } catch (error) {
      console.log(error)
    }
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    dispatch(allAction.user.absent({ jwt: data, EmployeeId: user.payload.id, token: user.token}))
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    dispatch(allAction.user.setLoading(false))
  }, []);

  if(user.token) {
    storeData({ token: user.token, payload: user.payload})
  }

  if(user.loading) return (
    <View>
      <Text>Loading</Text>
    </View>
  )

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  console.log(scanned)
  console.log(hasPermission)

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text>Nama Karyawan: {user.payload.name}</Text>
        <Camera
          style={{ flex: 1, height: 300, marginBottom: 30, marginTop: 30 }}
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
          }}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          >
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
          </View>
        </Camera>

        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          {scanned && <Button title='Tap to Scan Again' onPress={() => setScanned(false)} />}
        </View>

        <Button
          onPress={ async () => {
            await AsyncStorage.removeItem('userStorage')
            dispatch(allAction.user.setUser({token: '', payload: {
              id: 0,
              email: '',
              authLevel: 0,
            }}))
            navigation.navigate('Login')
          }}
          title="logout"
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4f9f5',
  },
  contentContainer: {
    paddingTop: Constant.statusBarHeight,
    marginLeft: 30,
    marginRight: 30,
  },
})
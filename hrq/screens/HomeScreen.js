import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Button, AsyncStorage, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Constant from 'expo-constants';
import moment from 'moment';
import allAction from '../store/actions';


export default function HomeScreen () {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [clock, setClock] = useState(moment(new Date()).format("dddd, MMMM Do YYYY, HH:mm:ss"));
  const [runClock, setRunClock] = useState(false)
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

  if (runClock) {
    setInterval(() => {
      setClock(moment(new Date()).format("dddd, MMMM Do YYYY, HH:mm:ss"))
    }, 1000)
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
    setTimeout(() => {
      dispatch(allAction.user.setLoading(false))
      storeData({ token: user.token, payload: user.payload})
      setRunClock(true)
    }, 500)
  }, []);

  if(user.loading) return (
    <View style={styles.containerLoading}>
      <ActivityIndicator
        size='large'
        color='#11999e'
      />
    </View>
  )

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.containerProfile}>
          <View style={{marginRight: 15}}>
            <Image
              style={styles.containerImage}
              source={{
                uri: user.payload.image_url
              }}
            />
          </View>
          <View>
            <Text>Name : {user.payload.name}</Text>
            
            <Text>{clock.substr(0, (clock.length - 10))}, {clock.substr(-8, 8)}</Text>
          </View>
        </View>
        
        <Camera
          style={styles.camera}
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
          }}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          >
          <View>
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
            setRunClock(false)
            navigation.navigate('Login')
          }}
          title="logout"
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  containerImage: {
    height: 50,
    width: 50,
    borderRadius:50
  },
  camera: {
    flex: 1,
    height: 300,
    marginBottom: 30,
    marginTop: 30
  },
  container: {
    flex: 1,
    backgroundColor: '#e4f9f5',
    marginTop: Constant.statusBarHeight
  },
  containerProfile: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  contentContainer: {
    marginLeft: 30,
    marginRight: 30,
  },
  containerLoading: {
    flex: 1,
    backgroundColor: '#e4f9f5',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
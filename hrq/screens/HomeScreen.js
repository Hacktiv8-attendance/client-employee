import * as WebBrowser from 'expo-web-browser';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Button, AsyncStorage, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Constant from 'expo-constants';
import moment from 'moment';
import allAction from '../store/actions';
import Header from '../components/Header';
import Footer from '../components/Footer';


export default function HomeScreen () {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [clock, setClock] = useState(moment(new Date()).format("dddd, MMMM Do YYYY, HH:mm:ss"));
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    const token = await Notifications.getExpoPushTokenAsync();
    console.log(token);
    dispatch(allAction.user.setTokenNotif(token))

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  const sendPushNotification = async ({ title, body, data }) => {
    const message = {
      to: user.tokenNotif,
      sound: 'default',
      title,
      body,
      _displayInForeground: true,
    };
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  };

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
    dispatch(allAction.user.absent({ jwt: data, EmployeeId: user.payload.id, token: user.token, latitude: user.location.coords.latitude, longitude: user.location.coords.longitude}))
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      registerForPushNotificationsAsync()
    })();
    setTimeout(() => {
      dispatch(allAction.user.setLoading(false))
      storeData({ token: user.token, payload: user.payload})
    }, 500)
  }, []);

  if(user.loading) return (
    <View style={styles.container}>
      <View style={styles.statusBar} />

      <Header
        title="Scan Absence"
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

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}/>

      <Header
        title="Scan Absence"
      />

      <View style={styles.containerBody}>
        <View style={styles.containerProfile}>
          <View>
            <Text style={styles.textProfile}>Hi, {user.payload.name && user.payload.name.split(' ')[0]}</Text>

            <Text style={styles.textProfile}>{clock.substr(0, (clock.length - 10))}</Text>
          </View>
        </View>
          
        <Camera
          style={styles.camera}
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
          }}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          >
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent'
            }}>
            {scanned && <Button title='Tap to Scan Again' onPress={() => setScanned(false)} />}
          </View>
        </Camera>
      </View>

      <Footer />
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
    height: 300,
    margin: 30
  },
  containerBody: {
    flex: 1
  },
  statusBar: {
    height: Constant.statusBarHeight,
    backgroundColor: '#11999e',
  },
  container: {
    flex: 1,
    backgroundColor: '#e4f9f5',
    justifyContent: 'center'
  },
  containerProfile: {
    padding: 10,
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#11999e',
    borderRadius: 30,
    marginLeft: 30,
    marginRight: 30
  },
  textProfile: {
    color: '#e4f9f5',
  },
  containerLoading: {
    flex: 1,
    backgroundColor: '#e4f9f5',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
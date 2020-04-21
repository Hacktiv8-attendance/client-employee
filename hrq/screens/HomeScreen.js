import * as WebBrowser from 'expo-web-browser';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, Button, AsyncStorage, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
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

  const greetings = (hour) => {
    if(hour >= 6 && hour < 12) return 'morning'
    if(hour >= 12 && hour <= 18) return 'afternoon'
    else return 'evening'
  }

  const registerForPushNotificationsAsync =
   async () => {
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

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (user.loading && user.click === false) return (
    <View style={styles.container}>
      <View style={styles.statusBar} />

      <Header
        title="Scan QR"
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
        title="Scan QR"
      />

      <View style={styles.containerBody}>
        <View style={styles.containerProfile}>
          <Ionicons
            name={
              greetings(Number(clock.substr(-8, 2))) === 'morning'
              ? 'ios-sunny'
              : greetings(Number(clock.substr(-8, 2))) === 'afternoon'
              ? 'md-sunny'
              : 'md-moon'
            }
            style={{marginTop: 4, marginRight: 20}}
            size={30}
            color='#e4f9f5'
          />
          <View>
            <Text style={styles.text}>Good {greetings(Number(clock.substr(-8, 2)))}, {user.payload.name}</Text>

            <Text style={styles.text}>{clock.substr(0, (clock.length - 10))}</Text>
          </View>
        </View>

        <View>
        { scanned && user.loading === false
          ? <Text style={styles.textStatus}>Successfully record your timestamp</Text>
          : <Text style={[styles.textStatus, {color: '#e4f9f5'}]}>Successfully record your timestamp</Text>
        }
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
              justifyContent: 'flex-end',
              backgroundColor: 'transparent'
            }}>
            {
              user.loading && user.click &&
              <View style={styles.loading}>
                <ActivityIndicator
                  size='large'
                  color='#11999e'
                />
              </View>
            }
            {
              scanned && user.loading === false &&
              (
                <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
                  <Text style={styles.text}>Scan Again</Text>
                </TouchableOpacity>
              )
            }
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
    margin: 30,
    marginTop: 15
  },
  containerBody: {
    flex: 1
  },
  textStatus: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15
  },
  statusBar: {
    height: Constant.statusBarHeight,
    backgroundColor: '#11999e',
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#11999e',
  },
  container: {
    flex: 1,
    backgroundColor: '#e4f9f5',
    justifyContent: 'center'
  },
  containerProfile: {
    padding: 10,
    paddingLeft: 20,
    marginTop: 20,
    flexDirection: 'row',
    backgroundColor: '#11999e',
    borderRadius: 30,
    marginLeft: 30,
    marginRight: 30
  },
  text: {
    color: '#e4f9f5',
  },
  loading: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerLoading: {
    flex: 1,
    backgroundColor: '#e4f9f5',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
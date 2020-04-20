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
import Header from '../components/Header';


export default function HomeScreen () {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [clock, setClock] = useState(moment(new Date()).format("dddd, MMMM Do YYYY, HH:mm:ss"));
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
    dispatch(allAction.user.absent({ jwt: data, EmployeeId: user.payload.id, token: user.token, latitude: user.location.coords.latitude, longitude: user.location.coords.longitude}))
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    setTimeout(() => {
      dispatch(allAction.user.setLoading(false))
      storeData({ token: user.token, payload: user.payload})
    }, 500)
  }, []);

  if(user.loading) return (
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

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}/>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* <Header/> */}

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
            
            <Text>{clock.substr(0, (clock.length - 10))}</Text>
          </View>
        </View>
        
        {/* <Camera
          style={styles.camera}
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
          }}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          >
          <View>
          </View>
        </Camera> */}

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
  statusBar: {
    height: Constant.statusBarHeight,
    backgroundColor: '#11999e'
  },
  container: {
    flex: 1,
    backgroundColor: '#e4f9f5',
  },
  containerProfile: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  contentContainer: {
    padding: 30
  },
  containerLoading: {
    flex: 1,
    backgroundColor: '#e4f9f5',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet,View, Text, Image, TextInput, TouchableOpacity,
AsyncStorage, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard,
ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constant from 'expo-constants';
import * as Location from 'expo-location';
import allAction from '../store/actions';


export default function LandingScreen () {
  let user = useSelector(state => state.user)
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnLoading, setBtnLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const linkForgotPassword = (
    <Text 
      style={styles.textHelpLink}
      onPress={forgetPassword}
    >Click here.</Text>
  )

  const retrieveData = async () => {
    try {
      let value = await AsyncStorage.getItem('userStorage')
      value = JSON.parse(value)
      if (value) {
        dispatch(allAction.user.setUser(value))
        navigation.navigate('Root')
      } else {
        dispatch(allAction.user.setLoading(false))
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect (() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Please allow permission to access location');
      }
      let location = await Location.getCurrentPositionAsync({});
      dispatch(allAction.user.setLocation(location));
    })();
    dispatch(allAction.user.setEmailReset(''))
    dispatch(allAction.user.setResetPassword(false))
    dispatch(allAction.user.setLoading(true))
    retrieveData()
  }, [])

  const handleLogin = () => {
    setBtnLoading(true)
    dispatch(allAction.user.login({email, password}))
  }

  function forgetPassword () {
    navigation.navigate("CheckingEmail")
  }

  if (user.successLogin) {
    navigation.navigate('Root')
    dispatch(allAction.user.setLogin(false))
    setBtnLoading(false)
    setEmail('')
    setPassword('')
  }

  if (user.error) {
    setTimeout(() => {
      dispatch(allAction.user.setError(null))
    }, 5000)
    setTimeout(() => {
      setBtnLoading(false)
    }, 1000)
  }

  if (user.loading) return (
    <View style={styles.containerLoading}>
      <ActivityIndicator
        size='large'
        color='#11999e'
      />
    </View>
  )

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <View>
              <Text style={styles.textHeader}>Welcome to HRQ</Text>
            </View>
          
            <View style={styles.logoContainer}>
              <Image
                source={require('../assets/images/logo-login.png')}
                style={styles.logoImage}
              />
            </View>

            <View>
              {user.error
              ? <Text style={styles.errorText}>{user.error}</Text>
              : errorMsg
              ? <Text style={styles.errorText}>{errorMsg}</Text>
              : <Text style={styles.hiddenText}>Error</Text>}

              <Text style={styles.textLabel}>Email </Text>

              <TextInput
                value={email}
                onChangeText={email => setEmail(email)}
                placeholder='example@example.com'
                keyboardType="email-address"
                textContentType="emailAddress"
                style={styles.input}
              />

              <Text style={styles.textLabel}>Password </Text>

              <TextInput
                value={password}
                onChangeText={password => setPassword(password)}
                placeholder='password'
                textContentType="password"
                secureTextEntry={true}
                style={styles.input}
              />

            </View>
            
            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
                activeOpacity={1}
              >
                {btnLoading
                  ? <ActivityIndicator
                      size='small'
                      color='#e4f9f5'
                    />
                  : <Text style={styles.buttonText}>Login</Text>}
              </TouchableOpacity>
            </View>

            <View style={styles.containerHelp}>
              <Text style={styles.textHelp}>Forgot password? {linkForgotPassword}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4f9f5',
    paddingTop: Constant.statusBarHeight,
    justifyContent: 'center'
  },
  containerLoading: {
    flex: 1,
    backgroundColor: '#e4f9f5',
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentContainer: {
    justifyContent: 'center',
  },
  containerText: {
    marginLeft: 30,
    marginBottom: 10
  },
  containerHelp: {
    marginTop: 10
  },
  hiddenText: {
    marginLeft: 30,
    marginBottom: 10,
    fontSize: 20,
    color: '#e4f9f5'
  },
  errorText: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  textHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 33,
    fontFamily: 'lato'
  },
  buttonText: {
    textAlign: 'center',
    color: '#e4f9f5'
  },
  textLabel: {
    marginLeft: 30,
    marginBottom: 10,
    fontFamily: 'lato',
    fontSize: 16,
    paddingLeft: 7
  },
  textHelp: {
    marginLeft: 30,
    fontFamily: 'lato'
  },
  textHelpLink: {
    color: '#30e3ca'
  },
  logoImage: {
    width: 200,
    height: 160,
    resizeMode: 'contain',
    marginTop: 3,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    paddingLeft: 10,
    marginRight: 30,
    marginLeft: 30,
    marginBottom: 30,
    maxWidth: 700,
    height: 50,
    borderColor: '#30e3ca',
    borderRadius: 5,
  },
  button: {
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#11999e',
    marginLeft: 30,
    marginRight: 30
  }
});
import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet,View, Text, Image, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constant from 'expo-constants';
import allAction from '../store/actions';


export default function LandingScreen () {
  let user = useSelector(state => state.user)
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const linkForgotPassword = (
    <Text style={styles.textHelpLink}>Click here.</Text>
  )

  const retrieveData = async () => {
    try {
      let value = await AsyncStorage.getItem('userStorage')
      value = JSON.parse(value)
      if (value) {
        console.log('dapet data: ====== ', value)
        dispatch(allAction.user.setUser(value))
        navigation.navigate('Root')
      } else {
        console.log('kosooooong')
        dispatch(allAction.user.setLoading(false))
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect (() => {
    dispatch(allAction.user.setLoading(true))
    retrieveData()
  }, [])

  const handleLogin = () => {
    console.log('masuk')
    dispatch(allAction.user.login({email, password}))
    navigation.navigate('Root')
    setEmail('')
    setPassword('')
  }


  function handleEmail (email) {
    setEmail(email)
  }

  function handlePassword (password) {
    setPassword(password)
  }

  if(user.loading) return (
    <View>
      <Text>Loading</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View>
          <Text style={styles.textHeader}>Welcome to HRQ</Text>
        </View>
      
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/login-logo.jpeg')}
            style={styles.logoImage}
          />
        </View>

        <View>
          <Text style={styles.textLabel}>Email: </Text>

          <TextInput
            value={email}
            onChangeText={email => handleEmail(email)}
            placeholder='example@example.com'
            keyboardType="email-address"
            textContentType="emailAddress"
            style={styles.input}
          />

          <Text style={styles.textLabel}>Password: </Text>

          <TextInput
            value={password}
            onChangeText={password => handlePassword(password)}
            placeholder='password'
            textContentType="password"
            secureTextEntry={true}
            style={styles.input}
          />

        </View>
        
        <View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.containerHelp}>
          <Text style={styles.textHelp}>forgot Password? {linkForgotPassword}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4f9f5',
  },
  contentContainer: {
    paddingTop: Constant.statusBarHeight,
  },
  containerText: {
    marginLeft: 30,
    marginBottom: 10
  },
  containerHelp: {
    marginTop: 10
  },
  textLogin: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  textHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 30,
  },
  buttonText: {
    textAlign: 'center',
  },
  textLabel: {
    marginLeft: 30,
    marginBottom: 10,
  },
  textHelp: {
    marginLeft: 30,
  },
  textHelpLink: {
    color: '#30e3ca'
  },
  logoImage: {
    width: 200,
    height: 160,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
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
    display: 'flex',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#11999e',
    shadowColor: '#11999e',
    shadowOpacity: 0.4,
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 20,
    marginLeft: 30,
    marginRight: 30
  }
});
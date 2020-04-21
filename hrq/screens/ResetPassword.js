import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet,View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Constant from 'expo-constants';
import { useNavigation } from '@react-navigation/native'
import allAction from '../store/actions';
import BackHeader from '../components/BackHeader';

export default function ResetPassword() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  let user = useSelector(state => state.user)
  let email = user.emailReset
  

  function resetPasswordButton () {
    if(password === passwordConfirmation) {
      if(password.length < 6) {
        dispatch(allAction.user.setError('password length must be greater than 6'))
      } else {
        dispatch(allAction.user.resetPassword({
            email,
            password
        }))
      }
    } else {
      dispatch(allAction.user.setError('confirmation password rejected'))
    }
  }
  
  if (user.resetPassword) navigation.navigate("Login")

  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.statusBar}/>

        <BackHeader
          title="Reset Password"
        />

        <View style={styles.container}>
          <View>
            <Text style={styles.textHeader}>Reset Password</Text>
          </View>

          {
            user.error
            ? <Text style={styles.textError}>{user.error}</Text>
            : <Text style={[styles.textError, {color: '#e4f9f5'}]}>Error</Text>
          }

          <View>
            <Text style={styles.textLabel}>Password : </Text>

            <TextInput
              value={password}
              onChangeText={password => setPassword(password)}
              placeholder='password'
              textContentType="password"
              secureTextEntry={true}
              style={styles.input}
            />

            <Text style={styles.textLabel}>Confirmation Password : </Text>
            <TextInput
              value={passwordConfirmation}
              onChangeText={passwordConfirmation => setPasswordConfirmation(passwordConfirmation)}
              placeholder='confirmation password'
              textContentType="password"
              secureTextEntry={true}
              style={styles.input}
            />

          </View>
          
          <View>
            <TouchableOpacity 
              style={styles.button}
              onPress={resetPasswordButton}
            >
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#e4f9f5',
      justifyContent: "center"
    },
    statusBar: {
      height: Constant.statusBarHeight,
      backgroundColor: '#11999e',
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
    },
    buttonText: {
      textAlign: 'center',
      color: '#e4f9f5'
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
      marginRight: 30,
      margin: 5
    },
    textError: {
      color: '#FF6D4E',
      textAlign: "center",
      fontSize: 20,
    }
  });
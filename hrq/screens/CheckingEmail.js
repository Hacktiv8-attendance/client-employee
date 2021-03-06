import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet,View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Constant from 'expo-constants';
import { useNavigation } from '@react-navigation/native'
import allAction from '../store/actions';
import BackHeader from '../components/BackHeader';

export default function CheckingEmail() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [toggle, setToggle] = useState(false)
  const [code, setCode] = useState('')
  let user = useSelector(state => state.user)

  function checkEmail () {
      dispatch(allAction.user.findEmail({
          email
      }))
      setToggle(true)
  }
  
  const checkCode = () => {
    console.log(user.resetCode, '============================================================================')
    console.log(code)
    if(code == user.resetCode) {
      dispatch(allAction.user.setEmailReset(email))
      navigation.navigate("ResetPassword")
    } else {
      dispatch(allAction.user.setError('Wrong Code'))
    }
  }

  if (user.resetPassword) navigation.navigate("Login")

  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.statusBar}/>

        <BackHeader
          title="Forgot Password"
        />
        
        <View style={styles.container}>
          <View>
            <Text style={styles.textHeader}>{toggle ? 'Code Verification' : 'Check Email'}</Text>
            <Text style={styles.subHeader}>{toggle ? 'Please check your email!' : 'We need to check your data first'}</Text>
          </View>

          {user.error ? <Text style={styles.textError}>{user.error}</Text> : <Text style={[styles.textError, { color: '#e4f9f5' }]}>Error</Text>}

          {toggle ? <View>
            <View>
              <Text style={styles.textLabel}>Code: </Text>
              <TextInput
                value={code}
                onChangeText={code => setCode(code)}
                placeholder='123456'
                style={styles.input}
              />
            </View>
              <View>
                <TouchableOpacity 
                  style={styles.button}
                  onPress={checkCode}
                >
                  <Text style={styles.buttonText}>Verify</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.button, { backgroundColor: "#30e3ca"}]}
                  onPress={checkEmail}
                >
                  <Text style={styles.buttonText}>Resend Code</Text>
                </TouchableOpacity>
              </View>
            </View> : <View>
              <View>
                <Text style={styles.textLabel}>Email: </Text>
                  <TextInput
                    value={email}
                    onChangeText={email => setEmail(email)}
                    placeholder='example@example.com'
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    style={styles.input}
                  />
                </View>
                <View>
                  <TouchableOpacity 
                    style={styles.button}
                    onPress={checkEmail}
                  >
                    <Text style={styles.buttonText}>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
          }
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
      fontSize: 30
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
      margin: 6
    },
    subHeader: {
      textAlign: "center",
    },
    textError: {
      color: '#FF6D4E',
      textAlign: "center",
      fontSize: 20,
    },
    statusBar: {
      height: Constant.statusBarHeight,
      backgroundColor: '#11999e'
    }
  });
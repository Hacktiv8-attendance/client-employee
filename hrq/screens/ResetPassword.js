import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet,View, Text, Image, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import Constant from 'expo-constants';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'
import allAction from '../store/actions';

export default function ResetPassword() {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let user = useSelector(state => state.user)
    

    function resetPasswordButton () {
        console.log({
            email,
            password
        })
        dispatch(allAction.user.resetPassword({
            email,
            password
        }))

        // dispatch(allAction.user.forgetPassword({
        //     email,
        //     password
        // }))
    }

    // const storeData = async (user) => {
    //     try {
    //       console.log(user, '==========store data================')
    //       await AsyncStorage.setItem('userStorage', JSON.stringify(user))
    //       navigation.navigate('Root')
    //     } catch (error) {
    //       console.log(error)
    //     }
    //   }

    // if(user.loading) return (
    //     <View>
    //       <Text>Loading</Text>
    //     </View>
    // )
    // if (user.error) return (
    //     <View>
    //       <Text>Loading</Text>
    //     </View>
    // )
    if (user.resetPassword) navigation.navigate("Login")
    return(
        <View style={styles.container}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View>
              <Text style={styles.textHeader}>Reset Password</Text>
            </View>

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
    
              <Text style={styles.textLabel}>Password: </Text>
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
                onPress={resetPasswordButton}
              >
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
        </View>
      );
}


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
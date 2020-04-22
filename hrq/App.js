import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { compose, applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import LoginScreen from './screens/LandingScreen';
import ResetPassword from './screens/ResetPassword';
import CheckingEmail from './screens/CheckingEmail';
import rootReducers from './store/reducers/rootReducers';
import DrawerSideNavigator from './navigation/DrawerSideNavigator';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator();
const store = createStore(rootReducers, compose(
  applyMiddleware(thunk)
))

const fetchFont = () => {
  return Font.loadAsync({
    'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    'manrope': require('./assets/fonts/Manrope-VariableFont_wght.ttf'),
    'comic': require('./assets/fonts/ComicNeue-BoldItalic.ttf'),
    'lato': require('./assets/fonts/Lato-Bold.ttf')
  })
}

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false)

  if(!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFont}
        onFinish={() => setDataLoaded(true)}
      />
    )
  }

  return (
    <Provider store={store}>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Root"
              component={DrawerSideNavigator}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="CheckingEmail"
              component={CheckingEmail}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ResetPassword"
              component={ResetPassword}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ProfileScreen"
              component={ProfileScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4f9f5',
  },
});

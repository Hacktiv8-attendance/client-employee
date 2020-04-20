import React from 'react';
import { Platform, StatusBar, StyleSheet, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { compose, applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import LoginScreen from './screens/LandingScreen';
import ResetPassword from './screens/ResetPassword'
import rootReducers from './store/reducers/rootReducers';
import TabBarIcon from './components/TabBarIcon';
import DrawerSideNavigator from './navigation/DrawerSideNavigator';


const Stack = createStackNavigator();
const store = createStore(rootReducers, compose(
  applyMiddleware(thunk)
))

export default function App() {
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
<<<<<<< HEAD
              component={BottomTabNavigator} 
            />
            <Stack.Screen
              name="ResetPassword"
              component={ResetPassword} 
=======
              component={BottomTabNavigator}
              options={{
                headerShown: false,
<<<<<<< HEAD
              }}  
>>>>>>> 498082225dd8e02ef8e5ffaaaa4440304022d902
=======
              }}
>>>>>>> 6b6b806e1d5964467c2e9c36fd001d6feb4162ab
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

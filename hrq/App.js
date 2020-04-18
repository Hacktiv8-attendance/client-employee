import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { compose, applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import LoginScreen from './screens/LandingScreen';
import rootReducers from './store/reducers/rootReducers';

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
            component={BottomTabNavigator} />
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
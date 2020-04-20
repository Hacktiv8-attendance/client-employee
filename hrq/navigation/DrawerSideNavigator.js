import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Cuti from '../screens/ClaimCutiScreen';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import Logout from '../components/Logout';
import History from '../screens/History';
import ProfileScreen from '../screens/ProfileScreen';
import InboxScreen from '../screens/InboxScreen';

export default function DrawerSideNavigator () {
  const Drawer = createDrawerNavigator()
  return (
    <Drawer.Navigator drawerStyle={{backgroundColor: '#e4f9f5'}}>
      <Drawer.Screen name= 'scan' component={HomeScreen} options={{
        drawerIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name="md-qr-scanner" />
        ),
      }} />

      <Drawer.Screen name= 'cuti' component={Cuti} options={{
        drawerIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name="ios-filing" />
        ),
      }} />

      <Drawer.Screen name='history' component={History} options={{
        drawerIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name="ios-bookmarks" />
        )
      }} />

      <Drawer.Screen name='inbox' component={InboxScreen} options={{
        drawerIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name="ios-mail" />
        )
      }} />

      <Drawer.Screen  name='logout' component={Logout} options={{
        drawerIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name="ios-power" />
        )
      }} />
    </Drawer.Navigator>
  )
}
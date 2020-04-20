import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Link from '../screens/LinksScreen';
import Cuti from '../screens/ClaimCutiScreen';
import ApprovalScreen from '../screens/ApprovalScreen';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import Logout from '../components/Logout';

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

      <Drawer.Screen name= 'Approval' component={ApprovalScreen} options={{
        drawerIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name="ios-filing" />
        ),
      }} />

      <Drawer.Screen name='link' component={Link} options={{
        drawerIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name="ios-bookmarks" />
        )
      }} />

      <Drawer.Screen  name='logout' component={Logout} options={{
        drawerIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name="ios-bookmarks" />
        )
      }} />
    </Drawer.Navigator>
  )
}
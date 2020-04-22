import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Cuti from '../screens/ClaimCutiScreen';
import ApprovalScreen from '../screens/ApprovalScreen';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import Logout from '../components/Logout';
import History from '../screens/History';
import InboxScreen from '../screens/InboxScreen';
import { useSelector } from 'react-redux';

export default function DrawerSideNavigator () {
  const authLevel = useSelector(state => state.user.payload.authLevel)
  const Drawer = createDrawerNavigator()
  return (
    <Drawer.Navigator drawerStyle={{backgroundColor: '#e4f9f5'}}>
      <Drawer.Screen name= 'Scan' component={HomeScreen} options={{
        drawerIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name="md-qr-scanner"/>
        ),
      }} />

      <Drawer.Screen name= 'Paid Leave' component={Cuti} options={{
        drawerIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name="ios-filing" />
        ),
      }} />

      { authLevel < 3 && <Drawer.Screen name= 'Approval' component={ApprovalScreen} options={{
        drawerIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name="ios-filing" />
        ),
      }} /> }


      <Drawer.Screen name='History' component={History} options={{
        drawerIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name="ios-bookmarks" />
        )
      }} />

      <Drawer.Screen name='Inbox' component={InboxScreen} options={{
        drawerIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name="ios-mail" />
        )
      }} />

      <Drawer.Screen  name='Logout' component={Logout} options={{
        drawerIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name="ios-power" />
        )
      }} />
    </Drawer.Navigator>
  )
}
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import ClaimCutiScreen from '../screens/ClaimCutiScreen';
import Drawer from './DrawerSideNavigator';
import History from '../screens/History';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  navigation.setOptions({ headerTitle: '' });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Scan"
        component={HomeScreen}
        options={{
          title: 'Scan',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-qr-scanner" />,
        }}
      />
      <BottomTab.Screen
        name="ClaimCuti"
        component={ClaimCutiScreen}
        options={{
          title: 'Claim Cuti',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-filing" />,
        }}
      />
      <BottomTab.Screen
        name="Links"
        component={History}
        options={{
          title: 'History',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-bookmarks" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import BluetoothListScreen from '../bluetoothlist';
import BLEDetailsScreen from '../bleDetails';
const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
    <HomeStack.Navigator>
        <HomeStack.Screen name="Bluetooth List" component={BluetoothListScreen} />
        <HomeStack.Screen name="BLE Details" component={BLEDetailsScreen} />
    </HomeStack.Navigator>
    
);
export default () => (
    <NavigationContainer>
        <HomeStackScreen />
    </NavigationContainer>
);

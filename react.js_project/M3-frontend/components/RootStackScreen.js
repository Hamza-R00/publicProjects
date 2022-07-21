import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/splashScreen/SplashScreen'
import SignUpScreen from '../screens/sigupScreen/SignUpScreen'
import SigInScreen  from '../screens/signInScreen/SignInScreen'
import TabsScreen from '../components/TabScreen'
const RootStack = createStackNavigator();
const RootStackScreen =({navigation}) =>(
  <RootStack.Navigator headerMode='none'>
    <RootStack.Screen name='SplashScreen' component={SplashScreen} />  
    <RootStack.Screen name='SignUpScreen' component={SignUpScreen} /> 
    <RootStack.Screen name='SigInScreen' component={SigInScreen} /> 
    <RootStack.Screen name='TabsScreen' component={TabsScreen} /> 
  </RootStack.Navigator>
)
export default RootStackScreen;
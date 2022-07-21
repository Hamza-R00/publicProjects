import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet,Text,View ,Image, TouchableOpacity } from 'react-native';
import MapScreen from '../screens/map/MapScreen';
import FlightScreen from '../screens/flight/FlightScreen';
import RadioScreen from '../screens/radio/RadioScreen';
import WeatherScreen from '../screens/weather/WeatherScreen';
import SosScreen from '../screens/sosrequest/SosScreen';
import { NavigationContainer } from '@react-navigation/native';
const Tab = createBottomTabNavigator();
const CustomTabBarButton =({children,onPress}) =>(
<TouchableOpacity
  style={{
    top:-30,
    justifyContent:'center',
    alignItems:'center',
    ...style.shadow
  }}
  onPress={onPress}
  >
  <View style={{
    width:60,
    height:60,
    borderRadius:35,
    backgroundColor:'#552586'
  }}>
    {children}
  </View>
</TouchableOpacity>
);

const TabsScreen = () => {
  return (

    <Tab.Navigator
    screenOptions={{
      tabBarShowLabel: false,
      headerShown: true,
      tabBarStyle: {
        // position: 'absolute',
        // bottom:40,
        // left:20,
        // right:20,
        elevation:0,
        backgroundColor:'#ffffff',
        // borderRadius:30,
        // height:90,
        height:75,
        ...style.shadow
        }
      
      }}
      
      >
      
      <Tab.Screen name="Flight" component={FlightScreen} options={{
        title:'Flight Schedule',headerTransparent:true, headerStatusBarHeight:-15,headerTitleAlign:'center',headerTintColor:'#6A359C',
        tabBarIcon:({focused}) => (
          <View style={{alignItems:'center' ,justifyContent:'center', top:10}}>
            <Image
              source={require('../assets/icons/planes.png')}
               resizeMode='contain'
              style={{
                width:25,
                height:25,
                tintColor: focused ? '#9969C7': '#748c94'
              }}
            />
            <Text style={{color:focused ? '#9969C7': '#748c94', fontSize:15}}>Flight</Text>
          </View>
        )
      }}
      
      />
       <Tab.Screen name="Weather" component={WeatherScreen} options={{
        title:'Weather Update', headerStatusBarHeight:-15,headerTitleAlign:'center',headerTintColor:'#6A359C',
        tabBarIcon:({focused}) => (
          <View style={{alignItems:'center' ,justifyContent:'center', top:10}}>
            <Image
              source={require('../assets/icons/cloudy.png')}
               resizeMode='contain'
              style={{
                width:25,
                height:25,
                tintColor: focused ? '#9969C7': '#748c94' 
              }}
            />
            <Text style={{color:focused ? '#9969C7': '#748c94', fontSize:15}}>Weather</Text>
          </View>
        )
      }}
      />
     <Tab.Screen name="Map" component={MapScreen} 
      options={{
        headerShown:false,
        tabBarIcon: ({focused}) => (
          <Image
          source={require('../assets/icons/placeholder.png')}
          resizeMode='contain'
          style={{
            width:30,
            height:30,
            tintColor:'#fff'   
          }}
          />
        ),
        tabBarButton:(props) =>(
          <CustomTabBarButton{...props} />
        )
      }}
     /> 


      <Tab.Screen name="Radio" component={RadioScreen} options={{
        title:'Radio',headerTransparent:true, headerStatusBarHeight:-15,headerTitleAlign:'center',headerTintColor:'#6A359C',
        tabBarIcon:({focused}) => (
          <View style={{alignItems:'center' ,justifyContent:'center', top:10}}>
            <Image
              source={require('../assets/icons/radio.png')}
               resizeMode='contain'
              style={{
                width:25,
                height:25,
                tintColor: focused ? '#9969C7': '#748c94' 
              }}
            />
            <Text style={{color:focused ? '#9969C7': '#748c94', fontSize:15}}>Radio</Text>
          </View>
        )
      }}
      />
       <Tab.Screen name="SoSRequest" component={SosScreen} options={{
        title:'SOS Request',headerTransparent:true, headerStatusBarHeight:-15,headerTitleAlign:'center',headerTintColor:'#6A359C',
        tabBarIcon:({focused}) => (
          <View style={{alignItems:'center' ,justifyContent:'center', top:10}}>
            <Image
              source={require('../assets/icons/first-aid-kitt.png')}
               resizeMode='contain'
              style={{
                width:25,
                height:25,
                tintColor: focused ? '#9969C7': '#748c94' 
              }}
            />
            <Text style={{color:focused ? '#9969C7': '#748c94', fontSize:15}}>SoS</Text>
          </View>
        )
      }}
      />
     
      </Tab.Navigator>
   
    
  )
}
const style=StyleSheet.create({
  shadow: {
    shadowColor:'#3A3845',
    shadowOffset:{
      width:0,
      height:10,
    },
    shadowOpacity:0.25,
    shadowRadius:3.5,
    elevation:15
  }
})
export default TabsScreen
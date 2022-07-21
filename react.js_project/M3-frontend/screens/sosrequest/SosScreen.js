
import React, { useState, useEffect } from 'react';
import { 
  View,  
  Text, 
  TouchableOpacity, 
  Image, Linking ,Button ,PixelRatio,Platform , Dimensions
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {LinearGradient} from 'expo-linear-gradient';
import styles from '../sosrequest/sosStyle'
import * as Location from 'expo-location';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import call from 'react-native-phone-call'
import { BottomSheet } from 'react-native-btr';
import { io } from "socket.io-client";
import * as SecureStore from 'expo-secure-store';
import moment from 'moment';
const {
  width:SCREEN_WIDTH,
  height:SCREEN_HEIGHT
  }=Dimensions.get('window')
  const scale = SCREEN_WIDTH/375
  
  function normalize(size){
  const newSize = size * scale 
  if (Platform.OS =='ios'){
   return Math.round(PixelRatio.roundToNearestPixel(newSize))
  }
  else{
  return Math.round(PixelRatio.roundToNearestPixel(newSize))-4
  }
  }
  let socket;
const SosScreen = () => {
  const [visible, setVisible] = useState(false);
  const [location, setLocation] = useState(null);
    useEffect(() => {

      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
      socket = io("http://11c7-206-84-137-120.ngrok.io");
      console.log('connection in useEffect')
    }, []);
    

  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };

  async function GetCurrentLocation (type) { 
    // let timeMoment = moment().utcOffset('+05:00').format('hh:mm:ss a')
    let dateTime = moment().local().format('hh:mm:ss a' + '/' + 'MM-DD-YYYY')
     
   

    // const url='tel://130'
    // Linking.openURL(url)
    let { coords } = await Location.getCurrentPositionAsync();
    let location ={
      lat:coords.latitude,
      lng:coords.longitude

    }
    // let address=  `${coords.latitude}, ${coords.longitude}`;
    let token=await SecureStore.getItemAsync('token');
   
    let data={location,type}
    let result=await fetch("http://11c7-206-84-137-120.ngrok.io/api/v1/sosRequest/",{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
      },
      body:JSON.stringify(data)
   });
   result=await result.json();
   console.log(result)
   console.log("Result from Admin")
         
    const sosemit ={
      type,
      dateTime,
      location
    }
    // console.log(sosemit)

    // console.log('socket working in button click ')
    // socket.emit('sos', sosemit)
    // socket.on('sos1', (hello)=>{
    //     console.log('Inside HEllo onMobile, cordinates are sent by server')
        
    //     // console.log(hello)   
    // })


    }

  

  return (
    <View style={styles.container}>
      <View style={{display:'flex',}}>
       
      
        
        <View style={{marginBottom:30}}>
          <View style={{alignItems:'center'}}>
          <Text style={{fontSize:normalize(25),fontWeight:'bold'}}>Sending</Text>
          </View>
          
          <View style={{alignItems:'center'}}>
          <Text style={{fontSize:normalize(25),fontWeight:'bold'}}>Emergency Alert</Text>
          </View>
        </View>
        <View >
       

    <TouchableOpacity  onPress={toggleBottomNavigationView}>
    <View style={styles.SOSButton}>
      <Text style={{fontSize: normalize(50),
        fontWeight: 'bold',color:'white'}}>
        SOS
      </Text>
    </View>
    </TouchableOpacity>
        </View>
        
        <View style={{marginTop:normalize(30)}}>
          <View style={{alignItems:'center'}}>
          <Text style={{fontSize:normalize(20),color:'black'}}>Tap Button For Help</Text>
          </View>
          
        </View>
      </View>
    
    
    

    
    <BottomSheet
          visible={visible}
          //setting the visibility state of the bottom shee
          onBackButtonPress={toggleBottomNavigationView}
          //Toggling the visibility state on the click of the back botton
          onBackdropPress={toggleBottomNavigationView}
          //Toggling the visibility state on the clicking out side of the sheet
        >
          <View style={styles.bottomNavigationView}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  padding: 20,
                  fontSize: 20,
                  color:'red',
                  fontWeight:'bold'

                }}>
                Tap Button In case Of Emergency
              </Text>
              <View style={{ flex: 1, flexDirection: 'column' }}>
              <View style={styles.sosDiv}>
      <View  style={styles.firstViewcard}>
           <TouchableOpacity onPress={() => GetCurrentLocation("Ambulance")}>
           <View style={styles.innerView}>
           <FontAwesome5 style={{margin:10}}
           name='briefcase-medical' 
           color='#552586'
           size={80} 
          >
           </FontAwesome5> 
          
            <View>
            <Text style={styles.innerView2}>
            Medical Help
           </Text> 
            </View>
           
           </View>
           </TouchableOpacity>
         </View>

         <View  style={styles.firstViewcard}>
         <TouchableOpacity onPress={() => GetCurrentLocation("Police")}>
         <View style={styles.innerView}>
         <MaterialCommunityIcons  style={{margin:10}}
           name='police-badge' 
           color='#552586'
           size={85} 
          >
           </MaterialCommunityIcons>     
           <Text style={styles.innerView2}>
            Police Help
           </Text> 
           </View>
           </TouchableOpacity>
         </View>
       </View> 
   
       <View style={styles.sosDiv}>
         <View  style={styles.firstViewcard}>
           <TouchableOpacity onPress={() => GetCurrentLocation("Firefighter")}>
           <View style={styles.innerView}>
           <MaterialCommunityIcons  style={{margin:10}}
           name='campfire' 
           color='#552586'
           size={85} 
          >
           </MaterialCommunityIcons>
          
          
           <Text style={styles.innerView2}>
            Firefighter Help
           </Text> 
           </View>
           </TouchableOpacity>
          
           
         </View>

         <View  style={styles.firstViewcard}>
         <TouchableOpacity onPress={() => GetCurrentLocation("Mechanic")}>
         <View style={styles.innerView}>
         <Entypo style={{margin:10}}
           name='tools' 
           color='#552586'
           size={85} 
          
          >
           </Entypo>
           <Text style={styles.innerView2}>
            CarRepair Help
           </Text> 
           </View>
           </TouchableOpacity>
         </View>
         
         {/* </View> */}
       </View> 
 
                </View>
                </View>
                </View>
                
          </BottomSheet>
    
      
   
    
</View>
  )
}

export default SosScreen

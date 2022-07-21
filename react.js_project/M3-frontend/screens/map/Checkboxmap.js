import React from 'react'
import { StyleSheet, Dimensions,PixelRatio,Platform, Image ,View,Text,TouchableOpacity,  ScrollView, } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {LinearGradient} from 'expo-linear-gradient';
import MapView,{Marker} from "react-native-maps";

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
  


const Checkboxmap = (props) => {
  

  let dropMarker = (btnname) =>{
    props.cord(btnname)
  }
  return (
   
    <View style={styles.chipsItem}>  
 
    <ScrollView horizontal
   scrollEventThrottle={1}
   showsHorizontalScrollIndicator={false}
   height={50}
   style={styles.chipsScrollView}
   contentInset={{ // iOS only
     top:0,
     left:0,
     bottom:0,
     right:20
   }}
   contentContainerStyle={{
     paddingRight: Platform.OS === 'android' ? 20 : 0
   }}
   >


  <TouchableOpacity   style={styles.signIn}  onPress={() => dropMarker("fuel")}>
                 
       <FontAwesome5  style={{marginRight:8}}
          name='gas-pump' 
          color='black'
          size={20}
         >
           </FontAwesome5> 
         <Text style={styles.textSign}>Gas Pump</Text>  
       
     </TouchableOpacity>

     <TouchableOpacity   style={styles.signIn} onPress={() => dropMarker("cafe")} >
             
       <Ionicons  style={{marginRight:10}}
          name='restaurant' 
          color='black'
          size={20}
         >
           </Ionicons> 
         <Text style={styles.textSign}>Resturant</Text>  
       
     </TouchableOpacity>

     <TouchableOpacity   style={styles.signIn}  onPress={() => dropMarker("tollplaza")}>         
       <FontAwesome5  style={{marginRight:5}}
          name='road' 
          color='black'
          size={20}
         >
           </FontAwesome5> 
         <Text style={styles.textSign}>TollPlaza</Text>  
     </TouchableOpacity>

     <TouchableOpacity    style={styles.signIn}  onPress={() => dropMarker("mosque")}>
                 
      <FontAwesome5  style={{marginRight:10}}
          name='mosque' 
          color='black'
          size={20}
         >
           </FontAwesome5>
         <Text style={styles.textSign}>Mosque</Text>  
       
     </TouchableOpacity>

     <TouchableOpacity  style={styles.signIn}  onPress={() => dropMarker("restArea")}>
        
       <FontAwesome  style={{marginRight:10}}
          name='hotel' 
          color='black'
          size={20}
         >
           </FontAwesome> 
         <Text style={styles.textSign}>RestArea</Text>  
       
     </TouchableOpacity>     

     </ScrollView>
     </View> 
  )
}

const styles = StyleSheet.create({
  container: {

    width:'100%',
    height:'100%',
  },
  map: {
     height:650,
  },
  chipsScrollView: {
    position:'relative', 
  },
  chipsItem: {
    flexDirection:"row",
    // backgroundColor:'black', 
    // borderRadius:20,
    // padding:1,
    margin:normalize(4),
    paddingHorizontal:15, 
    // marginHorizontal:48,
    paddingVertical: 2,
    height:50,
    justifyContent:"space-evenly",
    // shadowColor: '#ccc',
    // shadowOffset: { width: 0, height: 3 },
    // shadowOpacity: 0.5,
    // shadowRadius: 5,
    // elevation: 10,
    // justifyContent:"center", 
  },

  textSign:{
    fontSize: normalize(20),
    fontWeight: "bold"
  },
signIn: {
    width: 120,
    height: 40,
    backgroundColor:'white',
    // borderColor:'#6A359C',
    marginRight:5,
    marginTop:7,
    borderWidth:1,
    borderColor:'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'row'
},

  
});


// interface myobj{
//   name: string,
//   isActive:boolean
// }

export default Checkboxmap

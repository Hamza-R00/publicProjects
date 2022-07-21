
import { Dimensions,StyleSheet,PixelRatio,Platform } from "react-native"

const {height} = Dimensions.get("screen");
const height_logo = height * 0.2;
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
export default styles = StyleSheet.create({
    container: {
      flex: 1, 
      padding:normalize(95),
      backgroundColor: '#fff',
      justifyContent:'center',
      
      
    },
    
   
    
    footer: {
        // flex: 8,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: '#05375a',
        fontSize: 20,
        fontWeight: 'bold'
    },
    text: {
        color: 'red',
        marginTop:5
    },
    button: {
     justifyContent:'center',
     alignItems:'center',

      margin: 16
    // margin:  auto auto 0 auto
        
    },
    signIn: {
        width: 300,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        // borderTopRightRadius:12,
        // borderTopLeftRadius:30,
        // borderBottomRightRadius:40,
        flexDirection: 'row',
        // elevation: 7,
        borderRadius:30,
      shadowColor: '#52006A',
      // display:'flex',
      backgroundColor:'#FAF9F6',
    },
    textSign: {
        color: '#552586',
        fontWeight: 'bold',
        fontSize:20
    },
    sostext:{
        display:'flex',
        
        justifyContent:'center' ,
        alignItems:'center' ,
        margin:normalize(15),
        // width:12,
        height:normalize(72),
        // elevation: 7,
        // shadowColor: '#52006A',
      // display:'flex',
        // backgroundColor:'#fffaf0',
    },
    sostext2:{
      display:'flex',
      
      justifyContent:'center' ,
      alignItems:'center' ,
      // margin:normalize(10),
      // marginTop:normalize(5),
      // marginBottom:normalize(10),
      // width:12,
      height:normalize(120),
      elevation: 7,
      shadowColor: '#52006A',
    // display:'flex',
    borderRadius:20,
      backgroundColor:'#FAF9F6',
  },
  
    cardDiv:{
      display:'flex',
      justifyContent:'center' ,
      alignItems:'center' ,
      // padding:7,
      margin:10,
     
      borderRadius:15,
      // width:12,
      // height:72,
      elevation: 9,
      shadowColor: '#000000',
    // display:'flex',
      backgroundColor:'#EBEBEB',
    },
    sosDiv:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-around',
      // margin:20,
      // justifyContent:'center',
      // alignItems:'center',
      // backgroundColor:'#FAF9F6',
         },

         firstViewcard:{
          margin:normalize(10),
          width:normalize(160),
          height:normalize(150),
          elevation: 7,
          shadowColor: '#52006A',
          // display:'flex',
          backgroundColor:'#FAF9F6',
          // borderRadius:0,
          // justifyContent:'space-between',
          // alignContent:'center',
          // alignItems:'center',   
          // opacity:2.5,
          borderRadius: 30,
         },
         innerView :{
           justifyContent:"center",
           alignItems:'center'

         },
         innerView2 :{
          justifyContent:"center",
          alignItems:'center',
          margin:normalize(12),
          fontSize: normalize(18),
          fontWeight:'bold',
         
        },
        sosInnertext:{
          display:'flex',
          // justifyContent:'center' ,
          // alignContent:'center' , 
          color:'red' ,
          fontSize:normalize(22),
          fontWeight:'bold',
          // backgroundColor:'green'
        },
        sosInnertext2:{
          display:'flex',
          justifyContent:'center' ,
          alignContent:'center' , 
          color:'black' ,
          // marginTop:normalize(5),
          fontSize:normalize(20),
          // fontWeight:'bold'
          // backgroundColor:'yellow'
          paddingLeft:normalize(10),
          paddingRight:normalize(10)
        },
        bottomNavigationView: {
          backgroundColor: '#fff',
          width: '100%',
          height: 500,
          justifyContent: 'center',
          alignItems: 'center',
          borderTopLeftRadius:20,
          borderTopRightRadius:20
        },
        SOSButton:{
          margin:normalize(10),
          height: 190,
          width: 190,
          borderRadius: 100,
          elevation: 7,
          shadowColor: '#52006A',
          // display:'flex',
          backgroundColor:'red',
          // borderRadius:0,
          justifyContent:'center',
          alignContent:'center',
          alignItems:'center',   
         
          // opacity:2.5,
         
          
         },
  });

import { Dimensions,StyleSheet,StatusBar,Platform, PixelRatio } from "react-native"
import WeatherScreen from "./WeatherScreen";
const {height} = Dimensions.get("screen");
const height_logo = height * 0.1;
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
    flex: 2,
    
    backgroundColor:'white'
    // paddingTop: StatusBar.currentHeight,
  },
  viewcard:{

    marginTop:normalize(12),
    marginLeft:normalize(12),
    marginRight:normalize(12),
    // marginBottom:normalize(6),
    // margin:9,
    elevation: 7,
    shadowColor: '#52006A',
    display:'flex',
    backgroundColor:'#FAF9F6',
    // backgroundColor:'green',
    // borderRadius:0,
    // justifyContent:'space-between',
    // alignContent:'center',
    // alignItems:'center',   
    // opacity:2.5,
    borderRadius: 30,
  },
  t1:{
    // justifyContent:'center',
    'fontSize':normalize(50),
 
    // margin:9,
    fontWeight:'bold',
    color:'#552586'
  },
  belowBackground:  {
    flex: 3,
    height:'100%',
    padding:10,
    // margin:9,
    // marginTop:normalize(9),
    marginLeft:normalize(10),
    marginRight:normalize(10),
    marginBottom:normalize(9),
    // backgroundColor:'pink'
  },
  maincard:{
    margin:5,
    backgroundColor:'#FAF9F6',
    borderRadius:20,
    
  },

  card1:{
    // margin:9,
    marginTop:normalize(12),
    marginLeft:normalize(20),
    marginRight:normalize(20),
    // marginBottom:normalize(6),
    // marginTop:3,
    // margin:9,
    backgroundColor:'#FFFAFA',
    borderRadius:20,
  },

  viewcard2:{
    
    margin:9,
    
    elevation: 7,
    shadowColor: '#52006A',
    // display:'flex',
    // backgroundColor:'green',
    borderRadius:12,
    // justifyContent:'space-between',
    // alignContent:'center',
     
  },
 
  scrollView: {
    // backgroundColor: 'pink',
    // marginHorizontal: 20,
  },


  viewcard3:{
  //  display:'flex',
  //  padding:6,
   margin:normalize(6),
  //  justifyContent:'space-evenly',
   flexDirection:'row',

   
  },
  viewcardtop:{
       
    margin:9,
 
    elevation: 7,
    shadowColor: '#52006A',
    // display:'flex',
    backgroundColor:'#B589D6',
    borderRadius:12,
    // justifyContent:'space-between',
    alignItems:'center',
    // alignContent:'center'
     
  },
  locationInfo:{
    color:'#552586',fontWeight:'bold',fontSize:normalize(18)
  }
  

})
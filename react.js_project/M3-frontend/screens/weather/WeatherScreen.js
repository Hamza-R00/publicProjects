import React from 'react'
import {Text,View,Image,SafeAreaView, ScrollView,Platform, PixelRatio,Dimensions,StatusBar} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './weatherStyle';

import { weatherData } from './weatherData';
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

const WeatherScreen = () => {

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#6A359C' barStyle="light-content"/>
        <View style={styles.viewcard}>
          


          <View  style={{flexDirection:'row' ,alignItems:'center' ,justifyContent:'center' }}>
             <View  style={{flex:1, alignItems:'center' ,justifyContent:'center' ,flexDirection:'row'}}>
             <Text style={styles.t1}>34</Text>
             <View >
             <Text style={{fontSize:normalize(32),color:'#552586'}}>°C</Text>
             </View>
             </View>
             
             <View  style={{flex:1, alignItems:'center' ,justifyContent:'center'}}>
             <Image style ={{width:80,height:80}} source={require('../../assets/sun2.png')} />
             </View>
            <View  style={{flex:1, alignItems:'flex-start' ,justifyContent:'center', marginRight:normalize(20) ,marginTop:normalize(10), marginBottom:normalize(10) }}>
              <View>
            <Text style={styles.locationInfo}>Islamabad i9</Text>
              </View>
            <View>
            <Text style={styles.locationInfo}>Monday</Text>
            </View>
            <View>
            <Text style={styles.locationInfo}>12:00 PM</Text>
            </View>
            <View>
            <Text style={styles.locationInfo}>Mostly cloudy</Text>
            </View>
             </View>
             </View>
             
            <View>
           </View>
           
            

        </View>
        
         
       <View style={styles.card1}>
        {/* <View style={styles.viewcard2}> */}
        <View style={styles.viewcard3}> 
            
          <View style={{flex:1 , alignItems:'center' ,  }}>
          <Entypo
           name='drop' 
           color='#6A359C'
           size={30}
          ></Entypo>
          </View>

         <View style={{flex:1, alignItems:'center'}}>
          <AntDesign
           name='eye' 
           color='#6A359C'
           size={30}
          >
          </AntDesign>
          </View>

          <View style={{flex:1, alignItems:'center'}}>
          <Entypo
           name='air' 
           color='#6A359C'
           size={30}
          ></Entypo>
          </View>

        </View>
 

     
    <View style={styles.viewcard3}>

      <View style={{flex:1, alignItems:'center'}}>
      <Text style={{fontSize:normalize(20)}}>Humidity</Text>
      </View>

      <View style={{flex:1, alignItems:'center'}}>
      <Text style={{fontSize:normalize(20)}}>Visibility</Text>
      </View>

      <View style={{flex:1, alignItems:'center'}}>
      <Text style={{fontSize:normalize(20)}}>Wind</Text>
      </View>
    </View>
       
      <View style={styles.viewcard3}>

        <View style={{flex:1, alignItems:'center'}}>
        <Text style={{fontSize:normalize(20)}}>75%</Text>
        </View>

        <View style={{flex:1, alignItems:'center'}}>
        <Text style={{fontSize:normalize(20)}}>6km</Text>
        </View>

        <View style={{flex:1, alignItems:'center'}}>
        <Text style={{fontSize:normalize(20)}}>8km/h</Text>
        </View>
      {/* </View > */}
      </View>

    </View >
       <View style={styles.belowBackground}>
      <ScrollView>
   
      <View style={styles.maincard}>
              <View style={styles.viewcardtop}>
                <Text style={{color:'#FFFF' ,fontSize:normalize(20),margin:normalize(9),fontWeight:'bold',}}>
                  Rajana
                 </Text>
              </View>
        <View style={styles.viewcard3}> 

            <View style={{flex:1 , alignItems:'center' ,  }}>
                 <Entypo
                  name='drop' 
                  color='#6A359C'
                  size={25}
                  ></Entypo>
                  </View>

                 <View style={{flex:1, alignItems:'center'}}>
                  <AntDesign
                  name='eye' 
                  color='#6A359C'
                   size={25}
                   >
                 </AntDesign>
                 </View>

      <View style={{flex:1, alignItems:'center'}}>
           <Entypo
          name='air' 
          color='#6A359C'
          size={25}
          ></Entypo>
          </View>

        <View style={{flex:1 , alignItems:'center'   }}>
          <FontAwesome5
          name='temperature-high' 
          color='#6A359C'
          size={25}
          ></FontAwesome5>
        </View>
      </View>



           <View style={styles.viewcard3}>

            <View style={{flex:1, alignItems:'center',}}>
            <Text style={{fontSize:normalize(16),fontWeight:'bold'}}>Humidity</Text>
            </View>

            <View style={{flex:1, alignItems:'center',}}>
            <Text style={{fontSize:normalize(16),fontWeight:'bold'}}>Visibility</Text>
            </View>

            <View style={{flex:1, alignItems:'center',}}>
            <Text style={{fontSize:normalize(16),fontWeight:'bold'}}>Wind</Text>
            </View>

            <View style={{flex:1,alignItems:'center',}}>
            <Text style={{fontSize:normalize(16),fontWeight:'bold'}}>temperature</Text>
            </View>
          </View>





  <View style={styles.viewcard3}>

            <View style={{flex:1, alignItems:'center'}}>
            <Text style={{fontSize:normalize(17),}}>38%</Text>
            </View>

            <View style={{flex:1, alignItems:'center'}}>
            <Text style={{fontSize:normalize(17),}}>6km</Text>
            </View>

            <View style={{flex:1, alignItems:'center'}}>
              <Text style={{fontSize:normalize(17),}}>24km/h</Text>
             </View>

          <View style={{flex:1, alignItems:'center'}}>
            <Text style={{fontSize:normalize(17),}}>35°C</Text>
            </View>
            </View >
            </View>


            <View style={styles.maincard}>
              <View style={styles.viewcardtop}>
                <Text  style={{color:'#FFFF' ,fontSize:normalize(20),margin:normalize(9),fontWeight:'bold',}}>
                Pir Mehal
                 </Text>
              </View>
        <View style={styles.viewcard3}> 

            <View style={{flex:1 , alignItems:'center' ,  }}>
                 <Entypo
                  name='drop' 
                  color='#6A359C'
                  size={25}
                  ></Entypo>
                  </View>

                 <View style={{flex:1, alignItems:'center'}}>
                  <AntDesign
                  name='eye' 
                  color='#6A359C'
                   size={25}
                   >
                 </AntDesign>
                 </View>

      <View style={{flex:1, alignItems:'center'}}>
           <Entypo
          name='air' 
          color='#6A359C'
          size={25}
          ></Entypo>
          </View>

        <View style={{flex:1 , alignItems:'center'   }}>
          <FontAwesome5
          name='temperature-high' 
          color='#6A359C'
          size={25}
          ></FontAwesome5>
        </View>
      </View>



           <View style={styles.viewcard3}>

            <View style={{flex:1, alignItems:'center',}}>
            <Text style={{fontSize:normalize(16),fontWeight:'bold'}}>Humidity</Text>
            </View>

            <View style={{flex:1, alignItems:'center',}}>
            <Text style={{fontSize:normalize(16),fontWeight:'bold'}}>Visibility</Text>
            </View>

            <View style={{flex:1, alignItems:'center',}}>
            <Text style={{fontSize:normalize(16),fontWeight:'bold'}}>Wind</Text>
            </View>

            <View style={{flex:1,alignItems:'center',}}>
            <Text style={{fontSize:normalize(16),fontWeight:'bold'}}>temperature</Text>
            </View>
          </View>





  <View style={styles.viewcard3}>

            <View style={{flex:1, alignItems:'center'}}>
            <Text style={{fontSize:normalize(17),}}>32%</Text>
            </View>

            <View style={{flex:1, alignItems:'center'}}>
            <Text style={{fontSize:normalize(17),}}>9km</Text>
            </View>

            <View style={{flex:1, alignItems:'center'}}>
              <Text style={{fontSize:normalize(17),}}>21km/h</Text>
             </View>

          <View style={{flex:1, alignItems:'center'}}>
            <Text style={{fontSize:normalize(17),}}>36°C</Text>
            </View>
            </View >
            </View>
         
            <View style={styles.maincard}>
              <View style={styles.viewcardtop}>
                <Text  style={{color:'#FFFF' ,fontSize:normalize(20),margin:normalize(9),fontWeight:'bold',}}>
                Jaranwala
                 </Text>
              </View>
        <View style={styles.viewcard3}> 

            <View style={{flex:1 , alignItems:'center' ,  }}>
                 <Entypo
                  name='drop' 
                  color='#6A359C'
                  size={25}
                  ></Entypo>
                  </View>

                 <View style={{flex:1, alignItems:'center'}}>
                  <AntDesign
                  name='eye' 
                  color='#6A359C'
                   size={25}
                   >
                 </AntDesign>
                 </View>

      <View style={{flex:1, alignItems:'center'}}>
           <Entypo
          name='air' 
          color='#6A359C'
          size={25}
          ></Entypo>
          </View>

        <View style={{flex:1 , alignItems:'center'   }}>
          <FontAwesome5
          name='temperature-high' 
          color='#6A359C'
          size={25}
          ></FontAwesome5>
        </View>
      </View>



           <View style={styles.viewcard3}>

            <View style={{flex:1, alignItems:'center',}}>
            <Text style={{fontSize:normalize(16),fontWeight:'bold'}}>Humidity</Text>
            </View>

            <View style={{flex:1, alignItems:'center',}}>
            <Text style={{fontSize:normalize(16),fontWeight:'bold'}}>Visibility</Text>
            </View>

            <View style={{flex:1, alignItems:'center',}}>
            <Text style={{fontSize:normalize(16),fontWeight:'bold'}}>Wind</Text>
            </View>

            <View style={{flex:1,alignItems:'center',}}>
            <Text style={{fontSize:normalize(16),fontWeight:'bold'}}>temperature</Text>
            </View>
          </View>





  <View style={styles.viewcard3}>

            <View style={{flex:1, alignItems:'center'}}>
            <Text style={{fontSize:normalize(17),}}>90%</Text>
            </View>

            <View style={{flex:1, alignItems:'center'}}>
            <Text style={{fontSize:normalize(17),}}>10km</Text>
            </View>

            <View style={{flex:1, alignItems:'center'}}>
              <Text style={{fontSize:normalize(17),}}>26km/h</Text>
             </View>

          <View style={{flex:1, alignItems:'center'}}>
            <Text style={{fontSize:normalize(17),}}>22°C</Text>
            </View>
            </View >
            </View>
         
            <View style={styles.maincard}>
              <View style={styles.viewcardtop}>
                <Text  style={{color:'#FFFF' ,fontSize:normalize(20),margin:normalize(9),fontWeight:'bold',}}>
                Sharqpur
                 </Text>
              </View>
        <View style={styles.viewcard3}> 

            <View style={{flex:1 , alignItems:'center' ,  }}>
                 <Entypo
                  name='drop' 
                  color='#6A359C'
                  size={25}
                  ></Entypo>
                  </View>

                 <View style={{flex:1, alignItems:'center'}}>
                  <AntDesign
                  name='eye' 
                  color='#6A359C'
                   size={25}
                   >
                 </AntDesign>
                 </View>

      <View style={{flex:1, alignItems:'center'}}>
           <Entypo
          name='air' 
          color='#6A359C'
          size={25}
          ></Entypo>
          </View>

        <View style={{flex:1 , alignItems:'center'   }}>
          <FontAwesome5
          name='temperature-high' 
          color='#6A359C'
          size={25}
          ></FontAwesome5>
        </View>
      </View>



           <View style={styles.viewcard3}>

            <View style={{flex:1, alignItems:'center',}}>
            <Text style={{fontSize:normalize(16),fontWeight:'bold'}}>Humidity</Text>
            </View>

            <View style={{flex:1, alignItems:'center',}}>
            <Text style={{fontSize:normalize(16),fontWeight:'bold'}}>Visibility</Text>
            </View>

            <View style={{flex:1, alignItems:'center',}}>
            <Text style={{fontSize:normalize(16),fontWeight:'bold'}}>Wind</Text>
            </View>

            <View style={{flex:1,alignItems:'center',}}>
            <Text style={{fontSize:normalize(16),fontWeight:'bold'}}>temperature</Text>
            </View>
          </View>





  <View style={styles.viewcard3}>

            <View style={{flex:1, alignItems:'center'}}>
            <Text style={{fontSize:normalize(17),}}>20%</Text>
            </View>

            <View style={{flex:1, alignItems:'center'}}>
            <Text style={{fontSize:normalize(17),}}>12km</Text>
            </View>

            <View style={{flex:1, alignItems:'center'}}>
              <Text style={{fontSize:normalize(17),}}>26km/h</Text>
             </View>

          <View style={{flex:1, alignItems:'center'}}>
            <Text style={{fontSize:normalize(17),}}>25°C</Text>
            </View>
            </View >
            </View>
         
            
            
            </ScrollView>
          </View > 

    {/* <Text >main view tag</Text> */}
     </View>
      
         
  

  )
}

export default WeatherScreen

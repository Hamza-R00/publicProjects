
import React  ,{useEffect} from 'react'
import { 
  View,  
  Text, 
  TouchableOpacity, 
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
  ImageBackground,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {LinearGradient} from 'expo-linear-gradient';
// import Sound from 'react-native-sound';
import styles from './radioStyle'
// import song from '../../assets/mp3/song.mp3'

// Sound.setCategory('Playback');
import { Audio } from 'expo-av';
const pic= require('../../assets/bg.png')



const RadioScreen = () => {
  const [sound, setSound] = React.useState();
  
  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/mp3/song.mp3')
      );
      setSound(sound);
      
      console.log('Playing Sound');
      await sound.playAsync(); }
      
      React.useEffect(() => {
        return sound
        ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
          : undefined;
        }, [sound]);
        
        return (
          
            <ImageBackground srouce={pic} style={styles.container} >
          <View style={styles.container}>
      {/* <Image source={require('../../assets/bg.png')}></Image> */}
      <StatusBar backgroundColor='#6A359C' barStyle="light-content"/>
     <View style={styles.header}>
       <Animatable.Image 
       animation="jello"
       duration='1500'
       source={require('../../assets/radio2.png')}
       style={styles.logo} 
       resizeMode='stretch'/>
       {/* <Text>hello</Text> */}
     </View>       
     <Animatable.View 
     style={styles.footer}
      animation='flipInX'
       duration='1500'
     >
     <Text style={styles.title}>Enjoy Music</Text>
      <View style={styles.button}>   
      <TouchableOpacity onPress={playSound}>
        <LinearGradient
        colors={['#552586', '#9969C7']}
                    style={styles.signIn} >
          <Text style={styles.textSign}>Play</Text>  
        </LinearGradient>
      </TouchableOpacity>
      </View>   
     </Animatable.View>   
    
</View>
</ImageBackground>
  )
}

export default RadioScreen

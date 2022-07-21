import React,{useCallback, useEffect, useRef, useState} from 'react'
import { View,Text,TouchableOpacity,StatusBar,Image} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {LinearGradient} from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './splashStyle'



const SplashScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
       <StatusBar backgroundColor='#6A359C' barStyle="light-content"/>
      <View style={styles.header}>
      
       <Animatable.Image 
       animation='jello'
       duration='1500'
       source={require('../../assets/Fina.png')}
       style={styles.logo} 
       resizeMode='center' />
    
     </View>  
    
      
    
     

     <Animatable.View 
     style={styles.footer}
      animation='flipInX'
       duration='1500'
     >
     <Text style={styles.title}>Welcom to M3-Motarway  </Text>
            <Text style={styles.text}>Sign in with account</Text>
      <View style={styles.button}>   
      <TouchableOpacity onPress={()=>navigation.navigate('SigInScreen')}>
        <LinearGradient
        colors={['#552586', '#9969C7']}
                    style={styles.signIn} >
          <Text style={styles.textSign}>Get Started</Text>  
          <MaterialIcons
           name='navigate-next' 
           color='#fff'
           size={20}
          >
            
            </MaterialIcons>    
        </LinearGradient>
      </TouchableOpacity>
      </View>   
     </Animatable.View>   
    
</View>
  )
}



export default SplashScreen

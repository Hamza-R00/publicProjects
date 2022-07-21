import React ,{useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, StatusBar} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {LinearGradient} from 'expo-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import styles from './signInStyle'
import * as SecureStore from 'expo-secure-store';

 const SigInScreen = ({navigation}) => {
 const [carNumber, setCarNum] = useState("");
 const [CarModel, setCarMod] = useState("");
 const [allnewEntry, setnewEntry] = useState([]);


 const sigInUserData = async(e)=> {
  let token=await SecureStore.getItemAsync('token');
      if (token) {
        alert(" Here's your value  \n" + token);
      } else {
        alert('No values stored under that key.');
      }
  console.log(carNumber,CarModel)
  let data={carNumber,CarModel}

  fetch("http://11c7-206-84-137-120.ngrok.io/api/v1/auth/login/commuter",{
    method:'POST',
    headers:{
      'Accept':'application/json',
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + token
    },
    body:JSON.stringify(data)
  }).then((resp)=>{
     resp.json().then((result) =>{
      console.log(result.authToken)
      if(result.authToken!=null){
        navigation.navigate('TabsScreen')
      }
      console.log(result)
     })
  })

  //stop to reloadpage and remove TextInput Field Entries
  e.preventDefault();
  const newEntry={carNumber:carNumber,CarModel:CarModel};
  setnewEntry([...allnewEntry,newEntry]);
  setCarNum('');
  setCarMod('');
}

  return (
  <View style={styles.container}>
    <StatusBar backgroundColor='#6A359C' barStyle="light-content"/>
   <View style={styles.header}>
    <Text style={styles.text_header}>Welcome!</Text>
   </View>
 
   <Animatable.View 
    animation={'flipInX'}
    duration='1500'
   style={styles.footer}>

    <Text style={styles.text_footer}>Car Number</Text>
    <View style={styles.action}>
     <Entypo name='text-document'  size={20}/>  
    <TextInput autoCapitalize='none' autoCorrect={false} placeholder='Enter Car Number ' style={styles.textInput}
      value={carNumber} onChangeText={ (data)=> setCarNum(data)}
    />
    </View>

    <Text style={[styles.text_footer,{marginTop:35}]}>Car Model</Text>
    < View style={styles.action}>
    < Entypo name='text-document'  size={20}/> 
   <TextInput placeholder='Enter Car Model ' style={styles.textInput}
     autoCapitalize='none' autoCorrect={false} value={CarModel} onChangeText={ (data)=> setCarMod(data)}
   />
    </View>
    <View>
 </View>
    <View style={styles.button}>
    {/* <TouchableOpacity onPress={sigInUserData} disabled={!carNumber || !CarModel} */}
     <TouchableOpacity 
                    onPress={() => navigation.navigate('TabsScreen')}
                    style={[styles.signIn, {
                        borderColor: '#552586',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
     <LinearGradient colors={['#552586', '#9969C7']}
                    style={styles.signIn}>
       <Text style={[styles.textSign,{color:'#fff'}]}>Sign In</Text>
     </LinearGradient>
     </TouchableOpacity>
     <TouchableOpacity  
                     onPress={() => navigation.navigate('SignUpScreen')}
                    style={[styles.signIn, {
                        borderColor: '#552586',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#552586'
                    }]}>Sign Up</Text>
                </TouchableOpacity>
    </View>
   </Animatable.View>
  </View>
    
  )
}

export default SigInScreen

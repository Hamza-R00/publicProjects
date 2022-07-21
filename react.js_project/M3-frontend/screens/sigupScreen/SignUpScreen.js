import React, { useCallback, useState } from 'react';
import { View,Text, TouchableOpacity, TextInput,StatusBar} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {LinearGradient} from 'expo-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import styles from '../signInScreen/signInStyle'
import '../../env';
import * as SecureStore from 'expo-secure-store';
import { Button } from 'react-native-elements';

const SignUpScreen = ({navigation}) => {
  const [name, setName] = useState("");
  const [phoneNumber, setContact] = useState("");
  const [CNIC ,SetCNIC] = useState("")
  const [carReg ,setCarNumb] = useState({alphabeticID:'' , numericID:''})
  const [allnewEntry, setnewEntry] = useState([]);
  const registerUserData = async(e)=> {
    console.log(name,phoneNumber,CNIC,carReg)
    let data={name,phoneNumber,CNIC,carReg}

    fetch("http://11c7-206-84-137-120.ngrok.io/api/v1/auth/register/commuter",{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    }).then((resp)=>{
       resp.json().then( async (result) =>{
        var a = result.authToken
        await SecureStore.setItemAsync('token',a)
        let token=await SecureStore.getItemAsync('token');
        if (token) {
          alert(" Here's your value  \n" + token);
        } else {
          alert('No values stored under that key.');
        }
       })
    })
  //stop to reloadpage and remove TextInput Field Entries
  e.preventDefault();
  const newEntry={name:name,phoneNumber:phoneNumber,CNIC:CNIC,carReg:carReg};
  setnewEntry([...allnewEntry,newEntry]);
  setName('');
  setContact('');
  setCarNumb('');
  setnewEntry('');
  }


  return (
    <View style={styles.container}>
    <StatusBar backgroundColor='#6A359C' barStyle="light-content"/>
   <View style={styles.header}>
    <Text style={styles.text_header}>Register</Text>
   </View>
   <Animatable.View 
    animation={'flipInX'}
    duration='1500'
   style={styles.footer}>

    <Text style={styles.text_footer}>Name</Text>
    <View style={styles.action}>
    < AntDesign name='user'  size={20}/>  
    <TextInput placeholder='Enter Name ' style={styles.textInput}
    value={name} onChangeText={ (data)=>setName(data)}/>
    </View>

    <Text style={[styles.text_footer,{marginTop:20}]}>Contact</Text>
    < View style={styles.action}>
    < AntDesign name='phone'  size={20}/>  
    <TextInput placeholder='Enter Contact Number ' style={styles.textInput} value={phoneNumber} 
    onChangeText={ (data)=> setContact(data)}   maxLength={11} keyboardType="number-pad"/>
    </View>

    <Text style={[styles.text_footer,{marginTop:20}]}>CNIC</Text>
    < View style={styles.action}>
    < AntDesign name='solution1'  size={20}/> 
    <TextInput placeholder='Enter CNIC ' style={styles.textInput} value={CNIC} 
    onChangeText={ (data)=>SetCNIC(data?.replace(/[^0-9]/g, '-',[]))} 
    keyboardType="number-pad" maxLength={18}/>
    </View>
    <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between' }}>

    
   <View style={{width:150}}>
   <Text style={[styles.text_footer,{marginTop:20}]}>Car Number</Text>
    < View style={styles.action}>
    < Entypo name='text-document'  size={20}/> 
    <TextInput placeholder='Enter CarNumber ' style={styles.textInput} value={carReg.alphabeticID} 
    onChangeText={ e =>{setCarNumb ({...carReg,alphabeticID: e})}} 
    />
    </View>
   </View>

   <View style={{width:150}}>
   <Text style={[styles.text_footer,{marginTop:20}]}>Car Number</Text>
    < View style={styles.action}>
    < Entypo name='text-document'  size={20}/> 
    <TextInput placeholder='Enter CarNumber ' style={styles.textInput} value={carReg.numericID} 
    onChangeText={ (e) =>{setCarNumb ({...carReg,numericID: e})}} />
    </View>
   </View>

    </View>

    

    <View style={styles.button}>
    <TouchableOpacity onPress={registerUserData} disabled={!name || !phoneNumber ||!CNIC ||!carReg}
                    style={[styles.signIn, {
                        borderColor: '#552586',
                        borderWidth: 1,
                        marginTop: 15
                    }]}>
     <LinearGradient colors={['#552586', '#9969C7']}
                    style={styles.signIn}>
       <Text style={[styles.textSign,{color:'#fff'}]}  >Sign Up</Text>
     </LinearGradient>
     </TouchableOpacity>
     <TouchableOpacity
                    onPress={() => navigation.navigate('SigInScreen')}
                    style={[styles.signIn, {
                        borderColor: '#552586',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#552586'
                    }]}>Sign In</Text>
                </TouchableOpacity>
    </View>
   </Animatable.View>
  </View>
    
  )
}

export default SignUpScreen

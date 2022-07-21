import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
export const weatherData =[
    {  
        iconHumidity: <Entypo
        name='drop' 
        color='#6A359C'
        size={30}
        ></Entypo>,
        


        iconVisibility: <AntDesign
        name='eye' 
        color='#6A359C'
         size={30}
         >
       </AntDesign>,

       iconWind: <Entypo
       name='air' 
       color='#6A359C'
       size={30}
       ></Entypo>,

       icontemp: <FontAwesome5
       name='temperature-high' 
       color='#6A359C'
       size={30}
       ></FontAwesome5>,



       humidity:'Humidity',
       visibility:'Visibility',
       wind:'Wind',
       temperature:'Temperature',
      
       rajana:{
        hum:'38%',
        visi:'6km',
        air:'24km/h',
        temp:'36°C'
       },
        pirMehal:{
        hum:'38%',
        visi:'9km',
        air:'21km/h',
        temp:'35°C'
       },
       jaranwala:{
        hum:'38%',
        visi:'7km',
        air:'23km/h',
        temp:'33°C'
       }
      



    }

]
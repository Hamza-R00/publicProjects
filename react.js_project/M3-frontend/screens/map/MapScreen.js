import React, { useState, useEffect, useRef } from "react";
import MapView, { PROVIDER_GOOGLE,Camera } from "react-native-maps";
import {StyleSheet,Dimensions,Image, View,Text,StatusBar} from "react-native";
import * as Location from "expo-location";
import Checkboxmap from "./Checkboxmap";
import { response } from "../map/Markers";
import { fuel } from "../map/Markers";
import { restArea } from "../map/Markers";
import { cafe } from "../map/Markers";
import { tollPalaza } from "../map/Markers";
import { mosque } from "../map/Markers";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "react-native-elements";

const height = Dimensions.get("screen").height;
const MapScreen = () => {
  const mapRef = useRef(0);
  const [pointers, setPointers] = useState([]);
  const [location, setLocation] = useState(0);
  const [errorMsg, setErrorMsg] = useState(0);
  const [position, setPosition] = useState(0);
  const [newArray,setnewArray]=useState([]);

  let showSelectedMarkers = (selectedButton)=> {
    console.log("buttons are clicked")
    console.log(selectedButton)
    if(selectedButton == "fuel" ){
      var fuelArray = fuel
      setnewArray( fuelArray)
    }
    if (selectedButton == "cafe") {
      var cafeArray= cafe
      setnewArray(cafeArray)
      
    }
    if (selectedButton == "restArea") {
      var restAreaArray= restArea
      setnewArray(restAreaArray) 
    }
    if (selectedButton == "mosque") {
      var mosqueArray= mosque
      setnewArray(mosqueArray)
      
    }
    if (selectedButton == "tollplaza") {
      var tollArray= tollPalaza
      setnewArray(tollArray)
      
    }
  }

  useEffect(() => {


  //  {
  //     mapRef.current.animateCamera({
  //       pitch: 90,
  //       heading: 40,
  //       bearing: 40,
  //     })
  // }


  
    //bound map
    {
      mapRef.current.setMapBoundaries(
        {
          latitude: 30.65454,
          longitude: 72.13257,
        },
        {
          latitude: 31.57169,
          longitude: 74.224941,
        }
      );
    }
    //bound map

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
    
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
   
    <View style={styles.container}>
      
     <View style={styles.mapsView}>
      
      <MapView   
        ref={mapRef}
        style={styles.map}
        loadingEnabled={true}
        provider={PROVIDER_GOOGLE}
        showsMyLocationButton={true}
        showsTraffic={true}
        showsUserLocation={true}
        mapType={"standard"}
        zoomTapEnabled={true}
        zoomEnabled={true}
        zoomControlEnabled={true}
        rotateEnabled={true}
        toolbarEnabled={true}
        mapPadding={{
            bottom:200,
            top:40
        }
        }
        scrollEnabled={true}
        minZoomLevel={7.7}
        maxZoomLevel={20}
        region={{
          latitude: 31.92082965,
          longitude: 73.325165366,
          latitudeDelta: 0.2*35,
          longitudeDelta: 0.2*30,
        }}
      >
        
      
    {newArray.map((marker) => (
    
          <MapView.Marker
            key={marker.id}
            coordinate={marker.coordinates}
            title={marker.title}
            description={marker.description}
            // pinColor="yellow"
          >
            <Image source={marker.icon} style={{ height: 32, width: 32 }} />
          </MapView.Marker>
        ))}
      </MapView>
     <View style={{
            position: 'absolute',//use absolute position to show button on top of the map
            top: '0%', //for center align
            // alignSelf: 'flex-end' //for align to right
        }}>
       
       <Checkboxmap cord={showSelectedMarkers} />
     </View>
      </View>
    </View>
      
      );
     
    };
    
    
const styles = StyleSheet.create({
  container: {
    width: "100%",
   
  },
  mapsView: {
    backgroundColor:'#005555'
  },
  map: {
    height,
  },
});

export default MapScreen;

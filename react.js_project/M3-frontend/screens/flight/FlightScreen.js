import React from "react";
import {View,Text,TouchableOpacity, Animated, Dimensions, StyleSheet,ScrollView,PixelRatio,Platform} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
const { width } = Dimensions.get("window");
import { Arrival } from "./arrivalData";
import { departure } from "./departureData";
// import { scale } from 'react-native-size-matters';
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
export default class FlightScreen extends React.Component {
    state = {
        active: 0,
        xTabOne: 0,
        xTabTwo: 0,
        translateX: new Animated.Value(0),
        translateXTabOne: new Animated.Value(0),
        translateXTabTwo: new Animated.Value(width),
        translateY: -1000
    };
    handleSlide = type => {
        let {
            active,
            xTabOne,
            xTabTwo,
            translateX,
            translateXTabOne,
            translateXTabTwo
        } = this.state;
        Animated.spring(translateX, {
            toValue: type,
            duration: 100
        }).start();
        if (active === 0) {
            Animated.parallel([
                Animated.spring(translateXTabOne, {
                    toValue: 0,
                    duration: 100
                }).start(),
                Animated.spring(translateXTabTwo, {
                    toValue: width,
                    duration: 100
                }).start()
            ]);
        } else {
            Animated.parallel([
                Animated.spring(translateXTabOne, {
                    toValue: -width,
                    duration: 100
                }).start(),
                Animated.spring(translateXTabTwo, {
                    toValue: 0,
                    duration: 100
                }).start()
            ]);
        }
    };

    render() {
        let {
            xTabOne,
            xTabTwo,
            translateX,
            active,
            translateXTabOne,
            translateXTabTwo,
            translateY
        } = this.state;
        return (
            
            <View style={{ flex: 1 ,  backgroundColor: '#FFFF'}}>
                <View style={{width: "90%", marginLeft: "auto",marginRight: "auto"}}>
                    <View style={{flexDirection: "row",marginTop: 40,marginBottom: 20, height: 36,position: "relative"}}>
                    <Animated.View style={{position: "absolute",width: "50%",height: "100%", top: 0, left: 0, backgroundColor: "#B589D6",
                                borderRadius: 4,
                                transform: [
                                    { translateX}
                                ],
                                useNativeDriver: true,
                            }}/>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                borderWidth: 1,
                                borderColor: "#552586",
                                borderRadius: 4,
                                borderRightWidth: 0,
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0
                            }}
                            onLayout={event =>
                                this.setState({
                                    xTabOne: event.nativeEvent.layout.x
                                })
                            }
                            onPress={() =>
                                this.setState({ active: 0 }, () =>
                                    this.handleSlide(xTabOne)
                                )
                            }
                        >
                            <Text
                                style={{
                                    color: active === 0 ? '#552586': '#9969C7',fontWeight:'bold'
                                }}
                            >
                                Arrival 
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                borderWidth: 1,
                                borderColor: "#552586",
                                borderRadius: 4,
                                borderLeftWidth: 0,
                                borderTopLeftRadius: 0,
                                borderBottomLeftRadius: 0
                            }}
                            onLayout={event =>
                                this.setState({
                                    xTabTwo: event.nativeEvent.layout.x
                                })
                            }
                            onPress={() =>
                                this.setState({ active: 1 }, () =>
                                    this.handleSlide(xTabTwo)
                                )
                            }
                        >
                            <Text
                                style={{
                                  color: active === 1 ?'#552586': '#9969C7',fontWeight:'bold'
                                }} 
                            >
                                Departure
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView>
                        <Animated.View
                            style={{
                                
                                transform: [
                                    {
                                        translateX: translateXTabOne
                                    }
                                ]
                            }}
                            onLayout={event =>
                                this.setState({
                                    translateY: event.nativeEvent.layout.height
                                })
                            }
                        > 
                                <View style={styles.table}>
                                 <View style={{flex:1,justifyContent:'center',alignItems:'flex-start',}} >
                                 <Text style={{color:'#FFFF',fontSize:normalize(20)}}>Time</Text>
                                 </View>
                                 <View style={{flex:1,justifyContent:'center',alignItems:'flex-start',}}>
                                 <Text style={{color:'#FFFF',fontSize:normalize(20)}}>From</Text>
                                 </View>
                                 <View style={{flex:1,justifyContent:'center',alignItems:'flex-start',}}>
                                 <Text style={{color:'#FFFF',fontSize:normalize(20)}}>Flight</Text>
                                 </View>
                                 <View style={{flex:1,justifyContent:'center',alignItems:'flex-start',}}>
                                 <Text style={{color:'#FFFF',fontSize:normalize(20)}}>Status</Text>
                                 </View>
                                </View>
                                {
                          Arrival.map((item) =>{
                            return(
                              <View style={styles.table2}>
                                  <View style={{flex:1 , justifyContent:'center',alignItems:'flex-start',margin:1,padding:1}}>
                                    <Text style={{fontSize:normalize(20),fontWeight:'bold'}}>{item.Time}</Text>
                                    <Text style={{color:'#FFA500' ,fontSize: normalize(15)}} >{item.date}</Text>
                                  </View>
                              
                                 <View style={{flex:1 , justifyContent:'center',alignItems:'flex-start',margin:1,padding:1}}>
                                 <Text style={{color:'#804FB3',fontSize: normalize(16)}}>{item.From}</Text>
                                 </View>
                                 <View style={{flex:1 , justifyContent:'center',alignItems:'flex-start',margin:1,padding:1}}>
                                 <Text style={{color:'#FFA500',fontSize:normalize(20)}}>{item.Flight}</Text>
                                 </View>
                                 <View style={{flex:1 , justifyContent:'center',alignItems:'flex-start',margin:1,padding:1}}>
                                 <Text style={{color:'#FF7F7F',fontSize:normalize(20)}}>{item.Status}</Text>
                                 {/* <Text style={{color:'#FF7F7F',fontSize:15}}>{item.Status}</Text> */}
                                 </View>
                                 <View>
                                </View>
                                </View>

                            )
                            })
                          }

                                

                        </Animated.View>

                        <Animated.View
                        
                            style={{
                                // justifyContent: "center",
                                // alignItems: "center",
                                transform: [
                                    {
                                        translateX: translateXTabTwo
                                    },
                                    {
                                        translateY: -translateY
                                    }
                                ]
                                
                            }}
                        >
                            {/* <Text>Departure</Text> */}
                            <View style={styles.table}>
                                 <View style={{flex:1 , justifyContent:'center',alignItems:'flex-start',}} >
                                 <Text style={{color:'#FFFF',fontSize:normalize(20)}}>Time</Text>
                                 </View>
                                 <View style={{flex:1 , justifyContent:'center',alignItems:'flex-start',}}>
                                 <Text style={{color:'#FFFF',fontSize:normalize(20)}}>To</Text>
                                 </View>
                                 <View style={{flex:1 , justifyContent:'center',alignItems:'flex-start',}}>
                                 <Text style={{color:'#FFFF',fontSize:normalize(20)}}>Flight</Text>
                                 </View>
                                 <View style={{flex:1 , justifyContent:'center',alignItems:'flex-start',}}>
                                 <Text style={{color:'#FFFF',fontSize:normalize(20)}}>Status</Text>
                                 </View>
                                </View>
                                {
                          departure.map((item) =>{
                            return(
                              <View style={styles.table2}>
                                  <View style={{flex:1 , justifyContent:'center',alignItems:'flex-start',margin:1,padding:1}}>
                                    <Text style={{fontSize:normalize(20),fontWeight:'bold'}}>{item.Time}</Text>
                                    <Text style={{color:'#FFA500',fontSize: normalize(15)}} >{item.date}</Text>
                                  </View>
                              
                                 <View style={{flex:1 , justifyContent:'center',alignItems:'flex-start',margin:1,padding:1}}>
                                 <Text style={{color:'#804FB3',fontSize: normalize(16)}}>{item.From}</Text>
                                 </View>
                                 <View style={{flex:1 , justifyContent:'center',alignItems:'flex-start',margin:1,padding:1}}>
                                 <Text style={{color:'#FFA500',fontSize: normalize(20)}}>{item.Flight}</Text>
                                 </View>
                                 <View style={{flex:1 , justifyContent:'center',alignItems:'flex-start',margin:1,padding:1}}>
                                 <Text style={{color:'#FF7F7F',fontSize:normalize(20)}}>{item.Status}</Text>
                                 </View>
                                 <View>
                                </View>
                                </View>

                            )
                            })
                          }

                                
                           
                            
                        </Animated.View>
                    </ScrollView>
                </View>
            </View>
    
        );
    }
}


const styles = StyleSheet.create({
    mainView:{
      backgroundColor:'#ff8c00'   
    },
    container: {
   flexDirection:'row',
   justifyContent:'center',
   flex: 1, 
   backgroundColor: '#009387'
  },

signIn: {    
    height: 150,
    margin:6,
    borderRadius: 4,
    // elevation: 20,
    shadowColor: '#08d4c4',
},
  color:{
    color:'#ff8c00',
    fontSize:20
  },
  text:{
    fontWeight:'bold',
    color:'#ff8c00',
    fontSize:20
  },
  dep:{
    backgroundColor:"#D3D3D3",
    borderRadius:10,
    padding:12,
    // opacity:9
    margin:10,
    elevation: 7,
    shadowColor: '#804FB3',
    
  },
  dep1:{
    display:'flex',
    marginBottom:15,
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  table:{
    padding:5, 
  display:'flex',
  flexDirection:'row',
  backgroundColor:'#B589D6',
  // justifyContent:'space-around',
  },
  table2:{
    marginTop:3,
    padding:5,
    display:'flex',
    flexDirection:'row',
  
    // borderRadius:3,
    borderBottomWidth:1,
    // border
    borderBottomColor:'black'
    
    //  justifyContent:'space-around',
  },

  
 

  
});
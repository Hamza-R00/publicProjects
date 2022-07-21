import { Dimensions,StyleSheet,PixelRatio,Platform } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;
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
      backgroundColor: '#ffff'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#ffff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30,
        
    },
    logo: {
        // width: height_logo,
        // height: height_logo
    },
    title: {
        color: '#6A359C',
        fontSize: normalize(30),
        // fontSize: 40,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop:5
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: normalize(150),
        height:normalize(40),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    }
  });
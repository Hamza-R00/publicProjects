
import { Dimensions,StyleSheet, } from "react-native"

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;
export default styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#552586',
     
    },
    // Main__Div:{
    //     display:'flex',
    //     flexDirection:"column"
    // },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
  
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        width: height_logo,
        height: height_logo,

      
    },
    title: {
        color: '#6A359C',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: '#B589D6',
        marginTop:5,
        fontSize: 15,
        
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        overflow: 'hidden',
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    }
  });
import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Button
} from 'react-native';

function DeviceDetails(props){
    
    return(
        <View style={Styles.container}>
            <Text style={Styles.headerStyle}>{props.description}</Text>
            <Text style={Styles.dataStyle}>{props.data}</Text>
        </View>
    )
}

const Styles = StyleSheet.create({

    container:{
        backgroundColor:'#eceff1',
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10,
        height:60,
        borderRadius:5,
    },
    headerStyle:{
        fontSize:20,
        fontWeight:'bold',
        paddingTop:5,
        paddingLeft:5,
    },
    dataStyle:{
        fontSize:20,
        paddingTop:5,
        paddingLeft:5
    }
});
export default DeviceDetails;
import React from 'react';
import {
	View,
	Text,
    StyleSheet
} from 'react-native';

function Subtitle(props){

    return (
        <View style={Styles.container}>
            <Text style={Styles.title}>{props.title}</Text>
            <View style={Styles.line}/>
        </View>
    )

}

const Styles = StyleSheet.create({

    container: {
        flexDirection:'row',
        marginVertical:15,
        alignItems:'center'
    },
    title: {
        marginLeft:10,
        fontSize:18,
        fontWeight:'bold',
        color:'gray'
    },
    line: {
        borderBottomWidth:1,
        marginLeft:5,
        flex:1,
        marginTop:3,
        borderColor:'#eceff1'
    }
});

// const Styles = StyleSheet.Create({
//     container: {
//         flex:1
//     },
//     title: {

//     },
//     line: {

//     }
// });

export default Subtitle;
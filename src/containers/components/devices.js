import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import Separator from "./separator";

function Device(props) {
    return (
        <>
            <TouchableOpacity style={Styles.wrapper} onPress={props.onPress}>
                <View style={Styles.wrapperleft}>
                    <Image styles={Styles.iconLeft} source={props.iconLeft} />
                </View>
                <View style={Styles.wrapperName}>
                    <Text styles={Styles.name}>Device: {props.name}</Text>
                </View>
                <View style={Styles.wrapperName}>
                    <Text styles={Styles.name}>UUDI: {props.id}</Text>
                </View>
                <Image styles={Styles.iconRight} source={props.iconRight} />
            </TouchableOpacity>
            <Separator/>
        </>
    )
}

const Styles = StyleSheet.create({

    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        justifyContent: 'space-between',    
    },
    wrapperleft: {
        // flex:1,
        width: 50,
        height: 50,
        borderRadius: 30,
        borderColor: 'gray',
        borderWidth: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

    },
    wrapperName: {
        flex: 1,
        justifyContent: 'flex-start',
        marginLeft: 10,
    },
    iconLeft: {
        width: 40,
        height: 40,
    },
    iconRight: {
        width: 40,
        height: 40,
    },
    separator:{
        flex:1,
        borderTopWidth:1,
        marginLeft:60,
        marginRight:25,
    }
});

export default Device;
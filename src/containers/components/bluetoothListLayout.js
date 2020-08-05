import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    ScrollView
} from 'react-native';

function BluetoothListLayout(props) {
    return(
        <SafeAreaView style={Styles.container}>
            <View style={Styles.container}>
            <Text style={Styles.title}>
                {props.title}
            </Text>
                {props.children}
            </View>
        </SafeAreaView>
    )
};

const Styles = StyleSheet.create({

    container:{
        paddingHorizontal: 5,
        paddingVertical:5,
        backgroundColor:'white'
    },
    title:{
        fontSize:18,
        fontWeight:'bold'
    }
});

export default BluetoothListLayout;
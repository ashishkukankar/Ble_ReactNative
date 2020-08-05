import React from 'react';
import {
	View,
	Text,
    StyleSheet,
    Switch
} from 'react-native';
function Toogle(props) {
    return(
        <View style={Styles.container}>
            <Text style={Styles.text}>{props.value? 'ON':'OFF'}</Text>
            <Switch style={Styles.switch} value={props.value} 
                    onValueChange={props.onValueChange}
            />
        </View>
    )
};

const Styles = StyleSheet.create({

    container: {
        paddingVertical: 15,
        flexDirection: 'row'
    },
    text: {
        marginLeft:10,
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1
    },
    switch: {
        width: 50
    }
});



export default Toogle;
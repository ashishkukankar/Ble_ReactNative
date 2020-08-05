import React from 'react';
import {
	View,
	Text,
	StyleSheet
} from 'react-native';

function Empty(props) {
    return(
        <View>
            <Text style={Styles.text}>{props.text}</Text>
        </View>
    )
}

const Styles = StyleSheet.create({
    text: {
        fontSize: 20
    }
});


export default Empty;
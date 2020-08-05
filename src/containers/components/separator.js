import React from 'react';
import {
	View,
	Text,
    StyleSheet
} from 'react-native';

function Separator(props){
    return(
        <View
            style={[Styles.separator,
            {
                borderColor: props.color? props.color: '#eceff1'
            }]}
        />
    )
}

const Styles = StyleSheet.create({
    separator:{
        flex:1,
        borderTopWidth:1,
        marginLeft:60,
        marginRight:25,
    },
});

export default Separator;
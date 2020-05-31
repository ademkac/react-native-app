import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import DefaultInput from '../DefaultInput/DefaultInput';

const authInput = props => (
    <TextInput 
    underlineColorAndroid="transparent"
    value={props.value}
    placeholder={props.placeholder}
    onChangeText={props.onChangeText}
    valid={props.valid}
    style={[styles.input, props.style, !props.valid && props.touched ? styles.invalid : null ]}
    {...props}
     />
);

const styles = StyleSheet.create({
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#eee',
        padding: 5,
        marginTop: 8,
        marginBottom: 8
    },
    invalid: {
        backgroundColor: '#f9c0c0',
        borderColor: 'red'
    }
})


export default authInput;
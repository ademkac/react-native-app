import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class AboutScreen extends Component {
    render(){
        return (
            <View style={styles.container}>
                <Text>O aplikaciji</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24
        
    }
})

export default AboutScreen;
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';


const listItem = props => (
    <TouchableOpacity  onPress={props.onItemPressed}  >
    <View style={styles.container}>
        <View style={styles.subContainer}>
             <Text style={styles.textCompanyName}>{props.companyName}</Text>
             <Text style={styles.textAdInfo}>{props.adInfo}</Text>
             <Text style={styles.textAdInfo}>Datum objave oglasa: <Text style={{fontWeight: 'bold'}}>{props.date}</Text></Text> 
        </View>
         <View style={styles.subContainer1}>
            <Image resizeMode="cover" source={props.adImage} style={styles.adImage} />
        </View> 
    </View>
    
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container:{
        width: '100%',
        marginBottom: 5,
        padding: 10,
        backgroundColor: '#fcf6e6',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ffd27d',
        maxHeight: 350,
         flex: 1,
        flexDirection: 'row' 
       
    },
    subContainer: {
         flex: 2, 
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        
    },
    subContainer1: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textCompanyName: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    },
    textPhoneNumber: {
        textAlign: 'right',
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        fontSize: 20
    },
    textCity: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'left',
        justifyContent: 'flex-start'
    },
    textAdInfo: {
        textAlign: 'justify',
        fontSize: 16
    },
    adImage: {
        marginRight: 8,
        marginLeft: 8,
        height: 100,
        width: '100%'
    }
})

export default listItem;
import React, { Component } from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {authLogout} from '../../store/actions/index';
import Ionicons from 'react-native-vector-icons/Ionicons';


class LogOut extends Component {

odjavaHandler = () => {
    this.props.onLogout;
    if(!this.props.isLoggedIn){
        this.props.navigation.navigate('Prijava');
    } else {
        null
    }
    
}
render(){
    return(
        <View style={styles.container}>
            <Text style={styles.text1}>Da li ste sigurni da zelite da se odjavite?</Text>
            
            <View style={styles.subContainer}>
                <Ionicons 
                name='md-checkmark-circle'
                size={50}
                style={styles.icon1}
                color= 'green'
                onPress={this.odjavaHandler}
                 />
                <Ionicons 
                name='md-close-circle' 
                size={50}
                color='red'
                onPress={()=>this.props.navigation.navigate('Aplikacija')}/>
            </View>
            
        </View>
    );
}    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 220
    },
    subContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'center'
        

    },
    text1: {
        fontWeight: 'bold',
        marginBottom: 40,
        fontSize: 20
    },
    icon1: {
        marginRight: 45
    }
})

const mapStateToProps = state => {
    return {
        isLoggedOff: state.auth.isLoggedIn
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onLogout: ()=> dispatch(authLogout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogOut);
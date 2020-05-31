import React, { Component } from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import Animated from 'react-native-reanimated';

 class categoriesItem extends Component {

    state={
        animatePress: new Animated.Value(1)
    }

    animateIn(){
        Animated.timing(this.state.animatePress, {
            toValue: 0.8,
            duration: 200
        }).start()
    }

    animateOut(){
        Animated.timing(this.state.animatePress, {
            toValue: 1,
            duration: 200
        }).start()
    }

     render(){
         const {itemWidth} = this.props
        return (
            <TouchableOpacity  onPress={this.props.onPress} >
                <Animated.View style={
                    {margin: 5,
                        backgroundColor: '#fff',
                    transform: [
                        {
                            scale: this.state.animatePress
                        }
                    ]}
                }>
                <Image style={{width:itemWidth, height: 200}} source={this.props.image} />
                </Animated.View>
                </TouchableOpacity>
        );
     }
    
 }

const styles = StyleSheet.create({
    container: {
        
        width: '100%',
        marginBottom: 5,
        height: 200,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        
    },
    subContainer: {
        
        width: '100%',
        padding: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        
    },
    textp:{
        color: '#947a47',
        fontWeight: 'bold',
        fontSize: 24
    }
})

export default categoriesItem;
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';

export default TabBarIcon = (props) => {
    return (
        <Ionicons 
        name={props.name}
        size={30}
        style={{marginBottom: -3}, props.style}
        color={props.focused ? Colors.tabIconSelected
                             : Colors.tabIconDefault
                            }
        onPress={props.onPress}
         />
    );
}
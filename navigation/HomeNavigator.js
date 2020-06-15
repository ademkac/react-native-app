import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import CustomDrawerContent from './CustomDrawerContent';
import HomeStack from '../navigation/HomeStack';
import AuthScreen from '../screens/AuthScreen/AuthScreen';




const Drawer = createDrawerNavigator();

const HomeNavigator = () => (
    <Drawer.Navigator  
     drawerContent={CustomDrawerContent} 
     /* sceneContainerStyle={{backgroundColor: '#947a47'}}
     drawerStyle={{backgroundColor: '#947a47', }}
     d */  >
        {/* <Drawer.Screen 
        name= 'Aplikacija' 
        component='/'
         />  */}
        <Drawer.Screen 
        name= 'Home' 
        component={HomeStack}
         /> 
         <Drawer.Screen 
        name= 'Prijava' 
        component={AuthScreen}
         /> 
    </Drawer.Navigator>
);


export default HomeNavigator;
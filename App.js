import React, { Component } from 'react';
import {NavigationContainer} from '@react-navigation/native';

import HomeNavigator from './src/navigation/HomeNavigator';
import {navigationRef} from './src/navigation/RootNavigation';
 

class App extends Component{

  render(){
    return (

     <NavigationContainer ref={navigationRef}>
       <HomeNavigator />
     </NavigationContainer>

      );
  }   
};

export default App;

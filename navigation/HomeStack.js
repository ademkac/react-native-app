import React, { Component } from 'react';
import {StyleSheet, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AdDetail from '../components/AdDetail/AdDetail';
import FavoriteAdDetail from '../components/AdDetail/FavoriteAdDetail';
import AboutScreen from '../screens/AboutScreen/AboutScreen';
import PopUpMenu from '../components/Modal/PopUpMenu';
import HomeTab from '../navigation/HomeTab';
import CreateAdScreen from '../screens/CreateAdScreen/CreateAdScreen';
import TabBarIcon from '../assets/TabBarIcon';
import AuthScreen from '../screens/AuthScreen/AuthScreen';
import LogOut from '../screens/LogOut/LogOut';
import CategoriesScreen from '../screens/CategoriesScreen/CategoriesScreen';
import Kategorija1 from '../screens/CategoriesScreen/Kategorija1';
import Kategorija2 from '../screens/CategoriesScreen/Kategorija2';
import Kategorija3 from '../screens/CategoriesScreen/Kategorija3';
import Kategorija4 from '../screens/CategoriesScreen/Kategorija4';

const Stack = createStackNavigator();

class HomeStack extends Component{

    constructor(props){
        super(props)
    }

    onPopupEvent = (eventName, index) => {
        if(eventName !== 'itemSelected') return
        if(index === 0) this.props.navigation.navigate('Kategorija3')
        else if(index === 1) this.props.navigation.navigate('Kategorija1')
        else if(index === 2) this.props.navigation.navigate('Kategorija2')
        else this.props.navigation.navigate('Kategorija4')
        
    }



    render(){
        return(
            <Stack.Navigator>
                <Stack.Screen 
                name = 'Aplikacija'
                component={HomeTab} 
                 options={{
                    title: 'Aplikacija',
                    headerStyle: {backgroundColor: '#947a47'},
                    headerTitleAlign: 'center',
                    headerTintColor: 'white',
                    headerLeft:()=>(<TabBarIcon  
                        name='md-menu' 
                        style={styles.menuIcon}
                        onPress={()=>this.props.navigation.toggleDrawer()}/>),
                       headerRight: () => {
                           return (
                               <View>
                                   <PopUpMenu
                                   name='list' 
                                   actions= {[
                                        'Pogrebne usluge',
                                        'Javni parking',
                                        'Gradski prevoz',
                                        'Dimnicarske usluge']}
                                   onPress={this.onPopupEvent} />
                               </View>
                           )
                       }
                     }}/>
                <Stack.Screen 
                name = 'Prijava' 
                component={AuthScreen}
                options={{
                   
                    headerStyle: {backgroundColor: '#947a47'},
                    headerTitleAlign: 'center',
                    headerTintColor: 'white',
                    title: 'Prijava',
                    
                }}/>
                <Stack.Screen 
                name = 'Napravite oglas' 
                component={CreateAdScreen}
                options={{
                    title: 'Napravite oglas',
                    headerStyle: {backgroundColor: '#947a47'},
                    headerTitleAlign: 'center',
                    headerTintColor: 'white',
                    
                }}/>
                <Stack.Screen 
                name = 'AdDetail' 
                component={AdDetail}
                
                options={{
                    title: 'AdDetail',
                    headerStyle: {backgroundColor: '#947a47'},
                    headerTitleAlign: 'center',
                    headerTintColor: 'white',
                    
                    
                }}/>
                <Stack.Screen 
                name = 'FavoriteAdDetail' 
                component={FavoriteAdDetail}
                
                options={{
                    title: 'FavoriteAdDetail',
                    headerStyle: {backgroundColor: '#947a47'},
                    headerTitleAlign: 'center',
                    headerTintColor: 'white',
                    
                    
                }}/>
                <Stack.Screen 
                name = 'O aplikaciji' 
                component={AboutScreen}
                
                options={{
                    title: 'O aplikaciji',
                    headerStyle: {backgroundColor: '#947a47'},
                    headerTitleAlign: 'center',
                    headerTintColor: 'white',
                    
                    
                }}/>
                 <Stack.Screen 
                name = 'Logout' 
                component={LogOut}
                
                options={{
                    title: 'Logout',
                    headerStyle: {backgroundColor: '#947a47'},
                    headerTitleAlign: 'center',
                    headerTintColor: 'white',
                    
                    
                }}/>
                <Stack.Screen 
                name = 'Kategorije' 
                component={CategoriesScreen}
                
                options={{
                    title: 'Kategorije',
                    headerStyle: {backgroundColor: '#947a47'},
                    headerTitleAlign: 'center',
                    headerTintColor: 'white',
                    
                    
                }}/>
                 <Stack.Screen 
                name = 'Kategorija1' 
                component={Kategorija1}
                
                options={{
                    title: 'Javni parking',
                    headerStyle: {backgroundColor: '#947a47'},
                    headerTitleAlign: 'center',
                    headerTintColor: 'white',
                    
                    
                }}/> 
                <Stack.Screen 
                name = 'Kategorija2' 
                component={Kategorija2}
                
                options={{
                    title: 'Gradski prevoz',
                    headerStyle: {backgroundColor: '#947a47'},
                    headerTitleAlign: 'center',
                    headerTintColor: 'white',
                    
                    
                }}/> 
                <Stack.Screen 
                name = 'Kategorija3' 
                component={Kategorija3}
                
                options={{
                    title: 'Pogrebne usluge',
                    headerStyle: {backgroundColor: '#947a47'},
                    headerTitleAlign: 'center',
                    headerTintColor: 'white',
                    
                    
                }}/> 
                <Stack.Screen 
                name = 'Kategorija4' 
                component={Kategorija4}
                
                options={{
                    title: 'Dimnicarske usluge',
                    headerStyle: {backgroundColor: '#947a47'},
                    headerTitleAlign: 'center',
                    headerTintColor: 'white',
                    
                    
                }}/> 
                
            </Stack.Navigator>
        )
    }
} 

const styles = StyleSheet.create({
    menuIcon: {
        padding: 10
    },
    tabStyle: {
        backgroundColor: '#e3c884'
    }
})


export default HomeStack;
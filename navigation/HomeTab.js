import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {withBadge} from 'react-native-elements';
import {connect} from 'react-redux';

import TabBarIcon from '../assets/TabBarIcon';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import CreateAdScreen from '../screens/CreateAdScreen/CreateAdScreen';
import SavedAd from '../screens/Favorites/SavedAd';



const Tab = createBottomTabNavigator();

const Home = ({focused}) => <TabBarIcon focused={focused} name='md-home' />
const FavAds = ({focused}) => <TabBarIcon focused={focused} name='md-heart' />


const HomeTab = (props) => {
    let content = (
        withBadge(props.newAds)(Home)
    );
        if(props.newAds === 0){
            content=(
                Home
            )
        }
    
    let badge = (
        withBadge(props.newFavAds)(FavAds)
    );
        if(props.newFavAds === 0){
            badge=(
                FavAds
            )
        }
    
    return (
        <Tab.Navigator  >
            <Tab.Screen 
            name= 'Pocetna'
            component={HomeScreen}
            options={{
                 tabBarIcon: content,
             }} />
            <Tab.Screen 
            name= 'Napravite oglas' 
            component={CreateAdScreen}
            options={{
                tabBarIcon: ({ focused })=> <TabBarIcon focused={focused} name='md-create' />
            }} />
            <Tab.Screen 
            name= 'Sacuvani oglasi' 
            component={SavedAd}
            options={{
                tabBarIcon: badge
            }} />
        </Tab.Navigator>
    );
}
    

    const mapStateToProps = state => {
        return{
            newAds: state.ads.newAds,
            newFavAds: state.ads.newFavAds
        }
    }

    



    export default connect(mapStateToProps)(HomeTab) ;
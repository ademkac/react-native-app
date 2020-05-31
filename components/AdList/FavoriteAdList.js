import React from 'react';
import {StyleSheet, FlatList} from 'react-native';

import FavoritesItem from '../FavoritesItem/FavoritesItem';

const favoriteAdList = props => {
    return(
        <FlatList
        style={styles.container}
        data={props.ads}
        renderItem={(info) =>(
            <FavoritesItem 
            companyName={info.item.companyName}
            adInfo={info.item.adInfo}
            phoneNumber={info.item.phoneNumber}
            city={info.item.city}
            adImage={info.item.image}
            date={info.item.date}
             onItemPressed={()=> props.onItemSelected(info.item.key)}/> 
        )} />
    )
}

const styles = StyleSheet.create({
    container: {
    width:'100%'
       
    }
})

export default favoriteAdList;
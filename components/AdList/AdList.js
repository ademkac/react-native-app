import React from 'react';
import {StyleSheet, FlatList} from 'react-native';

import ListItem from '../ListItem/ListItem';

const adList = props => {
    return(
        <FlatList
        refreshing={props.refreshing}
        onRefresh={props.onRefresh}
        ListHeaderComponent={props.renderHeader} 
        /* inverted={true} */
        style={styles.container}
        data={props.ads}
        renderItem={(info) =>(
            <ListItem 
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

export default adList;
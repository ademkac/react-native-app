import React, { Component } from 'react';
import { View, StyleSheet, FlatList} from 'react-native';
import {connect} from 'react-redux';
import { getKat1Ad} from '../../store/actions/index';
import ListItem from '../../components/ListItem/ListItem';
import AdList from '../../components/AdList/AdList';

class Kategorija1 extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.onGetAds();
    }

    itemSelectedHandler = key => {
        const selAd = this.props.kat1Ads.find(ad=>{
            return ad.key === key;
        });
        console.log(selAd.key)
        console.log(selAd.companyName)
        
        this.props.navigation.navigate('AdDetail', {
            ad: selAd.key,
            name: selAd.companyName,
            adInfo: selAd.adInfo,
            number: selAd.phoneNumber,
            city: selAd.city,
            categories: selAd.categories,
            date: selAd.date,
            image: selAd.image
        })
    }

    
    
    render(){
        return (
            <View style={styles.container}>
                {/* <FlatList 
               style={{width: '100%'}}
               data={this.props.kat1Ads}
               renderItem = {(info) =>(
                 <ListItem 
                 city={info.item.city}
                 companyName={info.item.companyName}
                 phoneNumber={info.item.phoneNumber}
                 adInfo={info.item.adInfo}
                 adImage={info.item.image}
                 date={info.item.date}
                  />
                 
               )}
                /> */}  
                <AdList
                ads={this.props.kat1Ads}
                onItemSelected={this.itemSelectedHandler} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24
        
    },
    subContainer: {
        width: '100%',
        padding: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        
    }
})

const mapStateToProps = state => {
    return{
        kat1Ads: state.ads.kat1Ads
    };
};


const mapDispatchToProps = dispatch => {
    return{
        onGetAds: () => dispatch(getKat1Ad())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Kategorija1);
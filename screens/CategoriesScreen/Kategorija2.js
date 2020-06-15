import React, { Component } from 'react';
import { View, StyleSheet, FlatList} from 'react-native';
import {connect} from 'react-redux';
import { getKat2Ad} from '../../store/actions/index';
import ListItem from '../../components/ListItem/ListItem';
import AdList from '../../components/AdList/AdList';

class Kategorija2 extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.onGetAds();
    }

    itemSelectedHandler = key => {
        const selAd = this.props.kat2Ads.find(ad=>{
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
        kat2Ads: state.ads.kat2Ads
    };
};


const mapDispatchToProps = dispatch => {
    return{
        onGetAds: () => dispatch(getKat2Ad())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Kategorija2);
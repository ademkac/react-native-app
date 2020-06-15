import React, { Component } from 'react';
import { View, StyleSheet, FlatList} from 'react-native';
import {connect} from 'react-redux';
import { getKat3Ad} from '../../store/actions/index';
import AdList from '../../components/AdList/AdList';

class Kategorija3 extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.onGetAds();
    }

    itemSelectedHandler = key => {
        const selAd = this.props.kat3Ads.find(ad=>{
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
                ads={this.props.kat3Ads}
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
        kat3Ads: state.ads.kat3Ads
    };
};


const mapDispatchToProps = dispatch => {
    return{
        onGetAds: () => dispatch(getKat3Ad())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Kategorija3);
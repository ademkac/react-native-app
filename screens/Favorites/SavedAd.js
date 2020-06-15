import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {getFavoriteAd, favAdSeen} from '../../store/actions/index';
import FavoriteAdList from '../../components/AdList/FavoriteAdList';

class SavedAd extends Component {

    constructor(props){
        super(props);
        this._unsubscribe =  this.props.navigation.addListener('focus', ()=>{
            this.props.onLoadFavoriteAds();
             this.props.onSeenAd(); 
             } )
    }


   /*  componentDidMount(){

        
          
      } */
  
      componentWillUnmount(){
          this._unsubscribe();
      }

    itemSelectedHandler = key => {
        const selfavAd = this.props.favoriteAds.find(ad=>{
            return ad.key === key;
        });
        console.log(selfavAd)
        this.props.navigation.navigate('FavoriteAdDetail', {
            ad: selfavAd.key,
            name: selfavAd.companyName,
            adInfo: selfavAd.adInfo,
            number: selfavAd.phoneNumber,
            city: selfavAd.city,
            categories: selfavAd.categories,
            date: selfavAd.date,
            image: selfavAd.image 
        });
    }
    
    render(){
        let content = (
            <FavoriteAdList 
                       ads={this.props.favoriteAds}
                       onItemSelected={this.itemSelectedHandler} 
                />
                );

            if(this.props.favoriteAds.length === 0){
                content = (
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>Nemate omiljenih oglasa!</Text>
                )
            }
        return (
            <View style={styles.container}> 
                {content}
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
        favoriteAds: state.ads.favoriteAds
    };
};


const mapDispatchToProps = dispatch => {
    return{
        onLoadFavoriteAds: () => dispatch(getFavoriteAd()),
        onSeenAd: () => dispatch(favAdSeen())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedAd);
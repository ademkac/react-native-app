import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image,
    ScrollView } from "react-native";
import {connect} from 'react-redux';
import {removeAdFromFavorites} from '../../store/actions/index';

import TabBarIcon from '../../assets/TabBarIcon';

class FavoriteAdDetail extends Component {

    state={
        viewMode: 'portrait'
    };

    constructor(props){
        super(props);
        Dimensions.addEventListener('change', this.updateStyles)
    }

    

    componentWillUnmount(){
        Dimensions.removeEventListener('change', this.updateStyles)
    }

    updateStyles = dims => {
        this.setState({
            viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
        });
    };

    

    removeAdHandler = () => {
        this.props.onRemoveAd(this.props.route.params.ad);
        this.props.navigation.pop();
    }

   
    render(){
        

        return(
            <ScrollView>
            <View
            style={[
                styles.container,
                this.state.viewMode === "portrait"
                  ? styles.portraitContainer
                  : styles.landscapeContainer
              ]}>
        <View style={styles.subContainer}>
            <Image 
            source={this.props.route.params.image}
            style={{width: '100%', height: 300}}
             />
            <Text style={styles.textCompanyName}>{this.props.route.params.name}</Text>
            <Text style={styles.textAdInfo}>{this.props.route.params.adInfo}</Text>
            <Text style={{fontSize: 18, marginBottom: 5, fontWeight: 'bold'}}>Grad:                                <Text>Broj Telefona:</Text></Text>
            <Text style={styles.textCity}>{this.props.route.params.city}                               <Text >{this.props.route.params.number}</Text></Text> 
            <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 20}}>Datum objave oglasa:     <Text>{this.props.route.params.date}</Text> </Text>
            <TouchableOpacity onPress={this.removeAdHandler}>
                <View style={{alignItems: 'center'}}>
            <TabBarIcon name='md-trash'    />
                </View>
            </TouchableOpacity>
        </View>       
            </View>
            </ScrollView>
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 22,
        flex: 1
    },
    portraitContainer: {
        flexDirection: "column"
      },
      landscapeContainer: {
        flexDirection: "row"
      },
      adName: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 28
      },
      deleteButton: {
        alignItems: "center"
      },
      subContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
      },
      textCompanyName: {
          fontWeight: 'bold',
          fontSize: 20,
          textAlign: 'center',
          marginBottom: 10
      },
      textPhoneNumber: {
          textAlign: 'right',
          fontWeight: 'bold',
          fontSize: 18,
          marginBottom: 10
      },
      textCity: {
          fontSize: 18,
          textAlign: 'left',
          justifyContent: 'flex-start',
          marginBottom: 10
      },
      textAdInfo: {
          textAlign: 'justify',
          fontSize: 16,
          marginBottom: 30
      }
})

const mapDispatchToProps = dispatch => {
    return{
        onRemoveAd: key => dispatch(removeAdFromFavorites(key))
    }
}

 
 
export default connect(null, mapDispatchToProps)(FavoriteAdDetail);
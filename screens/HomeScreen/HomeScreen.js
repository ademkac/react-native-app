import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import { connect } from 'react-redux';
import AdList from '../../components/AdList/AdList';
import {getAd, adSeen} from '../../store/actions/index';
import Header from '../../components/AdList/header';



class HomeScreen extends Component {


    constructor(props){
        super(props);
        this.updateIndex=this.updateIndex.bind(this);
        this.state={
            adsLoaded: false,
            removeAnim: new Animated.Value(1),
            adsAnim: new Animated.Value(0),
            temp: [],
            search: null,
            selectedIndex: 0
        };

    }
    

    UNSAFE_componentWillMount(){
    /* this.setState({temp: this.props.ads}) */
    this.tempStateHandler()
     }  

    componentDidMount(){
        this._unsubscribe =  this.props.navigation.addListener('focus', ()=>{
            this.props.onLoadAds();
            this.props.onSeenAds();
           } )
        
    }

    componentWillUnmount(){
        this._unsubscribe();
    }


    adsLoadedHandler = () => {
        Animated.timing(this.state.adsAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
    }

    adsSearchHandler = () => {
        Animated.timing(this.state.removeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start(()=>{
            this.setState({
                adsLoaded: true
            });
            this.adsLoadedHandler();
        });
    };

    itemSelectedHandler = key => {
        const selAd = this.props.ads.find(ad=>{
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

    tempStateHandler = () => {
        this.setState({
            temp: this.props.ads
        }), ()=>{
            this.props.onLoadAds();
        }
    }

    onChangeTextHandler = (search) => {
        const niz = this.props.ads
        if(search === null){
            this.setState({
                temp: niz
            }) 
        }
        
        const array = [];
        if(this.state.selectedIndex == 0){
            for(let i=0; i<niz.length; i++){
                if(niz[i].companyName.toLowerCase().includes(search)){
                    array.push(niz[i])
                }
            }
        } else {
            for(let i=0; i<niz.length; i++){
                if(niz[i].city.toLowerCase().includes(search)){
                    array.push(niz[i])
                }
            }
        }
        
        this.setState({
            temp: array
        }) 

      
    }

    onClearHandler = () => {
            this.setState({
                temp: this.props.ads
            })
    }

    renderHeader = () => {
        const buttons = ['Ime oglasivaca', 'Grad']
        const {selectedIndex} = this.state
        

        return (
            <Header 
            search={this.state.search}
            onChangeTextHandler={this.onChangeTextHandler}
            onClearHandler={this.onClearHandler}
            updateIndex={this.updateIndex}
            selectedIndex={selectedIndex}
            buttons={buttons}
             />
        )
    }

    updateIndex = selectedIndex => {
        this.setState({
            selectedIndex
        })
    }

    handleRefresh = () => {
        this.setState({
            temp: this.props.ads
        }), ()=>{
            this.props.onLoadAds();
        }
    }


    render(){
        
        let content = (
            <Animated.View
            style={{
                opacity: this.state.removeAnim,
                transform: [
                    {
                        scale: this.state.removeAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [12, 1]
                        })
                    }
                ],
                
            }}>
                <TouchableOpacity onPress={this.adsSearchHandler}>
                    <View style={styles.searchButton}>
                        <Text style={styles.searchButtonText}>OGLASI</Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );
        if(this.state.adsLoaded){
            content = (
                <Animated.View style={{
                    opacity: this.state.adsAnim
                }}>
                   <AdList 
            renderHeader={this.renderHeader} 
            ads={this.state.temp}
            refreshing={this.props.isLoading}
            onRefresh={this.handleRefresh}
            onItemSelected={this.itemSelectedHandler} 
     />
                </Animated.View>
            )
        }
        return(
            <View style={this.state.adsLoaded ? null : styles.buttonContainer}>
            {content}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      },
    searchButton: {
      borderColor: "orange",
      borderWidth: 3,
      borderRadius: 50,
      padding: 20
    },
    searchButtonText: {
      color: "#947a47",
      fontWeight: "bold",
      fontSize: 26
    },
    
    
})


const mapStateToProps = state => {
    return{
        ads: state.ads.ads,
        isLoading: state.ui.isLoading
    };
};

const mapDispatchToProps = dispatch => {
    return{
        onLoadAds: () => dispatch(getAd()),
        onSeenAds: () => dispatch(adSeen())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
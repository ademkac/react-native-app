import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  ActivityIndicator
} from 'react-native';
import {connect} from 'react-redux';

import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import { addAd, startAddAd } from '../../store/actions/ads';
import validate from '../../utility/validation';
import PickerCategories from '../../components/Picker/PickerCategories';
import PickImage from '../../components/PickImage/PickImage';
import moment from 'moment';
import {newAd} from '../../store/actions/index';

class CreateAdScreen extends Component{

  

  constructor(props) {
    super(props);
  }

  componentDidMount(){
   console.log(new Date()) 
  }


  UNSAFE_componentWillMount(){
    this.reset();
  }
 
  reset = () => {
    this.setState({
      ad:{ 
        adInfo:{
          value: "",
          valid: false,
          touched: false,
          validationRules: {
            notEmpty: true
          }
        },
        phoneNumber:{
          value: "",
          valid: false,
          touched: false,
          validationRules: {
            notEmpty: true
          }
        },
        companyName:{
          value: "",
          valid: false,
          touched: false,
          validationRules: {
            notEmpty: true
          }
        },
        city: {
          value: "",
          valid: false,
          touched: false,
          validationRules: {
            notEmpty: true
          }
        },
        categories: 'Javni parking',
        image: {
          value: null,
          valid: false
        }
      }
    })
  }



  adInfoChangedHandler = adinfo => {
    this.setState(prevState=>{
      return{
        ad: {
          ...prevState.ad,
          adInfo:{
            ...prevState.ad.adInfo,
            value: adinfo,
            valid: validate(adinfo, prevState.ad.adInfo.validationRules),
            touched: true
          }
        }
      };
    });
  }

   companyNameChangedHandler = companyname => {
    this.setState(prevState=>{
      return{
        ad: {
          ...prevState.ad,
          companyName: {
            ...prevState.ad.companyName,
            value: companyname,
            valid: validate(companyname, prevState.ad.companyName.validationRules),
            touched: true
          }
        }
      }
    });
  }

  phoneNumberChangedHandler = phonenumber => {
    this.setState(prevState=>{
      return{
        ad: {
          ...prevState.ad,
          phoneNumber: {
            ...prevState.ad.phoneNumber,
            value: phonenumber,
            valid: validate(phonenumber, prevState.ad.phoneNumber.validationRules),
            touched: true
          }
        }
      }
    });
  } 

  cityChangedHandler = cityval => {
    this.setState(prevState=>{
      return{
        ad: {
          ...prevState.ad,
          city: {
            ...prevState.ad.city,
            value: cityval,
            valid: validate(cityval, prevState.ad.city.validationRules),
            touched: true
          }
        }
      }
    })
  }

  pickerChangedHandler = (item) => {
    this.setState(prevState => {
      return{
        ad: {
          ...prevState.ad,
          categories: item
        }
      }
    })
  }

  imagePickedHandler = image => {
    this.setState(prevState => {
      return{
        ad: {
          ...prevState.ad,
          image: {
            value: image,
            valid: true
          }
        }
      }
    })
  }



  adAddedHandler = () => {
    this.props.onAddAd(
      this.state.ad.companyName.value,
      this.state.ad.adInfo.value,
      this.state.ad.phoneNumber.value,
      this.state.ad.city.value,
      this.state.ad.categories,
      this.state.ad.image.value,
      date=moment().format('DD.MM.YYYY.')
    );
    /* this.props.onNewAd() */
    this.reset();
    this.imagePicker.reset();
  };



  render(){

    let submitButton =(
      <Button 
        title='Objavi'
        onPress={this.adAddedHandler}
        disabled={
          !this.state.ad.companyName.valid ||
          !this.state.ad.adInfo.valid ||
          !this.state.ad.phoneNumber.valid ||
          !this.state.ad.city.valid ||
          !this.state.ad.image.valid
        } />
    );

    if (this.props.isLoading){
      submitButton = <ActivityIndicator />;
    }

    return (
      <ScrollView>
      <View style={styles.container}>
       <Text style={styles.textContainer}>
          Napravite vas oglas
        </Text>
        <View style={styles.inputContainer}>
          <Text>
            Naziv firme
          </Text>
          <DefaultInput 
          placeholder='Naziv firme' 
          autoCorrect={false}
          style={styles.input}
          value={this.state.ad.companyName.value }
           onChangeText={this.companyNameChangedHandler} />
           <Text>
            Text oglasa
          </Text>
          <DefaultInput 
          multiline={true}
          autoCorrect={false}
          textAlignVertical='top'
          placeholder='Unesite informacije o oglasu' 
          style={styles.input1}
          value={this.state.ad.adInfo.value}
          onChangeText={this.adInfoChangedHandler}/>
          <Text>
            Kontakt telefon
          </Text>
          <DefaultInput 
          autoCorrect={false}
          placeholder='Broj telefona' 
          style={styles.input}
          value={this.state.ad.phoneNumber.value}
          onChangeText={this.phoneNumberChangedHandler}/> 
          <Text>
            Grad
          </Text>
          <DefaultInput 
          autoCorrect={false}
          placeholder='Grad' 
          style={styles.input}
          value={this.state.ad.city.value}
          onChangeText={this.cityChangedHandler}/>
           <Text>
            Kategorije
          </Text>
         <PickerCategories
         setSelectedValue = {this.pickerChangedHandler}
         selectedValue= {this.state.ad.categories}
         kategorija1='Javni parking'
         kategorija2='Pogrebne usluge'
         kategorija3='Gradski prevoz'
         kategorija4='Dimnicarske usluge'
            /> 
          <PickImage 
          onImagePicked={this.imagePickedHandler}
          ref={ref => (this.imagePicker = ref)}/>
        </View>
        <View style={styles.buttonContainer}>
          {submitButton}
        </View>  
      </View>
      </ScrollView>

      );
  }   
};

const styles= StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    width: '100%'
  },
  blackContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#171716',
    width: '100%'
  },
  textContainer: {
    fontSize: 28,
    fontWeight: 'bold',
    margin: 25,
    textAlign: 'center',
    padding: 15,
    marginLeft: 60,
},
blackTextContainer: {
  fontSize: 28,
  fontWeight: 'bold',
  margin: 25,
  textAlign: 'center',
  padding: 15,
  marginLeft: 60,
  color: '#ebebe4'
},
textp:{
  color: '#ebebe4'
},
inputContainer: {
  width: '100%',
  padding: 10
},
input: {
  backgroundColor: "#eee",
  borderColor: "#bbb",
  marginTop: 8,
  marginBottom: 8
  
  
},
input1: {
  backgroundColor: '#eee',
  borderColor: '#bbb',
  height: 150,
  justifyContent: 'center',
  alignItems: 'flex-start',
  marginTop: 8,
  marginBottom: 8
},
buttonContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  marginTop: 15,
  marginBottom: 15
}
})

const mapStateToProps = state => {
  return{
    isLoading: state.ui.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onAddAd: (companyName, adInfo, phoneNumber, city, categories, image, date) =>
    dispatch(addAd(companyName, adInfo, phoneNumber, city, categories, image, date))
    /* onNewAd: () => dispatch(newAd()) */
  };
};



  

export default connect(mapStateToProps, mapDispatchToProps)(CreateAdScreen);

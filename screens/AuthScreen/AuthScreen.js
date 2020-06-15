

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';
import {connect} from 'react-redux';


import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import AuthInput from '../../components/UI/AuthInput/AuthInput';
import validate from '../../utility/validation';
import {tryAuth, loggedIn, loggedOff} from '../../store/actions/index';


class AuthScreen extends Component{

    state={
        viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
        authMode: 'login',
        controls: {
          email: {
            value: '',
            valid: false,
            validationRules: {
              isEmail: true
            },
            touched: false
          },
          password: {
            value: '',
            valid: false,
            validationRules: {
              minLength: 6
            },
            touched: false
          },
          confirmPassword: {
            value: '',
            valid: false,
            validationRules: {
              equalTo: 'password'
            },
            touched: false
          }
        }
    
      };

    constructor(props){
        super(props);
        Dimensions.addEventListener('change', this.updateStyles);
    }

    componentWillUnmount(){
        Dimensions.removeEventListener('change', this.updateStyles);
    }

     componentDidMount(){
      console.log(this.props.isLoggedIn)
    } 

    switchAuthModeHandler = () =>{
      this.setState(prevState =>{
        return{
          authMode: prevState.authMode === 'login' ? 'signup' : 'login'
        };
      })
    }

    updateStyles = (dims) =>{
        this.setState({
            viewMode: 
            dims.window.height > 500 ? 'portrait' : 'landscape'
        });
    }

    authHandler = () => {
      const authData = {
        email: this.state.controls.email.value,
        password: this.state.controls.password.value
      };
      this.props.onTryAuth(authData, this.state.authMode);
      console.log(this.props.isLoggedIn)
      if(this.props.isLoggedIn){
        this.props.navigation.navigate('Aplikacija');
      } else {
        null
      }
    }

    updateInputState = (key, value) => {
      let connectedValue = {};
      if(this.state.controls[key].validationRules.equalTo){
        const equalControl = this.state.controls[key].validationRules.equalTo;
        const equalValue = this.state.controls[equalControl].value;
        connectedValue = {
          ...connectedValue,
          equalTo: equalValue
        };
      }
      if(key === 'password'){
        connectedValue = {
          ...connectedValue,
          equalTo: value
        };
      }
      this.setState(prevState=>{
        return{
          controls: {
            ...prevState.controls,
            confirmPassword: {
              ...prevState.controls.confirmPassword,
              valid:
                key === 'password'
                ? validate(
                  prevState.controls.confirmPassword.value,
                  prevState.controls.confirmPassword.validationRules,
                  connectedValue
                )
                : prevState.controls.confirmPassword.valid
            },
            [key]: {
              ...prevState.controls[key],
              value: value,
              valid: validate(
                value,
                prevState.controls[key].validationRules,
                connectedValue
              ),
              touched: true
            }
          }
        };
      });
    };


  render(){

    let headingText = null;
    let confirmPasswordControl = null;
    let submitButton = (
      <ButtonWithBackground
        color="#29aaf4"
        onPress={this.authHandler}
        disabled={
          !this.state.controls.confirmPassword.valid && this.state.authMode === "signup" ||
          !this.state.controls.email.valid ||
          !this.state.controls.password.valid
        }
      >
        Submit
      </ButtonWithBackground>
    )


    if (this.state.viewMode === 'portrait'){
        headingText = (
            <MainText>
                <HeadingText>Molimo vas ulogujte se</HeadingText>
            </MainText>
            
        );
    }
    if(this.state.authMode === 'signup'){
      confirmPasswordControl=(
        <View
        style={
          this.state.viewMode === 'portrait'
          ? styles.portraitPasswordWrapper
          : styles.landscapePasswordWrapper
        }>
          <AuthInput 
          placeholder='Confirm Password'
          style={styles.input}
          value={this.state.controls.confirmPassword.value}
          onChangeText = {val => this.updateInputState('confirmPassword', val)}
          valid={this.state.controls.confirmPassword.valid}
          touched={this.state.controls.confirmPassword.touched}
          secureTextEntry
          />
        </View>
      )
    }
    if (this.props.isLoading){
      submitButton = <ActivityIndicator />
    }

    return (
      
      <KeyboardAvoidingView style={styles.container} behavior="padding">
      {headingText}
      <ButtonWithBackground
        color="#29aaf4"
        onPress={this.switchAuthModeHandler}
      >
        Switch to {this.state.authMode === "login" ? "Sign Up" : "Login"}
      </ButtonWithBackground>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inputContainer}>
          <AuthInput
            placeholder="Your E-Mail Address"
            style={styles.input}
            value={this.state.controls.email.value}
            onChangeText={val => this.updateInputState("email", val)}
            valid={this.state.controls.email.valid}
            touched={this.state.controls.email.touched}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
          />
          <View
            style={
              this.state.viewMode === "portrait" ||
              this.state.authMode === "login"
                ? styles.portraitPasswordContainer
                : styles.landscapePasswordContainer
            }
          >
            <View
              style={
                this.state.viewMode === "portrait" ||
                this.state.authMode === "login"
                  ? styles.portraitPasswordWrapper
                  : styles.landscapePasswordWrapper
              }
            >
              <AuthInput
                placeholder="Password"
                style={styles.input}
                value={this.state.controls.password.value}
                onChangeText={val => this.updateInputState("password", val)}
                valid={this.state.controls.password.valid}
                touched={this.state.controls.password.touched}
                secureTextEntry
              />
            </View>
            {confirmPasswordControl}
            
          </View>
        </View>
      </TouchableWithoutFeedback>
      {submitButton}
      <TouchableOpacity onPress={()=>this.props.navigation.navigate('Aplikacija')}>
              <Text style={styles.textStyle}>Idite na pocetnu</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
    
      );
  }   
};

const styles= StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'

  },
  inputContainer: {
    width: "100%"
  },
  input: {
    backgroundColor: "#eee",
    borderColor: "#bbb",
    margin: 8
  },
  landscapePasswordContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  portraitPasswordContainer: {
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  landscapePasswordWrapper: {
    width: "45%"
  },
  portraitPasswordWrapper: {
    width: "100%"
  }, 
  backgroundImage: {
      flex: 1,
      width: '100%'
  },
  textStyle: {
    color: 'blue',
    fontWeight: 'bold'
  }
  
  
})

const mapStateToProps = state => {
  return{
    isLoading: state.ui.isLoading,
    isLoggedIn: state.auth.isLoggedIn
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onTryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode)) ,
     /* onLoggedIn: () => dispatch(loggedIn()),
     onLoggedOff: ()=> dispatch(loggedOff()) */ 
  };
};


  

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);

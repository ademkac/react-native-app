 import {AsyncStorage} from 'react-native'; 
import { AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN, LOGGED_IN, LOGGED_OFF } from './actionTypes';
import {uiStartLoading, uiStopLoading} from './index';


const API_KEY = 'AIzaSyCiD-K1rnYC8KDrq6mIg18fmj7x_4tUJ7w';



export const tryAuth = ( authData, authMode) => {
    return dispatch => {
        dispatch(uiStartLoading());
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + API_KEY
        if(authMode === 'signup'){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +API_KEY
        } 
        fetch(url,{
            method: 'POST',
            body: JSON.stringify({
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .catch(err => {
            console.log(err);
            alert('Authentication failed, please try again!');
            dispatch(uiStopLoading());
            
        })
        .then(res => res.json())
        .then(parsedRes => {
            dispatch(uiStopLoading());
            console.log(parsedRes);
            if(!parsedRes.idToken){
                alert('Ne postoji nalog sa unetim mailom!');
            } else {
               dispatch(
                   authStoreToken(
                       parsedRes.idToken,
                       parsedRes.expiresIn,
                       parsedRes.refreshToken
                   ), 
                   loggedIn()  
               );
               /* dispatch(); */
               alert('Uspesno ste se ulogovali');
            }
           
            
        })
    }
}

export const authStoreToken = (token, expiresIn, refreshToken) => {
    return dispatch => {
        const now = new Date();
        const expiryDate = now.getTime() + expiresIn * 1000;
        console.log(expiryDate)
        dispatch(authSetToken(token, expiryDate));
        AsyncStorage.setItem('ap:auth:token', token);
        AsyncStorage.setItem('ap:auth:expiryDate', expiryDate.toString());
        AsyncStorage.setItem('ap:auth:refreshToken', refreshToken);
    }
}

export const authSetToken = (token, expiryDate) => {
    return {
        type: AUTH_SET_TOKEN,
        token: token,
        expiryDate: expiryDate
    };
};

export const loggedIn = () => {
    return{
        type: LOGGED_IN
        
    }
}

export const loggedOff = () => {
    return{
        type: LOGGED_OFF
    }
}

export const authGetToken = () => {
    return(dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            const token = getState().auth.token;
            const expiryDate = getState().auth.expiryDate;
            if(!token || new Date(expiryDate) <= new Date()){
                let fetchedToken;
                AsyncStorage.getItem('ap:auth:token')
                .catch(err => reject())
                .then(tokenFromStorage => {
                    fetchedToken = tokenFromStorage;
                    if(!tokenFromStorage){
                        reject();
                        return;
                    }
                    return AsyncStorage.getItem('ap:auth:expiryDate');
                })
                .then(expiryDate => {
                    const parsedExpiryDate = new Date(parseInt(expiryDate));
                    const now = new Date();
                    if(parsedExpiryDate > now){
                        dispatch(authSetToken(fetchedToken));
                        resolve(fetchedToken);
                    } else {
                        reject();
                    }
                })
                .catch(err => reject());
            } else {
                resolve(token);
            }
        });
        return promise
        .catch(err => {
            return AsyncStorage.getItem('ap:auth:refreshToken')
            .then(refreshToken => {
                return fetch(
                    'https://securetoken.googleapis.com/v1/token?key=' + API_KEY,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: 'grant_type=refresh_token&refresh_token=' +refreshToken
                    }
                );
            })
            .then(res => res.json())
            .then(parsedRes=> {
                if(parsedRes.id_token){
                    console.log('refresh token worked')
                    dispatch(
                        authStoreToken(
                            parsedRes.id_token,
                            parsedRes.expires_in,
                            parsedRes.refresh_token
                        )
                    );
                    return parsedRes.id_token;
                } else {
                    dispatch(authClearStorage());
                }
            });
        })
        .then(token => {
            if(!token){
                throw new Error();
            } else {
                return token;
            }
        })
    }
}

 /* export const authAutoSignIn = () => {
    return dispatch => {
      dispatch(authGetToken())
        .then(token => {
          navigation.navigate('Aplikacija');
        })
        .catch(err => console.log("Failed to fetch token!"));
    };
  };  */

export const authClearStorage = () => {
    return dispatch => {
      AsyncStorage.removeItem('ap:auth:token');
      AsyncStorage.removeItem('ap:auth:expiryDate');
      return AsyncStorage.removeItem('ap:auth:refreshToken');
    };
  };

  export const authLogout = () => {
    return dispatch => {
      dispatch(authClearStorage());
       dispatch(authRemoveToken());
       dispatch(loggedOff());
        
    };
  };

  export const authRemoveToken = () => {
    return {
      type: AUTH_REMOVE_TOKEN
    };
  };
  
  

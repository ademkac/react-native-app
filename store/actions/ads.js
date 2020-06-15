import {SET_AD,
       AD_ADDED,
       START_ADD_AD,
       SAVE_AD_FAVORITES,
       REMOVE_AD_FAVORITES,
        SAVE_AD_KAT1,
        SAVE_AD_KAT2,
        SAVE_AD_KAT3,
        SAVE_AD_KAT4,
        NEW_AD,
        NEW_FAV_AD,
        FAV_AD_SEEN,
        AD_SEEN,
        FILTER_ADS} from './actionTypes';
import {uiStopLoading, uiStartLoading, authGetToken} from './index';


export const startAddAd = () => {
    return{
        type: START_ADD_AD
    }
}

export const addAd = (companyName, adInfo, phoneNumber, city, categories, image, date) => {
    return dispatch => {
        let authToken;
        dispatch(uiStartLoading());
       dispatch(authGetToken())
       .catch(() => {
           alert('Molimo vas da se ulogujete ako zelite da objavite oglas!');
       }).then(token => {
           authToken=token;
           return fetch("https://us-central1-adem-hci.cloudfunctions.net/storeImage",
           {
              method: "POST",
              body: JSON.stringify({
                  image: image.base64
              }),
              headers: {
                  Authorization: "Bearer " + authToken
              } 
           }
           )
        })
        .catch(err => {
            console.log(err);
            alert("Something went wrong, please try again!");
            dispatch(uiStopLoading());
          })
          .then(res => {
            if (res.ok) {
              return res.json();
            } else {
              throw new Error();
            }
          })
          .then(parsedRes => {
              console.log(parsedRes)
            const adData = {
                companyName: companyName,
                adInfo: adInfo,
                phoneNumber: phoneNumber,
                city: city,
                categories: categories,
                image: parsedRes.imageUrl,
                imagePath: parsedRes.imagePath,
                date: date
            };
            return fetch('https://adem-hci.firebaseio.com/ads.json?auth=' +
        authToken,
         {
            method: 'POST',
            body: JSON.stringify(adData)
       })
       })
       .then(res => {
           if(res.ok){
               return res.json();
           } else {
               throw new Error();
           }
       })
       .then(parsedRes => {
           console.log(parsedRes);
           dispatch(uiStopLoading());
           dispatch(adAdded());
            dispatch(newAd()); 
       })
       .catch(err => {
           console.log(err);
            alert('Molimo vas da se ulogujete ako zelite da obajavite oglas');
            dispatch(uiStopLoading());
       });    
    }
};

export const addFavoriteAd = (companyName, adInfo, phoneNumber, city, categories,image, date) => {
    return dispatch => {
        let authToken;
        dispatch(uiStartLoading());
       dispatch(authGetToken())
       .catch(() => {
           alert('Molimo vas da se ulogujete ako zelite da objavite oglas!');
       }).then(token => {
           authToken=token;
           return fetch("https://us-central1-adem-hci.cloudfunctions.net/storeFavImage",
           {
              method: "POST",
              body: JSON.stringify({
                  image: image.base64
              }),
              headers: {
                  Authorization: "Bearer " + authToken
              } 
           }
           )
        })
        .catch(err => {
            console.log(err);
            alert("Something went wrong, please try again!");
            dispatch(uiStopLoading());
          })
          .then(res => {
            if (res.ok) {
              return res.json();
            } else {
              throw new Error();
            }
          })
          .then(parsedRes => {
            const adData = {
                companyName: companyName,
                adInfo: adInfo,
                phoneNumber: phoneNumber,
                city: city,
                categories: categories,
                image: parsedRes.imageUrl,
                imagePath: parsedRes.imagePath,
                date: date
            };
            return fetch('https://adem-hci.firebaseio.com/favoriteads.json?auth=' +
        authToken,
         {
            method: 'POST',
            body: JSON.stringify(adData)
       })
       })
       .then(res => {
           if(res.ok){
               return res.json();
           } else {
               throw new Error();
           }
       })
       .then(parsedRes => {
           console.log(parsedRes);
           dispatch(uiStopLoading());
           dispatch(adAdded());
       })
       .catch(err => {
           console.log(err);
            alert('Molimo vas da se ulogujete ako zelite da sacuvate oglas');
            dispatch(uiStopLoading());
       });    
    }
};

export const adAdded = () => {
    return{
        type: AD_ADDED
    }
}

export const getAd = () => {
    return dispatch => {
        fetch('https://adem-hci.firebaseio.com/ads.json')
        .catch(err => {
            alert('Something went wrong, sorry :/');
            console.log(err);
        })
        .then(res => res.json())
        .then(parsedRes => {
            const ads = [];
            for(let key in parsedRes){
                ads.push({
                    ...parsedRes[key],
                    image: {
                        uri: parsedRes[key].image
                    },
                     key: key 
                });
            }
            dispatch(setAds(ads.reverse()));
        })
    }
}

export const getKat1Ad = () => {
    return dispatch => {
        fetch('https://adem-hci.firebaseio.com/ads.json')
        .catch(err => {
            alert('Something went wrong, sorry :/');
            console.log(err);
        })
        .then(res => res.json())
        .then(parsedRes => {
            const kat1Ads = [];
            for(let key in parsedRes){
                if(parsedRes[key].categories === 'Javni parking'){
                    kat1Ads.push({
                        ...parsedRes[key],
                        image:{
                            uri: parsedRes[key].image
                        },
                         key: key 
                    });
                }
                
            }
            dispatch(saveKat1Ad(kat1Ads));
        })
    }
}

export const getKat2Ad = () => {
    return dispatch => {
        fetch('https://adem-hci.firebaseio.com/ads.json')
        .catch(err => {
            alert('Something went wrong, sorry :/');
            console.log(err);
        })
        .then(res => res.json())
        .then(parsedRes => {
            const kat2Ads = [];
            for(let key in parsedRes){
                if(parsedRes[key].categories === 'Gradski prevoz'){
                    kat2Ads.push({
                        ...parsedRes[key],
                        image:{
                            uri: parsedRes[key].image
                        },
                         key: key 
                    });
                }
                
            }
            dispatch(saveKat2Ad(kat2Ads));
        })
    }
}

export const getKat3Ad = () => {
    return dispatch => {
        fetch('https://adem-hci.firebaseio.com/ads.json')
        .catch(err => {
            alert('Something went wrong, sorry :/');
            console.log(err);
        })
        .then(res => res.json())
        .then(parsedRes => {
            const kat3Ads = [];
            for(let key in parsedRes){
                if(parsedRes[key].categories === 'Pogrebne usluge'){
                    kat3Ads.push({
                        ...parsedRes[key],
                        image:{
                            uri: parsedRes[key].image
                        },
                         key: key 
                    });
                }
                
            }
            dispatch(saveKat3Ad(kat3Ads));
        })
    }
}

export const getKat4Ad = () => {
    return dispatch => {
        fetch('https://adem-hci.firebaseio.com/ads.json')
        .catch(err => {
            alert('Something went wrong, sorry :/');
            console.log(err);
        })
        .then(res => res.json())
        .then(parsedRes => {
            const kat4Ads = [];
            for(let key in parsedRes){
                if(parsedRes[key].categories === 'Dimnicarske usluge'){
                    kat4Ads.push({
                        ...parsedRes[key],
                        image:{
                            uri: parsedRes[key].image
                        },
                         key: key 
                    });
                }
                
            }
            dispatch(saveKat4Ad(kat4Ads));
        })
    }
}

export const getFavoriteAd = () => {
    return dispatch => {
        fetch('https://adem-hci.firebaseio.com/favoriteads.json')
        .catch(err => {
            alert('Something went wrong, sorry :/');
            console.log(err);
        })
        .then(res => res.json())
        .then(parsedRes => {
            const favoriteAds = [];
            for(let key in parsedRes){
                favoriteAds.push({
                    ...parsedRes[key],
                    image:{
                        uri: parsedRes[key].image
                    },
                     key: key 
                });
            }
            dispatch(saveAd(favoriteAds.reverse()));
        })
    }
}


export const removeAdFromFavorites = key => {
    return dispatch => {
        dispatch(authGetToken())
        .catch(()=>{
            alert('No valid token found');
        })
        .then(token => {
            dispatch(deleteAd(key));
            return fetch('https://adem-hci.firebaseio.com/favoriteads/' +
            key +
            '.json?auth=' +
            token,
            {
                method: "DELETE"
            }
            );
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error();
            }
        })
        .then(parsedRes => {
            console.log('Done!');
        })
        .catch(err => {
            alert('Something went wrong, sorry :/');
            console.log(err);
        });
    }
}


export const setAds = ads => {
    return{
        type: SET_AD,
        ads: ads
    }
}

export const saveAd = favoriteAds => {
    return{
        type: SAVE_AD_FAVORITES,
        favoriteAds: favoriteAds
    }
}

export const saveKat1Ad = kat1Ads => {
    return{
        type: SAVE_AD_KAT1,
        kat1Ads: kat1Ads
    }
}

export const saveKat2Ad = kat2Ads => {
    return{
        type: SAVE_AD_KAT2,
        kat2Ads: kat2Ads
    }
}

export const saveKat3Ad = kat3Ads => {
    return{
        type: SAVE_AD_KAT3,
        kat3Ads: kat3Ads
    }
}

export const saveKat4Ad = kat4Ads => {
    return{
        type: SAVE_AD_KAT4,
        kat4Ads: kat4Ads
    }
}


export const deleteAd = key => {
    return{
        type: REMOVE_AD_FAVORITES,
        key: key
    }
}

export const newAd = () => {
    return{
        type: NEW_AD
    }
}

export const newFavAd = () => {
    return{
        type: NEW_FAV_AD
    }
}

export const favAdSeen = () => {
    return{
        type: FAV_AD_SEEN
    }
}

export const adSeen = () => {
    return{
        type: AD_SEEN
    }
}

export const filterAds = (val) => {
    return{
        type: FILTER_ADS,
        val: val
    }
}
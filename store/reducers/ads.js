import {SET_AD, AD_ADDED,
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
FILTER_ADS} from '../actions/actionTypes';

const initialState = {
    ads: [],
    favoriteAds: [],
    kat1Ads: [],
    kat2Ads: [],
    kat3Ads: [],
    kat4Ads: [],
    adAdded: false,
    newAds: 0,
    newFavAds: 0
};


const reducer = (state=initialState, action) => {
    switch(action.type){
        case SET_AD:
            return{
                ...state,
                ads: action.ads
            };
        case START_ADD_AD:
            return{
                ...state,
                adAdded: false
            };
        case AD_ADDED:
            return{
                ...state,
                adAdded: true
            };
        case SAVE_AD_FAVORITES:
            return{
                ...state,
                favoriteAds: action.favoriteAds
                
            };
        case SAVE_AD_KAT1:
            return{
                ...state,
               kat1Ads: action.kat1Ads
                
            };
        case SAVE_AD_KAT2:
                return{
                    ...state,
                   kat2Ads: action.kat2Ads
                    
                };
        case SAVE_AD_KAT3:
                return{
                        ...state,
                       kat3Ads: action.kat3Ads
                        
                    };
         case SAVE_AD_KAT4:
                return{
                            ...state,
                           kat4Ads: action.kat4Ads
                            
                        };
        case REMOVE_AD_FAVORITES:
            return{
                ...state,
                favoriteAds: state.favoriteAds.filter(ad => {
                    return ad.key !== action.key;
                })
            };
        case NEW_AD:
            return{
                ...state,
                newAds: state.newAds + 1
            } 
        case NEW_FAV_AD: 
            return{
                ...state,
                newFavAds: state.newFavAds + 1
            }
        case FAV_AD_SEEN: 
            return{
                ...state,
                newFavAds: state.newFavAds = 0
            }
        case AD_SEEN: 
            return{
                ...state,
                newAds: state.newAds = 0
            }
       /*  case FILTER_ADS:
            return{
                ...state,
                ads: state.ads.filter(ad => ad.companyName.toLowerCase().incudes(action.val.toLowerCase()))
            } */
        default:
            return state;        
    }
}

export default reducer;
import { AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN, LOGGED_IN, LOGGED_OFF } from '../actions/actionTypes';

const initialState = {
  token: null,
  expiryDate: null,
  isLoggedIn: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SET_TOKEN:
      return {
        ...state,
        token: action.token,
        expiryDate: action.expiryDate
      };
    case AUTH_REMOVE_TOKEN:
      return {
        ...state,
        token: null,
        expiryDate: null
      };
    case LOGGED_IN:
      return {
        ...state,
        isLoggedIn: true
      };
    case LOGGED_OFF:
      return{
        ...state,
        isLoggedIn: false
      };
    default:
      return state;
  }
};

export default reducer;

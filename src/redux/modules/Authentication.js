import update from 'react-addons-update';
import {loadState, saveState} from "../../components/LocalStorage/index.ts";
import {checkEmpty} from "@funcUtils/checkEmpty.ts";
import {StorageKeys} from "../../constants";


export const AUTH_INIT = "AUTH_INIT";
export const AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS";
export const AUTH_LOGIN_FAILURE = "AUTH_LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

export const loginSuccess = (username, token) => {
  return {
    type: AUTH_LOGIN_SUCCESS, username, token
  };
}

export const loginFailure = () => {
  return {
    type: AUTH_LOGIN_FAILURE
  };
}

export const logout = () => {
  return {
    type: LOGOUT
  };
}


const initialState = {
  login: {
    status: 'INIT'
  },
  status: {
    isLoggedIn: false,
    currentUser: '',
  },
  accessToken: '',
};

function Authentication(state, action) {
  if(typeof state === "undefined")
    state = initialState;

  switch(action.type) {
    case AUTH_INIT:
      return initialState;

    case AUTH_LOGIN_SUCCESS:
      console.log('login success');
      const successUpdated = update(state, {
        login: {
          status: { $set: 'SUCCESS' }
        },
        status: {
          isLoggedIn: { $set: true },
          currentUser: { $set: action.username },
        },
        accessToken: { $set: action.token},
      });
      saveState( StorageKeys.AUTHENTICATION, successUpdated );
      return successUpdated

    case AUTH_LOGIN_FAILURE:
      console.log('login failed');
      const failedUpdated = update(state, {
        login: {
          status: { $set: 'FAILURE' }
        }
      });
      saveState( StorageKeys.AUTHENTICATION, failedUpdated );
      return failedUpdated;

    case LOGOUT:
      saveState(StorageKeys.AUTHENTICATION, initialState)
      return initialState;

    default:
      try {
        return checkEmpty(loadState('authentication'))?
          state : loadState('authentication');
      }
      catch(e){
        return initialState
      }
  }
}

export default Authentication;
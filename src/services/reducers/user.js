import {
  POST_LOGIN, POST_LOGIN_SUCCESS, POST_LOGIN_FAILED, POST_LOGOUT
} from "../actions/user";

const initialState = {
  loggedIn: false,
  requestProgress: false,
  requestFailed: false,
  name: '',
  email: ''
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_LOGIN: {
      return {
        ...state,
        requestProgress: true,
        requestFailed: false
      }
    }
    case POST_LOGIN_SUCCESS: {
      return {
        ...state,
        requestProgress: false,
        requestFailed: false,
        loggedIn: true,
        name: action.name,
        email: action.email,
      }
    }
    case POST_LOGIN_FAILED: {
      return {
        ...state,
        requestProgress: false,
        requestFailed: true,
        name: '',
        email: ''
      }
    }
    case POST_LOGOUT: {
      return {
        ...state,
        requestProgress: false,
        requestFailed: false,
        loggedIn: false,
        name: '',
        email: ''
      }
    }
    default: return state;
  }
}

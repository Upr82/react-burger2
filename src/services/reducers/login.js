import {
  INPUT_LOGIN_EMAIL, INPUT_LOGIN_PASSWORD, LOGIN_FINAL
} from "../actions/login";


const initialState = {
  email: '',
  password: ''
}

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case INPUT_LOGIN_EMAIL: {
      return {
        ...state, email: action.email
      }
    }
    case INPUT_LOGIN_PASSWORD: {
      return {
        ...state, password: action.password
      }
    }
    case LOGIN_FINAL: {
      return {
        ...state,
        email: '',
        password: ''
      }
    }
    default: return state;
  }
}

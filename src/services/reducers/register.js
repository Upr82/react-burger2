import {
  INPUT_REG_NAME, INPUT_REG_EMAIL, INPUT_REG_PASSWORD
} from "../actions/register";

const initialState = {
  name: '',
  email: '',
  password: '',
}

export const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case INPUT_REG_NAME: {
      return {...state, name: action.name}
    }
    case INPUT_REG_EMAIL: {
      return {...state, email: action.email}
    }
    case INPUT_REG_PASSWORD: {
      return {...state, password: action.password}
    }
    default: return state;
  }
}

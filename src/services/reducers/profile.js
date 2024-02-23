import {
  EDIT_NAME, EDIT_EMAIL, EDIT_PASSWORD
} from "../actions/profile";

const initialState = {
  name: '',
  email: '',
  password: ''
}

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_NAME: {
      return {
        ...state,
        name: action.name
      }
    }
    case EDIT_EMAIL: {
      return {
        ...state,
        email: action.email
      }
    }
    case EDIT_PASSWORD: {
      return {
        ...state,
        password: action.password
      }
    }
    default: return state;
  }
}

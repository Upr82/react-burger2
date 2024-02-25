import {
  SET_PORTAL_API, SET_PORTAL_ORDER, SET_PORTAL_INGREDIENT,
  RESET_PORTAL
} from "../actions/portal";

const initialState = {
  portalType: '',
  portalVisible: false,
  text: ''
}

export const portalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PORTAL_ORDER: {
      return {
        ...state,
        portalType: 'OrderDetails',
        portalVisible: true
      };
    }
    case SET_PORTAL_INGREDIENT: {
      return {
        ...state,
        portalType: 'IngredientDetails',
        portalVisible: true
      };
    }
    case SET_PORTAL_API: {
      return {
        ...state,
        portalType: 'ApiResult',
        portalVisible: true,
        text: action.text
      }
    }
    case RESET_PORTAL: {
      return {
        ...state,
        portalType: '',
        portalVisible: false,
        text: ''
      }
    }
    default: return state;
  }
}

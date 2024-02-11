import {
  POST_ORDER_REQUEST, POST_ORDER_SUCCESS, POST_ORDER_FAILED
} from "../actions/order-actions";

const initialState = {
  name: '',
  order: {
    number: 0,
  },
  success: false,
  orderRequest: false,
  orderFailed: false
}

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true
      }
    }
    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        name: action.name,
        order: {...action.order},
        success: action.success,
        orderRequest: false,
        orderFailed: false
      }
    }
    case POST_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true
      }
    }
    default: {
      return state;
    }
  }
}

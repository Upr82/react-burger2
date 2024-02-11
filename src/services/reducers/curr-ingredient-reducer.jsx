import {
  CURR_INGREDIENT_ADD, CURR_INGREDIENT_DEL
} from '../actions/curr-ingredient-actions';

const initialState = {
  description: {}
}

export const currIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURR_INGREDIENT_ADD: {
      return {
        ...state,
        description: {...action.description}
      }
    }
    case CURR_INGREDIENT_DEL: {
      return {
        ...state,
        description: {}
      }
    }
    default: {
      return state;
    }
  }
}

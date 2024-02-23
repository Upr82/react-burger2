import {
  CONSTRUCTOR_ADD, CONSTRUCTOR_DEL, MOVING_FILLINGS
} from "../actions/constructor-actions";
import { BUN } from "../../utils/data";

const initialState = {
  content: []
}

export const constructorReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case CONSTRUCTOR_ADD: {
      if (
        actions.ingredient.type === BUN &&
        (!state.content.length || state.content[0].type !== BUN)
      ) {
        return {
          ...state,
          content: [actions.ingredient,...state.content, actions.ingredient]
        }
      }
      if (
        actions.ingredient.type === BUN &&
        (state.content.length > 1 && state.content[0].type === BUN)
      ) {
        return {
          ...state,
          content: [
            ...state.content.map((item, index) => {
              if (index === 0 || index === state.content.length - 1) {
                return actions.ingredient;
              }
              return item;
            }),
          ]
        }
      }
      if (actions.ingredient.type !== BUN && state.content.length > 1) {
        return {
          ...state,
          content: [state.content[0], actions.ingredient, ...state.content.slice(1)]
        }
      }
      return state;
    }
    case CONSTRUCTOR_DEL: {
      return {
        ...state,
        content: [
          ...state.content.filter((item, ind) =>
            ind !== actions.index
          )
        ]
      }
    }
    case MOVING_FILLINGS: {
      const cloneList = [...state.content];
      let temp = cloneList[actions.sourceIndex];
      cloneList[actions.sourceIndex] = cloneList[actions.targetIndex];
      cloneList[actions.targetIndex] = temp
      return {
        ...state,
        content: cloneList
      }
    }
    default: {
      return state;
    }
  }
};

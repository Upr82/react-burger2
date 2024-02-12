import { combineReducers } from "redux";
import { ingrediensReducer } from "./ingredients-reducer";
import { orderReducer } from "./order-reducer";
import { currIngredientReducer } from "./curr-ingredient-reducer";
import { constructorReducer } from "./constructor-reducer";


export const rootReducer = combineReducers({
  ingredients: ingrediensReducer,
  order: orderReducer,
  currIngredient: currIngredientReducer,
  currBurger: constructorReducer,
});

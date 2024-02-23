import { combineReducers } from "redux";
import { ingrediensReducer } from "./ingredients-reducer";
import { orderReducer } from "./order-reducer";
import { currIngredientReducer } from "./curr-ingredient-reducer";
import { constructorReducer } from "./constructor-reducer";
import { registerReducer } from "./register";
import { loginReducer } from "./login";
import { userReducer } from "./user";
import { profileReducer } from "./profile";
import { portalReducer } from "./portal";


export const rootReducer = combineReducers({
  ingredients: ingrediensReducer,
  order: orderReducer,
  currIngredient: currIngredientReducer,
  currBurger: constructorReducer,
  register: registerReducer,
  login: loginReducer,
  user: userReducer,
  profile: profileReducer,
  portal: portalReducer,
});

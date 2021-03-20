import { combineReducers } from "redux";
import authReducer from "./authReducer";
import itemsReducer from "./itemsReducer";
import cartReducer from "./cartReducer";

export default combineReducers({
  auth: authReducer,
  items: itemsReducer,
  cart: cartReducer,
});

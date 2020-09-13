import { combineReducers } from "redux";
import products from "./goodsReducer";
import signedIn from "./signInReducer";
import cart from "./cartCountReducer";
import searchedItem from "./searchItemReducer";
import updateItem from "./updateItemReducer";

export default combineReducers({
  products,
  signedIn,
  cart,
  searchedItem,
  updateItem,
});

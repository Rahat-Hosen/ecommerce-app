import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import userReducer from "./reducers/userReducer";
import productReducer from "./reducers/productReducer";
import tagsReducer from "./reducers/tagsReducer";
import categoryReducer from "./reducers/categoryReducer";
import inCartReducer from "./reducers/inCartReducer";
import wishListReducer from "./reducers/wishListReducer";
import userAddressReducer from "./reducers/userAddressReducer";
import alertReducer from "./reducers/alertReducer";
import thunk from "redux-thunk";

const middlewares = [thunk];
const middlewareEnhancer = applyMiddleware(...middlewares);
const enhancers = [middlewareEnhancer];
const composedEnhancers = composeWithDevTools(...enhancers);
const rootReducer = combineReducers({
  userReducer,
  productReducer,
  tagsReducer,
  categoryReducer,
  inCartReducer,
  wishListReducer,
  userAddressReducer,
  alertReducer,
});

const store = createStore(rootReducer, composedEnhancers);

export default store;

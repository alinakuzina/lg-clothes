import { combineReducers } from "redux";
import { userReducer } from "./User/UserReducer";
import { USER_ACTION_TYPES } from "./User/UserTypes";
export const rootReducer = combineReducers({
  user: userReducer,
});

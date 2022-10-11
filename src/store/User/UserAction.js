import { createAction } from "../../utilits/Reducer";
import { USER_ACTION_TYPES } from "./UserTypes";

export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

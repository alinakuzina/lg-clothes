import { recieveCategories } from "../../utilits/Farebase";
import { createAction } from "../../utilits/Reducer";
import { CATEGORIES_ACTION_TYPES } from "./CategoriesTypes";

export const recieveCategoriesHandler = (categories) =>
  createAction(CATEGORIES_ACTION_TYPES.RECIEVE_CATEGORIES_ARRAY, categories);

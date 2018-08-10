import { combineReducers } from "redux";

import articleReducer from "./reducers";



export default combineReducers({ articles:articleReducer });

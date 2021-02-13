/* eslint-disable prettier/prettier */
/* eslint-disable indent */
import { combineReducers } from "redux";
import currentSession from "./currentSession";
import feedImagesReducer from "./feedImagesReducer";

export default combineReducers({
    feedImagesReducer,
    currentSession,
});

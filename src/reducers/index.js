/* eslint-disable prettier/prettier */
/* eslint-disable indent */
import { combineReducers } from "redux";
import currentSession from "./currentSession";
import generalValues from "./generalValues";
export default combineReducers({
    currentSession,
    generalValues
});

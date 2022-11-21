import { combineReducers } from "redux";
import asyncReducer from "../async/asyncReducer";
import eventReducer from "../features/events/eventReducer";
import testReducer from "../features/sandbox/testReducer";

export const rootReducer = combineReducers({
    test: testReducer,
    event: eventReducer,
    async: asyncReducer,
});

export default rootReducer;
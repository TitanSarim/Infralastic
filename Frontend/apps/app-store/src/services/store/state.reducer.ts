import {combineReducers} from "redux";
import deviceReducer from "./reducers/device.reducer";


const rootReducers = combineReducers({
    device: deviceReducer
})

export default rootReducers;

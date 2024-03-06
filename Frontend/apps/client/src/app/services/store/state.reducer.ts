import {combineReducers} from "redux";
import userReducer from "./reducers/user.reducer";
import employeeReducer from "./reducers/employee.reducer";
import companyReducer from "./reducers/company.reducer";
import departmentReducer from "./reducers/department.reducer";
import assetReducer from "./reducers/asset.reducer";


const rootReducers = combineReducers({
    user: userReducer,
    employee: employeeReducer,
    company: companyReducer,
    department: departmentReducer,
    asset: assetReducer
})

export default rootReducers;

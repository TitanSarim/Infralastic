import {combineReducers} from "redux";
import cartReducer from "./reducers/cart.reducer";
import userReducer from "./reducers/user.reducer";
import employeeReducer from "./reducers/employee.reducer";
import companyReducer from "./reducers/company.reducer";
import departmentReducer from "./reducers/department.reducer";
import assetReducer from "./reducers/asset.reducer";
import deviceReducer from "./reducers/device.reducer";
import orderReducer from "./reducers/order.reducer";
import reportReducer from "./reducers/report.reducer";
import deviceUserReducer from "./reducers/userDevice.reducer";



const rootReducers = combineReducers({
  cart: cartReducer,
  user: userReducer,
  employee: employeeReducer,
  company: companyReducer,
  department: departmentReducer,
  asset: assetReducer,
  device: deviceReducer,
  order: orderReducer,
  report: reportReducer,
  deviceUser: deviceUserReducer
})

export default rootReducers;

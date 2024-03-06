import { createSlice } from '@reduxjs/toolkit';
import {
  CreateEmployeeActionType,
  GetAllEmployeeActionType,
  GetEmployeeActionType, GetEmployeeAssetActionType,
  GetManagerEmployeeActionType, UpdateEmployeeActionType
} from "../constants/employee";

const initialState: any = {
    loading: false,
    employeeInfo: {},
    error: null,
    success: false,
    message: null
}

const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {},
    extraReducers: {
        [CreateEmployeeActionType.CreateEmployeePending]: (state: any) => {
            state.loading = true;
            state.error = null;
        },
        [CreateEmployeeActionType.CreateEmployeeSuccess]: (state, { payload }) => {
            state.loading = false;
            state.employeeInfo = payload;
        },
        [CreateEmployeeActionType.CreateEmployeeFail]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },

        [GetEmployeeActionType.GetEmployeePending]: (state: any) => {
            state.loading = true;
            state.error = null;
        },
        [GetEmployeeActionType.GetEmployeeSuccess]: (state, { payload }) => {
            state.loading = false;
            state.employeeInfo = payload;
        },
        [GetEmployeeActionType.GetEmployeeFail]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },

        [GetAllEmployeeActionType.GetAllEmployeePending]: (state: any) => {
            state.loading = true;
            state.error = null;
        },
        [GetAllEmployeeActionType.GetAllEmployeeSuccess]: (state, { payload }) => {
            state.loading = false;
            state.employeeInfo = payload;
        },
        [GetAllEmployeeActionType.GetAllEmployeeFail]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },

        [GetManagerEmployeeActionType.GetManagerPending]: (state: any) => {
            state.loading = true;
            state.error = null;
        },
        [GetManagerEmployeeActionType.GetManagerSuccess]: (state, { payload }) => {
            state.loading = false;
            state.employeeInfo = payload;
        },
        [GetManagerEmployeeActionType.GetManagerFail]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },

        [UpdateEmployeeActionType.UpdateEmployeePending]: (state: any) => {
            state.loading = true;
            state.error = null;
        },
        [UpdateEmployeeActionType.UpdateEmployeeSuccess]: (state, { payload }) => {
            state.loading = false;
            state.employeeInfo = payload;
        },
        [UpdateEmployeeActionType.UpdateEmployeeFail]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },

        [GetEmployeeAssetActionType.GetEmployeeAssetPending]: (state: any) => {
          state.loading = true;
          state.error = null;
        },
        [GetEmployeeAssetActionType.GetEmployeeAssetSuccess]: (state, { payload }) => {
          state.loading = false;
          state.employeeInfo = payload;
        },
        [GetEmployeeAssetActionType.GetEmployeeAssetFail]: (state, { payload }) => {
          state.loading = false;
          state.error = payload;
        },
    }
})

export default employeeSlice.reducer;


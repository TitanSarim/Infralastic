import { createSlice } from '@reduxjs/toolkit';
import {
    CreateDepartmentActionType,
    GetAllDepartmentActionType,
    GetAllDepartmentEmployeeActionType, GetDepartmentByIdActionType, UpdateDepartmentActionType
} from "../constants/department";

const initialState: any = {
    loading: false,
    departmentInfo: {},
    error: null,
    success: false,
    message: null
}

const departmentSlice = createSlice({
    name: "department",
    initialState,
    reducers: {},
    extraReducers: {

        [GetAllDepartmentActionType.GetAllDepartmentPending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [GetAllDepartmentActionType.GetAllDepartmentSuccess]: (state, { payload }) => {
            state.loading = false;
            state.userInfo = payload;
        },
        [GetAllDepartmentActionType.GetAllDepartmentFail]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },

        [GetAllDepartmentEmployeeActionType.GetAllDepartmentEmployeePending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [GetAllDepartmentEmployeeActionType.GetAllDepartmentEmployeeSuccess]: (state, { payload }) => {
            state.loading = false;
            state.userInfo = payload;
        },
        [GetAllDepartmentEmployeeActionType.GetAllDepartmentEmployeeFail]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },

        [CreateDepartmentActionType.CreateDepartmentPending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [CreateDepartmentActionType.CreateDepartmentSuccess]: (state, { payload }) => {
            state.loading = false;
            state.userInfo = payload;
        },
        [CreateDepartmentActionType.CreateDepartmentFail]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },

        [UpdateDepartmentActionType.UpdateDepartmentPending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [UpdateDepartmentActionType.UpdateDepartmentSuccess]: (state, { payload }) => {
            state.loading = false;
            state.userInfo = payload;
        },
        [UpdateDepartmentActionType.UpdateDepartmentSuccess]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },

        [GetDepartmentByIdActionType.GetDepartmentPending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [GetDepartmentByIdActionType.GetDepartmentSuccess]: (state, { payload }) => {
            state.loading = false;
            state.userInfo = payload;
        },
        [GetDepartmentByIdActionType.GetDepartmentFail]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
    }
})

export default departmentSlice.reducer


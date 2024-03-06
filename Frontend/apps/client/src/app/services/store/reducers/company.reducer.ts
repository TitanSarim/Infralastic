import { createSlice } from '@reduxjs/toolkit';
import {GetAllCompanyActionType, GetCompanyActionType} from "../constants/company";

const initialState: any = {
    loading: false,
    companyInfo: {},
    error: null,
    success: false,
    message: null
}

const companySlice = createSlice({
    name: "company",
    initialState,
    reducers: {},
    extraReducers: {
        [GetCompanyActionType.GetCompanyPending]: (state: any) => {
            state.loading = true;
            state.error = null;
        },
        [GetCompanyActionType.GetCompanySuccess]: (state, { payload }) => {
            state.loading = false;
            state.userInfo = payload;
        },
        [GetCompanyActionType.GetCompanyFail]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },

        [GetAllCompanyActionType.GetAllCompanyPending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [GetAllCompanyActionType.GetAllCompanySuccess]: (state, { payload }) => {
            state.loading = false;
            state.userInfo = payload;
        },
        [GetAllCompanyActionType.GetAllCompanyFail]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
    }
})

export default companySlice.reducer


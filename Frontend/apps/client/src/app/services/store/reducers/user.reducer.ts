import { createSlice } from '@reduxjs/toolkit';
import {ChangePasswordActionType, LoginActionType, RegisterActionType, ResetActionType,CheckOtpActionType} from '../constants/user';

const initialState: any = {
    loading: false,
    userInfo: {},
    userToken: null,
    error: null,
    success: false,
    message: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: {
        [LoginActionType.UserLoginPending]: (state: any) => {
            state.loading = true;
            state.error = null;
        },
        [LoginActionType.UserLoginSuccess]: (state, { payload }) => {
            state.loading = false;
            state.userInfo = payload;
            console.log("userInfo after login redux",state.userInfo)
            state.userToken = payload?.result.token;
        },
        [LoginActionType.UserLoginFail]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [RegisterActionType.UserRegisterPending]: (state) => {
            state.loading = true;
        },
        [RegisterActionType.UserRegisterSuccess]: (state, { payload }) => {
            state.loading = false;
            state.userInfo = payload;
            state.userToken = payload?.result.token;
        },
        [RegisterActionType.UserRegisterFail]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [ResetActionType.UserResetPending]: (state) => {
            state.loading = true;
        },
        [ResetActionType.UserResetSuccess]: (state, { payload }) => {
            state.loading = false;
            state.userInfo = payload;
        },
        [ResetActionType.UserResetFail]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [ChangePasswordActionType.UserChangePasswordPending]: (state) => {
            state.loading = true;
        },
        [ChangePasswordActionType.UserChangePasswordSuccess]: (state, { payload }) => {
            state.loading = false;
            state.userInfo = payload;
        },
        [ChangePasswordActionType.UserChangePasswordFail]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [CheckOtpActionType.UserChangePasswordPending]: (state) => {
            state.loading = true;
        },
        [CheckOtpActionType.UserChangePasswordSuccess]: (state, { payload }) => {
            state.loading = false;
            state.userInfo = payload;
        },
        [CheckOtpActionType.UserChangePasswordFail]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
    }
})

export default userSlice.reducer


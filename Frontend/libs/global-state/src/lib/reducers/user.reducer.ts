import { createSlice } from '@reduxjs/toolkit';
import {
  ChangePasswordActionType,
  LoginActionType,
  RegisterActionType,
  ResetActionType,
  UpdateUserActionType,
  CheckOtpActionType
} from '../constants/user';

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
            return { ...state, loading: true };
        },
        [LoginActionType.UserLoginSuccess]: (state, { payload }) => {
            console.log({ userSliceSuccess: state, payload })
            return {
                ...state,
                loading: false,
                userInfo: payload,
                userToken: payload?.result.token,
            }
        },
        [LoginActionType.UserLoginFail]: (state, { payload }) => {
            return { ...state, loading: false, error: payload };
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
        [UpdateUserActionType.UpdateUserPending]: (state) => {
            state.loading = true;
        },
        [UpdateUserActionType.UpdateUserSuccess]: (state, { payload }) => {
            state.loading = false;
            state.userInfo = payload;
        },
        [UpdateUserActionType.CheckOtpFail]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [CheckOtpActionType.CheckOTPPending]: (state) => {
            state.loading = true;
        },
        [CheckOtpActionType.CheckOtpSuccess]: (state, { payload }) => {
            state.loading = false;
            state.userInfo = payload;
            

            console.log(payload,"Otp payload")
        },
       
    }
})

export default userSlice.reducer


import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";

export const userLogin = createAsyncThunk(
  "user/login",
  async (
    { login, password }: { login: any, password: any },
    { getState, rejectWithValue }
  ) => {
    console.log({ login, password })
    try {
      let data = {};
      const { user }: any = getState();
      await api.login({login, password}).then((res: any) => {
        console.log(res)
        data = res.data;
        if (res.data.result.status === 200) {
          localStorage.setItem("token", res.data.result.token);
        }
      });
      return data;
    } catch (error: any) {
      console.log({error})
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const userRegister = createAsyncThunk(
  "user/register",
  async (
      {name, login, password}: { name: any, login: any, password: any },
    { getState, rejectWithValue }
  ) => {
    try {
      const { user }: any = getState();
      let data = {};
      await api.signup({name, login, password}).then((res: any) => {
        data = res;
        if (res) {
          localStorage.setItem("Token", res.user.accessToken);
        }
      });
      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const userReset = createAsyncThunk(
  "user/reset",
  async (
      { login, link }: { login: any, link: any },
    { getState, rejectWithValue }
  ) => {
    try {
      const { user }: any = getState();
      let data = {};
      await api.resetPassword({login, link}).then((res: any) => {
        data = res.data.result;
      });
      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userChangePassword = createAsyncThunk(
  "user/changePassword",
  async (
      { login, new_password }: { login: any, new_password: any },
    { getState, rejectWithValue }
  ) => {
    try {
      const { user }: any = getState();
      let data = {};
      await api.changePassword({login, new_password}).then((res: any) => {
        data = res.data.result;
      });
      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const userUpdate = createAsyncThunk(
  "user/update",
  async (
      { name, user_id, login, password, phone, role_id, image_url, Oauth,Oauth_token}:
        { name: any, user_id: any, login: any, password: any, phone: any, role_id: any, image_url: any,Oauth:any,Oauth_token:any },
    { getState, rejectWithValue }
  ) => {
    try {
      const { user }: any = getState();
      let data = {};
      await api.updateAdminUser({name, user_id, login, password, phone, role_id, image_url,Oauth,Oauth_token}).then((res: any) => {
        data = res.data.result;
      });
      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const userCheckOtp = createAsyncThunk(
  "user/checkOtp",
  async (
    { user_id,security_code  }: { user_id: any,security_code: any },
    { getState, rejectWithValue }
  ) => {
    try {
      let data = {};
      const { user }: any = getState();
      await api.loginWithSecurityCode({user_id, security_code}).then((res: any) => {
        console.log(res)
        data = res.data;
       
      });
      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
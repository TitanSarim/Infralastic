import { createSlice } from '@reduxjs/toolkit';
import {ProductUserActionType} from "../constants/DeviceUser";

const initialState: any = {
  loading: false,
  deviceUser: null,
  error: null,
  success: false,
  message: null
}

const deviceUserSlice = createSlice({
  name: "deviceUser",
  initialState,
  reducers: {},
  extraReducers: {
    [ProductUserActionType.ProductUserPending]: (state: any) => {
      state.loading = true;
      state.error = null;
    },
    [ProductUserActionType.ProductUserSuccess]: (state, { payload }) => {
      
      state.loading = false;
      state.deviceUser = payload;

    },
    [ProductUserActionType.ProductUserFail]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  }
})

export default deviceUserSlice.reducer


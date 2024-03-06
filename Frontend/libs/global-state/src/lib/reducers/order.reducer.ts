import { createSlice } from '@reduxjs/toolkit';
import {GetOrderActionType} from "../constants/orderTracking";

const initialState: any = {
  loading: false,
  orderInfo: {},
  orderNo: null,
  error: null,
  success: false,
  message: null
}

const orderSlice = createSlice({
  name: "orderTracking",
  initialState,
  reducers: {},
  extraReducers: {
    [GetOrderActionType.GetOrderPending]: (state: any) => {
      state.loading = true;
      state.error = null;
    },
    [GetOrderActionType.GetOrderSuccess]: (state, { payload }) => {
      state.loading = false;
      state.orderInfo = payload;
    },
    [GetOrderActionType.GetOrderFail]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  }
})

export default orderSlice.reducer


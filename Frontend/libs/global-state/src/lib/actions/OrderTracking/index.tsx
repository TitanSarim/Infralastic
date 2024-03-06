import {createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "../../api";

export const getOrderById = createAsyncThunk(
  "device/order",
  async (
    { order_no }: { order_no: any },
    { getState, rejectWithValue }
  ) => {
    try {
      let data = {};
      const { user }: any = getState();
      await api.getOrder({order_no}).then((res: any) => {
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

import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";


export const fetchAllCategoryList = createAsyncThunk(
  "device/category",
  async (
    {formData}: {formData: any},
    { getState, rejectWithValue }
  ) => {
    try {
      let data = {};
      const { user }: any = getState();
      await api.getCategoryList({formData}).then((res: any) => {
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

export const fetchAllProductList = createAsyncThunk(
  "device/products",
  async (
    {formData}: {formData: any},
    { getState, rejectWithValue }
  ) => {
    try {
      let data = {};
      const { user }: any = getState();
      await api.getAllProducts({formData}).then((res: any) => {
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

export const fetchProductById = createAsyncThunk(
  "device/product",
  async (
    { product_id }: { product_id: any },
    { getState, rejectWithValue }
  ) => {
    try {
      let data = {};
      const { user }: any = getState();
      await api.getProductById({product_id}).then((res: any) => {
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
// Otp code function 
// export const EnableTwoFactor = createAsyncThunk(
//   "user/otpenable",
//   async (
//     { user_id }: { user_id: any },
//     { getState, rejectWithValue }
//   ) => {
//     try {
//       let data = {};
//       const { user }: any = getState();
//       await api.enableTwoFactor({user_id}).then((res: any) => {
//         console.log(res)
//         data = res.data;
//       });
//       return data;
//     } catch (error: any) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );
// Disable two factor 
// export const DisableTwoFactor = createAsyncThunk(
//   "user/otpdisable",
//   async (
//     { user_id }: { user_id: any },
//     { getState, rejectWithValue }
//   ) => {
//     try {
//       let data = {};
//       const { user }: any = getState();
//       await api.disableTwoFactor({user_id}).then((res: any) => {
//         console.log(res)
//         data = res.data;
//       });
//       return data;
//     } catch (error: any) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );
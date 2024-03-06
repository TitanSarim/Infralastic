import { createSlice } from '@reduxjs/toolkit';
import {
  AddCartActionType,
  AddWishActionType,
  CartDeleteActionType, CartRemoveActionType,
  GetCartActionType,
  GetWishActionType, WishDeleteActionType, WishRemoveActionType,GetProductActionType,CartSubQuantityActionType
} from "../constants/cart";

const initialState: any = {
  loading: false,
  cartInfo: {},
  wishInfo: {},
  ProductInfo:{},

  error: null,
  success: false,
  message: null,
}

const cartSlice = createSlice({
  name: "global",
  initialState,
  reducers: {},
  extraReducers: {
    [GetCartActionType.GetCartPending]: (state: any) => {
      state.loading = true;
      state.error = null;
    },
    [GetCartActionType.GetCartSuccess]: (state, {payload}) => {
      state.loading = false;
      state.cartInfo = payload;
      state.success = true;
      state.error = null;
      state.message = null;
    },
    [GetCartActionType.GetCartFail]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    [AddCartActionType.AddCartPending]: (state: any) => {
      state.loading = true;
      state.error = null;
    },
    [AddCartActionType.AddCartSuccess]: (state, {payload}) => {
      state.loading = false;
      state.cartInfo = payload;
      state.success = true;
      state.error = null;
      state.message = null;
    },
    [AddCartActionType.AddCartFail]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [CartSubQuantityActionType.AddCartPending]: (state: any) => {
      state.loading = true;
      state.error = null;
    },
    [CartSubQuantityActionType.AddCartSuccess]: (state, {payload}) => {
      state.loading = false;
      state.cartInfo = payload;
      state.success = true;
      state.error = null;
      state.message = null;
    },
    [CartSubQuantityActionType.AddCartFail]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    [CartDeleteActionType.CartDeletePending]: (state: any) => {
      state.loading = true;
      state.error = null;
    },
    [CartDeleteActionType.CartDeleteSuccess]: (state, {payload}) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.message = "Cart Deleted";
    },
    [CartDeleteActionType.CartDeleteFail]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    [CartRemoveActionType.CartRemovePending]: (state: any) => {
      state.loading = true;
      state.error = null;
    },
    [CartRemoveActionType.CartRemoveSuccess]: (state, {payload}) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.message = "Cart Removed";
    },
    [CartRemoveActionType.CartRemoveFail]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    [GetWishActionType.GetWishPending]: (state: any) => {
      state.loading = true;
      state.error = null;
    },
    [GetWishActionType.GetWishSuccess]: (state, {payload}) => {
      state.loading = false;
      state.wishInfo = payload;
      state.success = true;
      state.error = null;
      state.message = null;
    },
    [GetWishActionType.GetWishFail]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    [AddWishActionType.AddWishPending]: (state: any) => {
      state.loading = true;
      state.error = null;
    },
    [AddWishActionType.AddWishSuccess]: (state, {payload}) => {
      state.loading = false;
      state.wishInfo = payload;
      state.success = true;
      state.error = null;
      state.message = null;
    },
    [AddWishActionType.AddWishFail]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    [WishDeleteActionType.WishDeletePending]: (state: any) => {
      state.loading = true;
      state.error = null;
    },
    [WishDeleteActionType.WishDeleteSuccess]: (state, {payload}) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.message = "WishList Deleted";
    },
    [WishDeleteActionType.WishDeleteFail]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    [WishRemoveActionType.WishRemovePending]: (state: any) => {
      state.loading = true;
      state.error = null;
    },
    [WishRemoveActionType.WishRemoveSuccess]: (state, {payload}) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.message = "WishList Removed";
    },
    [WishRemoveActionType.WishRemoveFail]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    [GetProductActionType.GetWishPending]: (state: any) => {
      state.loading = true;
      state.error = null;
    },
    [GetProductActionType.GetWishSuccess]: (state, {payload}) => {
      state.loading = false;
      state.ProductInfo = payload;
      state.success = true;
      state.error = null;
      state.message = null;
    },
    [GetProductActionType.GetWishFail]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

  }
})

export default cartSlice.reducer

import { createSlice } from '@reduxjs/toolkit';
import {AllCategoryActionType, AllProductsActionType, ProductActionType} from "../constants/deviceStore";

const initialState: any = {
    loading: false,
    categoryInfo: {},
    deviceStoreInfo: {},
    error: null,
    success: false,
    message: null
}

const deviceSlice = createSlice({
    name: "deviceStore",
    initialState,
    reducers: {},
    extraReducers: {
        [AllCategoryActionType.AllCategoryPending]: (state: any) => {
            state.loading = true;
            state.error = null;
        },
        [AllCategoryActionType.AllCategorySuccess]: (state, { payload }) => {
            state.loading = false;
            state.categoryInfo = payload;
        },
        [AllCategoryActionType.AllCategoryFail]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },

        [AllProductsActionType.AllProductsPending]: (state: any) => {
            state.loading = true;
            state.error = null;
        },
        [AllProductsActionType.AllProductsSuccess]: (state, { payload }) => {
            state.loading = false;
            state.deviceStoreInfo = payload;
        },
        [AllProductsActionType.AllProductsFail]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },

        [ProductActionType.ProductPending]: (state: any) => {
            state.loading = true;
            state.error = null;
        },
        [ProductActionType.ProductSuccess]: (state, { payload }) => {
            state.loading = false;
            state.deviceStoreInfo = payload;
        },
        [ProductActionType.ProductFail]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
    }
})

export default deviceSlice.reducer


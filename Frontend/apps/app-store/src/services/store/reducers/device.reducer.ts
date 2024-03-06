import { createSlice } from '@reduxjs/toolkit';
import { ProductActionType } from "../constants/DeviceStore";

const initialState: any = {
    loading: false,
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


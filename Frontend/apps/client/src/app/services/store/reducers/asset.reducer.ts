import { createSlice } from '@reduxjs/toolkit';
import {AddAssetActionType} from "../constants/assetDevices";

const initialState: any = {
    loading: false,
    assetInfo: {},
    error: null,
    success: false,
    message: null
}

const companySlice = createSlice({
    name: "asset",
    initialState,
    reducers: {},
    extraReducers: {
        [AddAssetActionType.AddAssetPending]: (state: any) => {
            state.loading = true;
            state.error = null;
        },
        [AddAssetActionType.AddAssetSuccess]: (state, { payload }) => {
            state.loading = false;
            state.assetInfo = payload;
        },
        [AddAssetActionType.AddAssetFail]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
    }
})

export default companySlice.reducer


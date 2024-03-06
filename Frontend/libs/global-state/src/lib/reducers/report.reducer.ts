import { createSlice } from '@reduxjs/toolkit';
import {GetAllCompanyActionType, GetCompanyActionType} from "../constants/company";
import {
  GetAssetReportActionType,
  GetCostingReportActionType,
  GetPurchaseReportActionType,
  GetSalesReportActionType
} from "../constants/reports";

const initialState: any = {
  loading: false,
  assetInfo: {},
  purchaseInfo: {},
  error: null,
  success: false,
  message: null
}

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {},
  extraReducers: {
    [GetAssetReportActionType.GetAssetReportCompanyPending]: (state: any) => {
      state.loading = true;
      state.error = null;
    },
    [GetAssetReportActionType.GetAssetReportCompanySuccess]: (state, { payload }) => {
      state.loading = false;
      state.assetInfo = payload;
    },
    [GetAssetReportActionType.GetAssetReportCompanyFail]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    [GetPurchaseReportActionType.GetPurchaseReportCompanyPending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [GetPurchaseReportActionType.GetPurchaseReportCompanySuccess]: (state, { payload }) => {
      state.loading = false;
      state.purchaseInfo = payload;
    },
    [GetPurchaseReportActionType.GetPurchaseReportCompanyFail]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    [GetSalesReportActionType.GetSalesReportCompanyPending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [GetSalesReportActionType.GetSalesReportCompanySuccess]: (state, { payload }) => {
      state.loading = false;
      state.purchaseInfo = payload;
    },
    [GetSalesReportActionType.GetSalesReportCompanyFail]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    [GetCostingReportActionType.GetCostingReportCompanyPending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [GetCostingReportActionType.GetCostingReportCompanySuccess]: (state, { payload }) => {
      state.loading = false;
      state.purchaseInfo = payload;
    },
    [GetCostingReportActionType.GetCostingReportCompanyFail]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  }
})

export default reportSlice.reducer


import {createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "../../api";

export const fetchAssetReportByCompany = createAsyncThunk(
  "report/getAsset",
  async (
    { company_id, page_no }: {company_id: any, page_no: any},
    { getState, rejectWithValue }
  ) => {
    try {
      const { company }: any = getState();
      let data = {};
      await api.getAssetReport({company_id, page_no}).then((res: any) => {
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

export const fetchAllBudgetReport = createAsyncThunk(
  "report/getBudget",
  async (
    { config }: {config: any},
    { getState, rejectWithValue }
  ) => {
    try {
      const { company }: any = getState();
      let data = {};
      await api.getBudgetReport({config}).then((res: any) => {
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

export const fetchAllPurchaseReport = createAsyncThunk(
  "report/getPurchase",
  async (
    { company_id, date_from, date_to}: { company_id: any, date_from: any, date_to: any },
    { getState, rejectWithValue }
  ) => {
    try {
      const { company }: any = getState();
      let data = {};
      await api.getPurchaseReport({company_id, date_from, date_to}).then((res: any) => {
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
export const fetchAllCostingReport = createAsyncThunk(
  "report/getCosting",
  async (
    { page_no, date_from, date_to}: { page_no: any, date_from: any, date_to: any },
    { getState, rejectWithValue }
  ) => {
    try {
      const { company }: any = getState();
      let data = {};
      await api.getCostingReport({page_no, date_from, date_to}).then((res: any) => {
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

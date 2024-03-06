import {createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "../../api";

export const fetchCompanyEmployee = createAsyncThunk(
    "company/getEmployee",
    async (
        {company_id}: {company_id: any},
        { getState, rejectWithValue }
    ) => {
        try {
            const { company }: any = getState();
            let data = {};
            await api.getCompanyEmployee({company_id}).then((res: any) => {
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

export const fetchAllCompany = createAsyncThunk(
    "company/getAll",
    async (
        { config }: { config: any },
        { getState, rejectWithValue }
    ) => {
        try {
            const { company }: any = getState();
            let data = {};
            await api.getAllCompany({config}).then((res: any) => {
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

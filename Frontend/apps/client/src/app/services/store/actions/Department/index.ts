import {createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "../../../api";

export const fetchAllDepartment = createAsyncThunk(
    "department/get",
    async (
        { config }: { config: any },
        { getState, rejectWithValue }
    ) => {
        try {
            const { department }: any = getState();
            let data = {};
            await api.getAllDepartment({config}).then((res: any) => {
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
export const addNewDepartment = createAsyncThunk(
    "department/add",
    async (
        {department_name,manager_id,image_url}
            : { department_name: any, manager_id: any, image_url: any },
        { getState, rejectWithValue }
    ) => {
        try {
            const { department }: any = getState();
            let data = {};
            await api.createDepartment({department_name,manager_id,image_url}).then((res: any) => {
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

export const fetchDepartmentEmployees = createAsyncThunk(
    "department/get-employees",
    async (
        {department_id}: { department_id: any},
        { getState, rejectWithValue }
    ) => {
        try {
            const { department }: any = getState();
            let data = {};
            await api.getDepartmentEmployee({department_id}).then((res: any) => {
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

export const updateDepartmentById = createAsyncThunk(
    "department/update",
    async (
        {department_name,manager_id,image_url,department_id}
            : { department_name: any, manager_id: any, image_url: any, department_id: any },
        { getState, rejectWithValue }
    ) => {
        try {
            const { department }: any = getState();
            let data = {};
            await api.updateDepartment({department_name,manager_id,image_url,department_id}).then((res: any) => {
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

export const fetchDepartmentById = createAsyncThunk(
    "department/getById",
    async (
        {department_id}: { department_id: any },
        { getState, rejectWithValue }
    ) => {
        try {
            const { department }: any = getState();
            let data = {};
            await api.getDepartmentById({department_id}).then((res: any) => {
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
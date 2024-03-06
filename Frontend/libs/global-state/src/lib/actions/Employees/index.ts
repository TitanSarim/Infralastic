import {createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "../../api";

export const addEmployee = createAsyncThunk(
    "employee/create",
    async (
        {first_name, last_name, email, phone, image_url, job_title, company_id, manager_id, department_id, location_id, employee_status, user_id}:
            { first_name: any,last_name: any,email: any,phone: any,image_url: any,job_title: any, company_id: any, manager_id: any, department_id: any, location_id: any, employee_status: any, user_id: any },
        { getState, rejectWithValue }
    ) => {
        try {
            const { employee }: any = getState();
            let data = {};
            await api.createEmployee({first_name,last_name,email,phone,image_url,job_title,company_id, manager_id, department_id, location_id, employee_status,user_id}).then((res: any) => {
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
export const fetchEmployee = createAsyncThunk(
    "employee/get",
    async (
        { employee_id }: { employee_id: any},
        { getState, rejectWithValue }
    ) => {
        try {
            const { employee }: any = getState();
            let data = {};
            await api.getEmployee({employee_id}).then((res: any) => {
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
export const fetchAllEmployee = createAsyncThunk(
    "employee/getAll",
    async (
        { config }: { config: any },
        { getState, rejectWithValue }
    ) => {
        try {
            const { employee }: any = getState();
            let data = {};
            await api.getAllEmployee({config}).then((res: any) => {
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
export const fetchManager = createAsyncThunk(
    "employee/manager",
    async (
        { employee_id }: {employee_id: any},
        { getState, rejectWithValue }
    ) => {
        try {
            const { employee }: any = getState();
            let data = {};
            await api.getManager({employee_id}).then((res: any) => {
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

export const updateEmployeeById = createAsyncThunk(
    "employee/update",
    async (
        {first_name, last_name, email, phone, image_url, job_title, company_id, manager_id, department_id, location_id, employee_status, employee_id, user_id}:
            { first_name: any,last_name: any,email: any,phone: any,image_url: any,job_title: any, company_id: any, manager_id: any, department_id: any, location_id: any, employee_status: any, employee_id:any,user_id:any },
        { getState, rejectWithValue }
    ) => {
        try {
            const { employee }: any = getState();
            let data = {};
            await api.updateEmployee({first_name,last_name,email,phone,image_url,job_title,company_id, manager_id, department_id, location_id, employee_status, employee_id,user_id}).then((res: any) => {
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

export const fetchEmployeeAsset = createAsyncThunk(
  "employee/asset",
  async (
    { employee_id, page_no }: {employee_id: any, page_no: any},
    { getState, rejectWithValue }
  ) => {
    try {
      const { employee }: any = getState();
      let data = {};
      await api.getEmployeeAsset({employee_id, page_no}).then((res: any) => {
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

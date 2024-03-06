import {createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "../../../api";

export const addAsset = createAsyncThunk(
    "asset/add",
    async (
        {asset_unique_id, asset_name ,cost ,manufacturer ,device_model ,serial_number ,operating_system ,mac_address ,ip_address ,hard_drive_details ,ram ,purchase_date ,warranty_expiration_date ,warranty_info ,purchase_from ,end_of_life_date ,next_service_date ,date_added ,time_added ,site_id ,category_id ,company_id ,image_url }
            :
        {asset_unique_id: any, asset_name: any ,cost: any ,manufacturer: any ,device_model: any ,serial_number: any ,operating_system: any ,mac_address: any ,ip_address: any ,hard_drive_details: any ,ram: any ,purchase_date: any ,warranty_expiration_date: any ,warranty_info: any ,purchase_from: any ,end_of_life_date: any ,next_service_date: any ,date_added: any ,time_added: any ,site_id: any ,category_id: any ,company_id: any ,image_url: any },
        { getState, rejectWithValue }
    ) => {
        try {
            const { department }: any = getState();
            let data = {};
            await api.createAsset({asset_unique_id, asset_name ,cost ,manufacturer ,device_model ,serial_number ,operating_system ,mac_address ,ip_address ,hard_drive_details ,ram ,purchase_date ,warranty_expiration_date ,warranty_info ,purchase_from ,end_of_life_date ,next_service_date ,date_added ,time_added ,site_id ,category_id ,company_id ,image_url }).then((res: any) => {
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
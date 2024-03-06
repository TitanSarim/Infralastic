import axios from "axios";

const API = axios.create({
    headers: {
        'Access-Control-Allow-Origin': '*',
    }
});

export const login = (formData: any) =>
    API.post('/api/login_user_api', formData)

export const signup = (formData: any) =>
    API.post('/api/create_user_api', formData)

export const resetPassword = (formData: any) =>
    API.post('/api/reset_password_request', formData)

export const changePassword = (formData: any) =>
    API.post('/api/new_password_request', formData)

export const createEmployee = (formData: any) =>
    API.post('/api/create_employee_api', formData)

export const getEmployee = (formData: any) =>
    API.post('/api/get_employee_api', formData)

export const getManager = (formData: any) =>
    API.post('/api/get_manager_api', formData)

export const getCompanyEmployee = (formData: any) =>
    API.post('/api/get_company_employee', formData)

export const getAllCompany = (config: any) =>
    API.post('/api/get_company_api', config)

export const getAllEmployee = (config: any) =>
    API.post('/api/get_all_employee_api', config)

export const getAllDepartment = (config: any) =>
    API.post('/api/get_department_api', config)

export const getLocation = (config: any) =>
    API.post('/api/get_location_api', config)

export const createDepartment = (formData: any) =>
    API.post('/api/create_department_api', formData)

export const getDepartmentEmployee = (formData: any) =>
    API.post('/api/get_department_employee', formData)

export const updateEmployee = (formData: any) =>
    API.post('/api/update_employee_api', formData)

export const deleteEmployee = (formData: any) =>
    API.post('/api/delete_employee_api', formData)

export const updateDepartment = (formData: any) =>
    API.post('/api/update_department_api', formData)

export const deleteDepartment = (formData: any) =>
    API.post('/api/delete_department_api', formData)

export const getSites = (formData: any) =>
    API.post('/api/get_sites_api', formData)

export const createAsset = (formData: any) =>
    API.post('/api/create_asset_api', formData)

export const updateAsset = (formData: any) =>
    API.post('/api/update_asset_api', formData)

export const getAssetById = (formData: any) =>
    API.post('/api/get_asset_api', formData)

export const deleteAsset = (formData: any) =>
    API.post('/api/delete_asset_api', formData)

export const getAssetBySite = (formData: any) =>
    API.post('/api/get_site_asset_api', formData)

export const getAllAssets = (formData: any) =>
    API.post('/api/get_all_asset_api', formData)

export const checkOut = (formData: any) =>
    API.post('/api/assign_asset_api', formData)
export const checkIn = (formData: any) =>
    API.post('/api/assign_checkin_asset_api ', formData)

export const getUnconfirmedAssets = (formData: any) =>
    API.post('/api/get_all_unconfirmed_asset_api', formData)

export const confirmAsset = (formData: any) =>
    API.post('/api/confirm_asset_api', formData)

export const getAllCategories = (formData: any) =>
    API.post('/api/get_all_asset_categ_api', formData)

export const getDepartmentById = (formData: any) =>
    API.post('/api/get_department_api_by_ID', formData)

export const getAssetLog = (formData: any) =>
    API.post('/api/get_logs_asset_api', formData)

export const addAssetImages = (formData: any) =>
    API.post('/api/add_image_asset_api', formData)

export const getAssetImages = (formData: any) =>
    API.post('/api/get_images_asset_api', formData)

export const confirmAllAssets = (formData: any) =>
    API.post('/api/multi_confirm_asset_api', formData)

export const getEmployeeAsset = (formData: any) =>
  API.post('/api/get_employee_asset_api', formData)

  export const loginWithSecurityCode=(formData:any)=>
  API.post("/api/login_user_security_code",formData)




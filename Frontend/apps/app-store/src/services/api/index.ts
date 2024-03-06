import axios from "axios";

const API = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*',
  }
});

export const getProductList = (formData: any) =>
  API.post('/api/', formData)

  export const getAllDepartment = (config: any) =>
  API.post('/api/get_department_api', config)
import {
  addEmployee,
  fetchAllEmployee,
  fetchEmployee, fetchEmployeeAsset,
  fetchManager,
  updateEmployeeById
} from "../../actions/Employees";

export const CreateEmployeeActionType: any = {
    CreateEmployeePending: [addEmployee.pending],
    CreateEmployeeSuccess: [addEmployee.fulfilled],
    CreateEmployeeFail: [addEmployee.rejected]
}
export const GetEmployeeActionType: any = {
    GetEmployeePending: [fetchEmployee.pending],
    GetEmployeeSuccess: [fetchEmployee.fulfilled],
    GetEmployeeFail: [fetchEmployee.rejected]
}
export const GetAllEmployeeActionType: any = {
    GetAllEmployeePending: [fetchAllEmployee.pending],
    GetAllEmployeeSuccess: [fetchAllEmployee.fulfilled],
    GetAllEmployeeFail: [fetchAllEmployee.rejected]
}
export const GetManagerEmployeeActionType: any = {
    GetManagerPending: [fetchManager.pending],
    GetManagerSuccess: [fetchManager.fulfilled],
    GetManagerFail: [fetchManager.rejected]
}
export const UpdateEmployeeActionType: any = {
    UpdateEmployeePending: [updateEmployeeById.pending],
    UpdateEmployeeSuccess: [updateEmployeeById.fulfilled],
    UpdateEmployeeFail: [updateEmployeeById.rejected]
}
export const GetEmployeeAssetActionType: any = {
    GetEmployeeAssetPending: [fetchEmployeeAsset.pending],
    GetEmployeeAssetSuccess: [fetchEmployeeAsset.fulfilled],
    GetEmployeeAssetFail: [fetchEmployeeAsset.rejected]
}

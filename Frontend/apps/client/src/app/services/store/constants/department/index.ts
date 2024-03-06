import {
    fetchAllDepartment,
    fetchDepartmentEmployees,
    addNewDepartment,
    updateDepartmentById, fetchDepartmentById,
} from "../../actions/Department";

export const GetAllDepartmentActionType: any = {
    GetAllDepartmentPending: [fetchAllDepartment.pending],
    GetAllDepartmentSuccess: [fetchAllDepartment.fulfilled],
    GetAllDepartmentFail: [fetchAllDepartment.rejected]
}
export const GetAllDepartmentEmployeeActionType: any = {
    GetAllDepartmentEmployeePending: [fetchDepartmentEmployees.pending],
    GetAllDepartmentEmployeeSuccess: [fetchDepartmentEmployees.fulfilled],
    GetAllDepartmentEmployeeFail: [fetchDepartmentEmployees.rejected]
}
export const CreateDepartmentActionType: any = {
    CreateDepartmentPending: [addNewDepartment.pending],
    CreateDepartmentSuccess: [addNewDepartment.fulfilled],
    CreateDepartmentFail: [addNewDepartment.rejected]
}
export const UpdateDepartmentActionType: any = {
    UpdateDepartmentPending: [updateDepartmentById.pending],
    UpdateDepartmentSuccess: [updateDepartmentById.fulfilled],
    UpdateDepartmentFail: [updateDepartmentById.rejected]
}
export const GetDepartmentByIdActionType: any = {
    GetDepartmentPending: [fetchDepartmentById.pending],
    GetDepartmentSuccess: [fetchDepartmentById.fulfilled],
    GetDepartmentFail: [fetchDepartmentById.rejected]
}
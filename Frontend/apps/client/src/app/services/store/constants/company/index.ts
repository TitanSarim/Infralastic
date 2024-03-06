import {fetchAllCompany, fetchCompanyEmployee} from "../../actions/Company";

export const GetCompanyActionType: any = {
    GetCompanyPending: [fetchCompanyEmployee.pending],
    GetCompanySuccess: [fetchCompanyEmployee.fulfilled],
    GetCompanyFail: [fetchCompanyEmployee.rejected]
}
export const GetAllCompanyActionType: any = {
    GetAllCompanyPending: [fetchAllCompany.pending],
    GetAllCompanySuccess: [fetchAllCompany.fulfilled],
    GetAllCompanyFail: [fetchAllCompany.rejected]
}
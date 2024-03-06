import {fetchUser} from "../../actions/DeviceUser";

export const ProductUserActionType: any = {
  ProductUserPending: fetchUser.pending,
  ProductUserSuccess: fetchUser.fulfilled,
  ProductUserFail: fetchUser.rejected
}
console.log(ProductUserActionType)

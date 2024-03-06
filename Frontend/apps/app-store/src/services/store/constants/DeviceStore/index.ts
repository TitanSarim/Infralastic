import {fetchProductList} from "../../actions/DeviceStore";

export const ProductActionType: any = {
  ProductPending: [fetchProductList.pending],
  ProductSuccess: [fetchProductList.fulfilled],
  ProductFail: [fetchProductList.rejected]
}

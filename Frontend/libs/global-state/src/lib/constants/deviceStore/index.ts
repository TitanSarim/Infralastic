import {fetchAllCategoryList, fetchAllProductList, fetchProductById} from "../../actions/DeviceStore";

export const AllCategoryActionType: any = {
  AllCategoryPending: [fetchAllCategoryList.pending],
  AllCategorySuccess: [fetchAllCategoryList.fulfilled],
  AllCategoryFail: [fetchAllCategoryList.rejected]
}
export const AllProductsActionType: any = {
  AllProductsPending: [fetchAllProductList.pending],
  AllProductsSuccess: [fetchAllProductList.fulfilled],
  AllProductsFail: [fetchAllProductList.rejected]
}
export const ProductActionType: any = {
  ProductPending: [fetchProductById.pending],
  ProductSuccess: [fetchProductById.fulfilled],
  ProductFail: [fetchProductById.rejected]
}

import {getOrderById} from "../../actions/OrderTracking";

export const GetOrderActionType: any = {
  GetOrderPending: [getOrderById.pending],
  GetOrderSuccess: [getOrderById.fulfilled],
  GetOrderFail: [getOrderById.rejected]
}

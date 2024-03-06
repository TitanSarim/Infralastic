import {addAsset} from "../../actions/AssetDevices";

export const AddAssetActionType: any = {
    AddAssetPending: [addAsset.pending],
    AddAssetSuccess: [addAsset.fulfilled],
    AddAssetFail: [addAsset.rejected]
}
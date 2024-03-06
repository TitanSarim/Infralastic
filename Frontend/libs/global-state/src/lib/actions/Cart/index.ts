import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";


export const getCartListById = createAsyncThunk(
  "cart/get",
  async (
    {cartlist_no}: { cartlist_no: any},
    { getState, rejectWithValue }
  ) => {
    try {
      const { cart }: any = getState();
      let data = {};
      await api.getCartList({cartlist_no}).then((res: any) => {
        data = res.data.result;
      });
      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const addToCartList = createAsyncThunk(
  "cart/add",
  async (
    {cartlist_no,user_id, product_ids}
      : { cartlist_no: any,user_id:any, product_ids: any},
    { getState, rejectWithValue }
  ) => {
    try {
      const { cart }: any = getState();
      let data = {};
      await api.addCartList({cartlist_no,user_id, product_ids}).then((res: any) => {
        data = res.data.result;
        console.log(data,"data")
      });
      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const cartDelete = createAsyncThunk(
  "cart/delete",
  async (
    { cartlist_no, product_id }
      : { cartlist_no: any, product_id: any},
    { getState, rejectWithValue }
  ) => {
    try {
      const { cart }: any = getState();
      let data: any = {};
      await api.deleteCartList({cartlist_no, product_id}).then((res: any) => {
        data = res.data.result;
      });
      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const cartSubQuantity = createAsyncThunk(
  "cart/subQuantity",
  async (
    { cartlist_no, product_ids }
      : { cartlist_no: any, product_ids: any},
    { getState, rejectWithValue }
  ) => {
    try {
      const { cart }: any = getState();
      let data: any = {};
      await api.SubCartQuantity({cartlist_no, product_ids}).then((res: any) => {
        data = res.data.result;
      });
      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const cartRemove = createAsyncThunk(
  "cart/remove",
  async (
    { cartlist_no, product_id }
      : { cartlist_no: any, product_id: any},
    { getState, rejectWithValue }
  ) => {
    try {
      const { cart }: any = getState();
      let data: any = {};
      await api.removeCartProduct({cartlist_no, product_id}).then((res: any) => {
        data = res.data.result;
      });
      console.log("redux cart ",data)
      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const cartRemoveFull = createAsyncThunk(
  "cart/removeAll",
  async (
    { cartlist_no }
      : { cartlist_no: any},
    { getState, rejectWithValue }
  ) => {
    try {
      const { cart }: any = getState();
      let data: any = {};
      await api.removeCartProduct({cartlist_no}).then((res: any) => {
        data = res.data.result;
      });
      console.log("redux cart ",data)
      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const getWishListById = createAsyncThunk(
  "wish/get",
  async (
    { wishlist_no }: { wishlist_no: any},
    { getState, rejectWithValue }
  ) => {
    try {
      const { cart }: any = getState();
      let data = {};
      await api.getWishList({wishlist_no}).then((res: any) => {
        data = res.data.result;
      });
      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const addToWishList = createAsyncThunk(
  "wish/add",
  async (
    {wishlist_no, product_id, user_id}
      : { wishlist_no: any, product_id: any, user_id: any},
    { getState, rejectWithValue }
  ) => {
    try {
      const { cart }: any = getState();
      let data = {};
      await api.addWishList({wishlist_no, product_id, user_id}).then((res: any) => {
        data = res.data.result;
      });
      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const wishDelete = createAsyncThunk(
  "wish/delete",
  async (
    {wishlist_no, product_id}
      : { wishlist_no: any, product_id: any},
    { getState, rejectWithValue }
  ) => {
    try {
      const { cart }: any = getState();
      let data: any = {};
      await api.deleteWishList({wishlist_no, product_id}).then((res: any) => {
        data = res.data.result;
      });
      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const wishRemove = createAsyncThunk(
  "wish/remove",
  async (
    {wishlist_no, product_id}
      : { wishlist_no: any, product_id: any},
    { getState, rejectWithValue }
  ) => {
    try {
      const { cart }: any = getState();
      let data: any = {};
      await api.removeWishlistProduct({wishlist_no, product_id}).then((res: any) => {
        data = res.data.result;
      });
      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const addToProductCatalogue = createAsyncThunk(
  "ProductCatalogue/add",
  async (
    // {"productcatalogue_no":productcatalogue_no,"productcatalogue_number":productcatalogue_number,"product_id":product_id,"user_id":user_id}

    {productcatalogue_name,productcatalogue_no, product_ids, user_id,productcatalogue_number}
      : { productcatalogue_name:any,productcatalogue_no: any, product_ids: any, user_id: any,productcatalogue_number:any},
    { getState, rejectWithValue }
  ) => {
    try {
      const { cart }: any = getState();
      let data = {};
      await api.addProductCatalogue({productcatalogue_name,productcatalogue_no, product_ids, user_id,productcatalogue_number}).then((res: any) => {
        data = res.data.result;
      });
      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
// getProductCatalogue
export const getProductListById = createAsyncThunk(
  "ProductCatalogue/get",
  async (
    { productcatalogue_no }: { productcatalogue_no: any},
    { getState, rejectWithValue }
  ) => {
    try {
      const { cart }: any = getState();
      let data = {};
      await api.getProductCatalogue ({productcatalogue_no}).then((res: any) => {
        data = res.data.result;
      });
      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
// removeProductCataloguebyId
export const RemoveProductCataloguebyId = createAsyncThunk(
  "ProductCatalogue/get",
  async (
    { productcatalogue_no,product_id }: { productcatalogue_no: any,product_id:any},
    { getState, rejectWithValue }
  ) => {
    try {
      const { cart }: any = getState();
      let data = {};
      await api.removeProductCataloguebyId({productcatalogue_no,product_id}).then((res: any) => {
        data = res.data.result;
      });
      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const fetchAllProductsData = createAsyncThunk(
  "ProductCatalogue/get",
  async (
    { config }: {config: any},
    { getState, rejectWithValue }
  ) => {
    try {
      const { cart }: any = getState();
      let data = {};
      await api.GetAllProducts({config}).then((res: any) => {
        data = res.data.result;
      });
      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
)

//Empty cart 
export const EmptyCart = createAsyncThunk(
  "Cart/empty",
  async (
    {cartlist_no}
      : { cartlist_no: any},
    { getState, rejectWithValue }
  ) => {
    try {
      const { cart }: any = getState();
      let data: any = {};
      await api.emptyCart({cartlist_no}).then((res: any) => {
        data = res.data.result;
      });
      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
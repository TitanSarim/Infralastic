import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk(
  "deviceUser/user",
  async (
    { user_id }: { user_id: any },
    { rejectWithValue }
  ) => {
    try {
      const response: any = user_id;
      // console.log("device user slice",user_id)
      return response;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
       
      }
    }
  }
);

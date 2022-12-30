import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get("http://localhost:5000/users");
  return response.data;
});

const initialState = {
  users:  () => fetchUsers(),
  loading: false,
  error: null,
};

export const userListSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    [fetchUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.loading = false;
      state.error = null;
    },
    [fetchUsers.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

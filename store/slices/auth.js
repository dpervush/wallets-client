import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import $api from "../../http";

export const login = createAsyncThunk("/login", async (body) => {
  // const { email, password } = body;
  return await $api.post("/auth/login", body).then((res) => res.data);
});

export const registration = createAsyncThunk("/register", async (body) => {
  // const { email, password } = body;
  return await $api.post("/auth/register", body).then((res) => res.data);
});

export const logout = createAsyncThunk("/logout", async () => {
  // const { email, password } = body;
  return await $api.post("/auth/logout").then((res) => res.data);
});

export const getMe = createAsyncThunk("/me", async () => {
  return await $api.get("/auth/me").then((res) => res.data);
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    token: null,
    user: {},
    error: null,
  },
  reducers: {},
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.isAuth = true;
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.accessToken);
    },
    [login.rejected]: (state, action) => {
      state.error = action.error;
    },
    [registration.fulfilled]: (state, action) => {
      state.isAuth = true;
      state.token = action.payload.accessToken;
      localStorage.setItem("token", action.payload.accessToken);
    },
    [registration.rejected]: (state, action) => {
      state.error = action.error;
    },
    [logout.fulfilled]: (state, action) => {
      state.isAuth = false;
      localStorage.removeItem("token");
      state.token = null;
    },
    [logout.rejected]: (state, action) => {
      console.log(action);
      state.error = action.error;
    },
    [getMe.fulfilled]: (state, action) => {
      console.log(action);
      state.isAuth = true;
      // state.token = action.payload.accessToken;
      state.user = action.payload.user;
    },
    [getMe.rejected]: (state, action) => {
      state.error = action.error;
    },
  },
});

export const authReducer = authSlice.reducer;

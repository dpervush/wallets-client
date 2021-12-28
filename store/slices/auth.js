import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import $api from "../../http";
import { setWithExpiry } from "../../utils/localStorageWithExpiry";

export const login = createAsyncThunk("/login", async (body) => {
  return await $api
    .post("/auth/login", body)
    .then((res) => {
      setWithExpiry(
        "access_token",
        res.data.accessToken,
        5 * 24 * 60 * 60 * 1000
      );

      return res.data;
    })
    .catch((error) => console.log(error));
});

export const registration = createAsyncThunk("/register", async (body) => {
  return await $api.post("/auth/register", body).then((res) => {
    setWithExpiry(
      "access_token",
      res.data.accessToken,
      5 * 24 * 60 * 60 * 1000
    );

    return res.data;
  });
});

export const logout = createAsyncThunk("/logout", async () => {
  return await $api.post("/auth/logout").then((res) => {
    localStorage.removeItem("access_token");
    return res.data;
  });
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
    error: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.isAuth = true;
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.error = "Couldn't find your account";
    },
    [registration.fulfilled]: (state, action) => {
      state.isAuth = true;
      state.token = action.payload.accessToken;
    },
    [registration.rejected]: (state, action) => {
      state.error = "That username is taken. Try another.";
    },
    [logout.fulfilled]: (state, action) => {
      state.isAuth = false;
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
    }
  }
});

export const { clearError } = authSlice.actions;

export const authReducer = authSlice.reducer;

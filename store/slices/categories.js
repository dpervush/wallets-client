import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import $api from "../../http";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (dispatch, getState) => {
    return await $api.get("/categories/").then((res) =>
      res.data.map((item) => ({
        id: item.id,
        ...item.category_info,
      }))
    );
  }
);

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (body, { dispatch }) => {
    await $api.post(`/categories/`, body).then((res) => res.data);
    dispatch(getCategories());
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (body, { dispatch }) => {
    await $api.put(`/categories/`, body).then((res) => res.data);
    dispatch(getCategories());
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId, { dispatch }) => {
    await $api.delete(`/categories/${categoryId}`).then((res) => res.data);
    dispatch(getCategories());
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
  },
  reducers: {},
  extraReducers: {
    [getCategories.fulfilled]: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const categoriesReducer = categoriesSlice.reducer;

export const selectCategoryById = (state, categoryId) =>
  state.categories.find((category) => category.id === categoryId);

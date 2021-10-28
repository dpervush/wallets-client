import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import $api from "../../http";

export const getTransactions = createAsyncThunk(
  "transactions/getTransactions",
  async (dispatch, getState) => {
    return await $api.get("/transactions/").then((res) =>
      res.data.map((item) => ({
        id: item.id,
        ...item.transaction_info,
        card: {
          id: item.account_card.id,
          ...item.account_card.card_info,
        },
        category: {
          id: item.account_category.id,
          ...item.account_category.category_info,
        },
      }))
    );
  }
);

export const createTransaction = createAsyncThunk(
  "transactions/createTransaction",
  async (body, { dispatch }) => {
    console.log(body);
    await $api.post(`/transactions/`, body).then((res) => res.data);
    dispatch(getTransactions());
  }
);

export const updateTransaction = createAsyncThunk(
  "transactions/updateTransaction",
  async (body, { dispatch }) => {
    await $api.put(`/transactions/`, body).then((res) => res.data);
    dispatch(getTransactions());
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (transactionId, { dispatch }) => {
    await $api.delete(`/transactions/${transactionId}`).then((res) => res.data);
    dispatch(getTransactions());
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    transactions: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTransactions.fulfilled, (state, action) => {
      state.transactions = action.payload;
    });
  },
});

export const transactionsReducer = transactionsSlice.reducer;

export const selectTransactionById = (state, transactionId) =>
  state.categories.find((transaction) => transaction.id === transactionId);

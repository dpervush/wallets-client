import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import $api from "../../http";
import { TRANSACTIONS_PER_PAGE } from "../../utils/constants";
import { clearError } from "./auth";
import { getCards } from "./cards";
import { getStatsByCategory } from "./stats";

export const getTransactions = createAsyncThunk(
  "transactions/getTransactions",
  async (body, { dispatch, getState }) => {
    const bodyToSend = body || { page: 1, size: TRANSACTIONS_PER_PAGE };

    return await $api
      .get("/transactions/", {
        params: { ...bodyToSend }
      })
      .then((res) => {
        return {
          count: res.data.count,
          items: [
            ...res.data.rows.map((item) => ({
              id: item.id,
              ...item.transaction_info,
              card: {
                id: item.account_card.id,
                ...item.account_card.card_info
              },
              category: {
                id: item.account_category.id,
                ...item.account_category.category_info
              }
            }))
          ]
        };
      });
  }
);

export const getRecentTransactions = createAsyncThunk(
  "transactions/getRecentTransactions",
  async () => {
    return await $api.get("/transactions/recent").then((res) =>
      res.data.map((item) => ({
        id: item.id,
        ...item.transaction_info,
        card: {
          id: item.account_card.id,
          ...item.account_card.card_info
        },
        category: {
          id: item.account_category.id,
          ...item.account_category.category_info
        }
      }))
    );
  }
);

export const createTransaction = createAsyncThunk(
  "transactions/createTransaction",
  async (body, { dispatch }) => {
    await $api.post(`/transactions/`, body).then((res) => res.data);
    dispatch(getTransactions());
    dispatch(getCards());
    dispatch(getStatsByCategory());
  }
);

export const updateTransaction = createAsyncThunk(
  "transactions/updateTransaction",
  async (body, { dispatch }) => {
    await $api.put(`/transactions/`, body).then((res) => res.data);
    dispatch(getTransactions());
    dispatch(getCards());
    dispatch(getStatsByCategory());
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (transactionId, { dispatch }) => {
    await $api.delete(`/transactions/${transactionId}`).then((res) => res.data);
    dispatch(getTransactions());
    dispatch(getCards());
    dispatch(getStatsByCategory());
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    transactions: [],
    recentTransactions: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
      })
      .addCase(getRecentTransactions.fulfilled, (state, action) => {
        state.recentTransactions = action.payload;
      })
      .addCase(clearError, (state, action) => {
        state.error = null;
      })
      .addMatcher(
        (action) =>
          action.type.startsWith("transactions") &&
          action.type.endsWith("/pending"),
        (state, action) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("transactions") &&
          action.type.endsWith("/rejected"),
        (state, action) => {
          state.error = action.error;
          state.loading = false;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("transactions") &&
          action.type.endsWith("/fulfilled"),
        (state, action) => {
          state.loading = false;
        }
      );
  }
});

export const transactionsReducer = transactionsSlice.reducer;

export const selectTransactionById = (state, transactionId) =>
  state.categories.find((transaction) => transaction.id === transactionId);

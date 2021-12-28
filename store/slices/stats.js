import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import $api from "../../http";
import { clearError } from "./auth";

export const getStatsByPeriod = createAsyncThunk(
  "stats/getStatsByPeriod",
  async ({ period }) => {
    return await $api
      .get("/stats/", { params: { period } })
      .then((res) => res.data);
  }
);
export const getStatsByCategory = createAsyncThunk(
  "stats/getStatsByCategory",
  async () => {
    return await $api.get("/stats/categories").then((res) => {
      const categoriesIncome = res.data.filter(
        (item) => item.type === "income"
      );

      const categoriesExpense = res.data.filter(
        (item) => item.type === "expense"
      );

      return { categoriesIncome, categoriesExpense };
    });
  }
);
export const getStatsByCard = createAsyncThunk(
  "stats/getStatsByCard",
  async () => {
    return await $api.get("/stats/cards").then((res) => res.data);
  }
);

const statsSlice = createSlice({
  name: "stats",
  initialState: {
    statsByPeriod: [],
    statsByCategoryIncome: [],
    statsByCategoryExpense: [],
    statsByCard: [],
    error: null,
    cardStatLoading: false,
    categoryStatLoading: false,
    periodStatLoading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStatsByPeriod.fulfilled, (state, action) => {
        state.statsByPeriod = action.payload;
        state.periodStatLoading = false;
      })
      .addCase(getStatsByCategory.fulfilled, (state, action) => {
        state.statsByCategoryIncome = action.payload.categoriesIncome;
        state.statsByCategoryExpense = action.payload.categoriesExpense;
        state.categoryStatLoading = false;
      })
      .addCase(getStatsByCard.fulfilled, (state, action) => {
        state.statsByCard = action.payload;
        state.cardStatLoading = false;
      })
      .addCase(getStatsByPeriod.pending, (state, action) => {
        state.periodStatLoading = true;
      })
      .addCase(getStatsByCategory.pending, (state, action) => {
        state.categoryStatLoading = true;
      })
      .addCase(getStatsByCard.pending, (state, action) => {
        state.cardStatLoading = true;
      })
      .addCase(getStatsByPeriod.rejected, (state, action) => {
        state.periodStatLoading = false;
      })
      .addCase(getStatsByCategory.rejected, (state, action) => {
        state.categoryStatLoading = false;
      })
      .addCase(getStatsByCard.rejected, (state, action) => {
        state.cardStatLoading = false;
      })
      .addCase(clearError, (state, action) => {
        state.error = null;
      })
      .addMatcher(
        (action) =>
          action.type.startsWith("/stats") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.error = action.error;
        }
      );
  }
});

export const statsReducer = statsSlice.reducer;

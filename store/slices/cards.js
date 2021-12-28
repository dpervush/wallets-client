import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import $api from "../../http";
import { getStatsByCard } from "./stats";
import { clearError } from "./auth";

export const getCards = createAsyncThunk("cards/getCards", async () => {
  return await $api.get("/cards/").then((res) =>
    res.data.map((item) => ({
      ...item.card_info,
      id: item.id
    }))
  );
});

export const createCard = createAsyncThunk(
  "cards/createCard",
  async (body, { dispatch }) => {
    await $api.post(`/cards/`, body).then((res) => res.data);
    dispatch(getCards());
  }
);

export const updateCard = createAsyncThunk(
  "cards/updateCard",
  async (body, { dispatch }) => {
    await $api
      .put(`/cards/`, body)
      .then((res) => res.data)
      .then(() => dispatch(getCards()))
      .then(() => dispatch(getStatsByCard()));
  }
);

export const deleteCard = createAsyncThunk(
  "cards/deleteCard",
  async (cardId, { dispatch }) => {
    await $api.delete(`/cards/${cardId}`).then((res) => res.data);
    dispatch(getCards());
  }
);

const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    cards: [],
    error: null,
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCards.fulfilled, (state, action) => {
        state.cards = action.payload;
      })
      .addCase(clearError, (state, action) => {
        state.error = null;
      })
      .addMatcher(
        (action) =>
          action.type.startsWith("cards") && action.type.endsWith("/pending"),
        (state, action) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("cards") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.error = action.error;
          state.loading = false;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("cards") && action.type.endsWith("/fulfilled"),
        (state, action) => {
          state.loading = false;
        }
      );
  }
});

export const cardsReducer = cardsSlice.reducer;

export const selectCardById = (state, cardId) =>
  state.cards.find((card) => card.id === cardId);

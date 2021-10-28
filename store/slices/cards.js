import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import $api from "../../http";

export const getCards = createAsyncThunk(
  "cards/getCards",
  async (dispatch, getState) => {
    return await $api.get("/cards/").then((res) =>
      res.data.map((item) => ({
        id: item.id,
        ...item.card_info,
      }))
    );
  }
);

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
    console.log(body);
    await $api.put(`/cards/`, body).then((res) => res.data);
    dispatch(getCards());
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
  },
  reducers: {},
  extraReducers: {
    [getCards.fulfilled]: (state, action) => {
      state.cards = action.payload;
    },
    [createCard.rejected]: (state, action) => {
      state.error = action.error;
    },
  },
});

export const cardsReducer = cardsSlice.reducer;

export const selectCardById = (state, cardId) =>
  state.cards.find((card) => card.id === cardId);

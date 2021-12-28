import { configureStore } from "@reduxjs/toolkit";
import { transactionsReducer } from "./slices/transactions";
import { categoriesReducer } from "./slices/categories";
import { cardsReducer } from "./slices/cards";
import { authReducer } from "./slices/auth";
import { statsReducer } from "./slices/stats";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionsReducer,
    categories: categoriesReducer,
    cards: cardsReducer,
    stats: statsReducer
  }
});

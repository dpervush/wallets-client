import { configureStore } from "@reduxjs/toolkit";
import { transactionsReducer } from "./slices/transactions";
import { newTransactionReducer } from "./slices/newTransactionSlice";
import { categoriesReducer } from "./slices/categories";
import { cardsReducer } from "./slices/cards";
import { authReducer } from "./slices/auth";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    newTransactionForm: newTransactionReducer,
    transactions: transactionsReducer,
    categories: categoriesReducer,
    cards: cardsReducer,
  },
});

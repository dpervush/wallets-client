import { createSlice } from "@reduxjs/toolkit";

const newTransactionSlice = createSlice({
  name: "newTransaction",
  initialState: {
    from: "",
    to: "",
    amount: 0,
    note: "",
    tags: [],
  },
  reducers: {
    selectSourse: (state, action) => {
      state.from = action.payload;
    },
    selectTarget: (state, action) => {
      state.to = action.payload;
    },
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
    writeNote: (state, action) => {
      state.note = action.payload;
    },
    setTags: (state, action) => {
      state.tags = action.payload;
    },
    setTransaction: (state, action) => {
      console.log(action.payload);
      state.from = action.payload.from;
      state.to = action.payload.to;
      state.amount = action.payload.amount;
      state.note = action.payload.comment || "";
      state.tags = action.payload.tags || [];
    },
  },
});

export const newTransactionReducer = newTransactionSlice.reducer;

export const {
  selectSourse,
  selectTarget,
  setAmount,
  writeNote,
  setTags,
  setTransaction,
} = newTransactionSlice.actions;

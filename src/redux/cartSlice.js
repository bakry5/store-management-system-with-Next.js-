import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemExists = state.items.find((item) => item._id === action.payload._id);
      if (itemExists) {
        itemExists.qty++;
      } else {
        state.items.push({ ...action.payload, qty: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find((item) => item._id === action.payload);
      item.qty++;
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find((item) => item._id === action.payload);
      if (item.qty === 1) {
        state.items = state.items.filter((i) => i._id !== action.payload);
      } else {
        item.qty--;
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
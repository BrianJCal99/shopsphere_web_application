import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // { id, name, price, quantity }
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const { id, name, price, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.price += price * quantity;
      } else {
        state.items.push({ id, name, price: price * quantity, quantity });
      }

      state.totalQuantity += quantity;
      state.totalPrice += price * quantity;
    },
    removeItem(state, action) {
      const id = action.payload;
      const item = state.items.find(item => item.id === id);

      if (item) {
        state.totalQuantity -= item.quantity;
        state.totalPrice -= item.price;
        state.items = state.items.filter(item => item.id !== id);
      }
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);

      if (item) {
        state.totalQuantity += quantity - item.quantity;
        state.totalPrice += item.price / item.quantity * (quantity - item.quantity);
        item.quantity = quantity;
        item.price = item.price / item.quantity * quantity;
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

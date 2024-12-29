import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // { id, name, price (unit price), quantity }
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const { id, name, price, quantity, image, color, size } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.price = existingItem.unitPrice * existingItem.quantity; // Update total price based on quantity
      } else {
        // Store the unit price separately and calculate total price
        state.items.push({
          id,
          name,
          unitPrice: price, // Store unit price separately
          price: price * quantity, // Total price for the item (unit price * quantity)
          quantity,
          image,
          color,
          size
        });
      }

      state.totalQuantity += quantity;
      state.totalPrice += price * quantity;
    },
    removeItem(state, action) {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        state.totalQuantity -= item.quantity;
        state.totalPrice -= item.price;
        state.items = state.items.filter((item) => item.id !== id);
      }
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item && quantity >= 1) { // Ensure quantity is at least 1
        const quantityChange = quantity - item.quantity;

        state.totalQuantity += quantityChange;
        state.totalPrice += (item.unitPrice * quantityChange); // Update total price based on the unit price
        item.quantity = quantity;
        item.price = item.unitPrice * quantity; // Recalculate total price for this item
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

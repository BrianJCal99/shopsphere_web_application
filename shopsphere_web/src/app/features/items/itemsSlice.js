import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "@/lib/supabase";

// Initial state
const initialState = {
  items: [], // Stores the fetched items
  status: "idle", // Status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null, // Stores any error messages
};

// Async thunk to fetch items from Supabase
export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
  const { data, error } = await supabase.from("items").select("*");

  if (error) {
    throw error; // Throw an error to be handled in rejected case
  }

  return data; // Return fetched items
});

// Slice definition
const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle pending state
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
      })
      // Handle fulfilled state
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // Store the fetched items in state
      })
      // Handle rejected state
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; // Store the error message
      });
  },
});

export default itemsSlice.reducer;

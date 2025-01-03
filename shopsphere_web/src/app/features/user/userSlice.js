import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "@/lib/supabase";

// Initial state
const initialState = {
  user: null, // Store user info
  status: "idle", // Status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null, // Error messages
};

// Async Thunk for signing up a user
export const signUpUser = createAsyncThunk(
  "user/signUpUser",
  async (userData, { rejectWithValue }) => {
    const { email, password, firstName, lastName } = userData;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
            firstName: firstName,
            lastName: lastName
        }
      }
    });

    if (error) {
      return rejectWithValue(error.message);
    }

    // Optionally save additional user info to a database table
    /* if (data.user) {
      const { error: dbError } = await supabase
        .from("profiles")
        .insert({
          id: data.user.id,
          email,
          first_name: firstName,
          last_name: lastName,
        });

      if (dbError) {
        return rejectWithValue(dbError.message);
      }
    } */

    return data.user;
  }
);

// Async Thunk for signing in a user
export const signInUser = createAsyncThunk(
  "user/signInUser",
  async (userData, { rejectWithValue }) => {
    const { email, password } = userData;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return rejectWithValue(error.message);
    }

    return data.user; // Return user info if successful
  }
);

// Async Thunk for signing out the user
export const signOutUser = createAsyncThunk(
  "user/signOutUser",
  async (_, { rejectWithValue }) => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return rejectWithValue(error.message);
    }

    return null; // Successfully logged out
  }
);

// Async Thunk to fetch the current user session
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      return rejectWithValue(error.message);
    }
    
    return data.user; // Return user info if a session exists
  }
);

// Create the user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetError(state) {
      state.error = null; // Reset error state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(signInUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(signOutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null; // Clear the user info on successful sign-out
        state.error = null;
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload; // Set the user state if a session exists
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Set an error if fetching fails
      });
  },
});

export const { resetError } = userSlice.actions;
export default userSlice.reducer;

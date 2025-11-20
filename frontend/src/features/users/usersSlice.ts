// src/features/users/slice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { UsersState, User } from "./types";
import * as api from "./usersAPI";

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

// --- Thunks ---
export const fetchUsersThunk = createAsyncThunk("users/fetchAll", async () => {
  return await api.getUsers();
});


export const editUserThunk = createAsyncThunk(
  "users/edit",
  async ({ id, data }: { id: number; data: Partial<User> }) => {
    return await api.updateUser(id, data);
  }
);

export const removeUserThunk = createAsyncThunk("users/remove", async (id: number) => {
  return await api.deleteUser(id);
});

// --- Slice ---
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch
    builder.addCase(fetchUsersThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUsersThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsersThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "خطا در دریافت کاربران";
    });

  
    // Edit
    builder.addCase(editUserThunk.fulfilled, (state, action) => {
      const index = state.users.findIndex((u) => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    });

    // Remove
    builder.addCase(removeUserThunk.fulfilled, (state, action) => {
      state.users = state.users.filter((u) => u.id !== action.payload);
    });
  },
});

export default usersSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type {
  Contractor,
  ContractorState,
  CreateContractorRequest,
  UpdateContractorRequest,
} from './types';
import * as contractorAPI from './contractorAPI';

const initialState: ContractorState = {
  contractors: [],
  loading: false,
  error: null,
};

// Thunks
export const fetchContractorsThunk = createAsyncThunk<Contractor[], void, { rejectValue: string }>(
  'contractors/fetchAll',
  async (_, thunkAPI) => {
    try {
      return await contractorAPI.fetchContractors();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const createContractorThunk = createAsyncThunk<Contractor, CreateContractorRequest, { rejectValue: string }>(
  'contractors/create',
  async (data, thunkAPI) => {
    try {
      return await contractorAPI.createContractor(data);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const updateContractorThunk = createAsyncThunk<Contractor, { id: number; data: UpdateContractorRequest }, { rejectValue: string }>(
  'contractors/update',
  async ({ id, data }, thunkAPI) => {
    try {
      return await contractorAPI.updateContractor(id, data);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteContractorThunk = createAsyncThunk<number, number, { rejectValue: string }>(
  'contractors/delete',
  async (id, thunkAPI) => {
    try {
      await contractorAPI.deleteContractor(id);
      return id;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Slice
const contractorSlice = createSlice({
  name: 'contractors',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchContractorsThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContractorsThunk.fulfilled, (state, action) => {
        state.contractors = action.payload;
        state.loading = false;
      })
      .addCase(fetchContractorsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'خطا در دریافت پیمانکارها';
      })

      .addCase(createContractorThunk.fulfilled, (state, action) => {
        state.contractors.push(action.payload);
      })
      .addCase(updateContractorThunk.fulfilled, (state, action) => {
        const index = state.contractors.findIndex(c => c.id === action.payload.id);
        if (index !== -1) state.contractors[index] = action.payload;
      })
      .addCase(deleteContractorThunk.fulfilled, (state, action) => {
        state.contractors = state.contractors.filter(c => c.id !== action.payload);
      });
  },
});

export default contractorSlice.reducer;
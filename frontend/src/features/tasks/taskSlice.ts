import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type {
  Task,
  TaskState,
  CreateTaskRequest,
  UpdateTaskRequest,
} from './types';
import * as taskAPI from './tasksAPI';

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

// Thunks
export const fetchTasksThunk = createAsyncThunk<Task[], void, { rejectValue: string }>(
  'tasks/fetchAll',
  async (_, thunkAPI) => {
    try {
      return await taskAPI.fetchTasks();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const createTaskThunk = createAsyncThunk<Task, CreateTaskRequest, { rejectValue: string }>(
  'tasks/create',
  async (data, thunkAPI) => {
    try {
      return await taskAPI.createTask(data);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const updateTaskThunk = createAsyncThunk<Task, { id: number; data: UpdateTaskRequest }, { rejectValue: string }>(
  'tasks/update',
  async ({ id, data }, thunkAPI) => {
    try {
      return await taskAPI.updateTask(id, data);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteTaskThunk = createAsyncThunk<number, number, { rejectValue: string }>(
  'tasks/delete',
  async (id, thunkAPI) => {
    try {
      await taskAPI.deleteTask(id);
      return id;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Slice
const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTasksThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasksThunk.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasksThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? ' Failed to fetch tasks';
      })

      .addCase(createTaskThunk.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTaskThunk.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(t => t.id === action.payload.id);
        if (index !== -1) state.tasks[index] = action.payload;
      })
      .addCase(deleteTaskThunk.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(t => t.id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
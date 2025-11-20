import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Project, CreateProjectRequest, UpdateProjectRequest,ProjectState } from '../projects/types';
import * as projectAPI from '../projects/projectsAPI'




const initialState: ProjectState = {
  projects: [],
  loading: false,
  error: null,
};

// Thunks
export const fetchProjectsThunk = createAsyncThunk<Project[], void, { rejectValue: string }>(
  'projects/fetchAll',
  async (_, thunkAPI) => {
    try {
       const projects=await projectAPI.getProjects();
      
       return projects

      
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const createProjectThunk = createAsyncThunk<Project, CreateProjectRequest, { rejectValue: string }>(
  'projects/create',
  async (data, thunkAPI) => {
    try {
      return await projectAPI.createProject(data);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const updateProjectThunk = createAsyncThunk<Project, { id: number; data: UpdateProjectRequest }, { rejectValue: string }>(
  'projects/update',
  async ({ id, data }, thunkAPI) => {
    try {
      return await projectAPI.updateProject(id, data);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteProjectThunk = createAsyncThunk<number, number, { rejectValue: string }>(
  'projects/delete',
  async (id, thunkAPI) => {
    try {
      await projectAPI.deleteProject(id);
      return id;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchProjectsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectsThunk.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.loading = false;
      })
      .addCase(fetchProjectsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to fetch projects';
      })

      // create
      .addCase(createProjectThunk.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })

      // update
      .addCase(updateProjectThunk.fulfilled, (state, action) => {
        const index = state.projects.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      })

      // delete
      .addCase(deleteProjectThunk.fulfilled, (state, action) => {
        state.projects = state.projects.filter((p) => p.id !== action.payload);
      });
  },
});

export default projectSlice.reducer;
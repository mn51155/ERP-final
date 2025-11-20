import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RegisterCredentials, LoginCredentials, AuthState, AuthResponse, CompleteAuthResponse } from '../../features/auth/types'
import * as authApi from './api'






const initialState: AuthState = {
  user: null,
  accessToken:  localStorage.getItem('token') || null,
  loading: false,
  error: null,
  isAuthenticated:!!localStorage.getItem('token'),
  isInitialized:false
  
}

export const register = createAsyncThunk<AuthResponse, RegisterCredentials>(
  'auth/register',
  async (credentials, thunkAPI) => {

    try {
      return await authApi.registerUser(credentials)
    } catch (error: any) {
       console.log(error)
      const data = error?.response?.data
      console.log('⛔️ Error response data:', data)

      if (typeof data === 'string') {
        return thunkAPI.rejectWithValue(data)
      }

      if (data?.message) {
        return thunkAPI.rejectWithValue(data.message)
      }

      if (typeof data === 'object' && data !== null) {
        const messages = Object.values(data)
          .filter(Boolean)
          .map((msg) => String(msg))
          .join(' | ')

        return thunkAPI.rejectWithValue(messages)
      }

      // فقط در صورتی که هیچ‌کدوم از بالا کار نکرد
      return thunkAPI.rejectWithValue('خطای ناشناخته‌ای رخ داده است')


     
    }
  }
)




export const login = createAsyncThunk<
CompleteAuthResponse,
 LoginCredentials,
 {rejectValue:'string'}>(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {

      //login
     const res= await authApi.loginUser(credentials)
     const accessToken=res.accessToken
     const userId=res.user.id
     console.log('res',res)


     //get user information
     const userRes=await authApi.getUserById(userId,accessToken)
     console.log(userRes)


      //set token and Id in Local
      localStorage.setItem('token', accessToken);
      localStorage.setItem('userId', userId.toString());
      localStorage.setItem('skipRestoreSession', 'true');
      
      

      //return user information to save in State
      return {
        accessToken:accessToken,
        user:userRes
      }

    } catch (error: any) {

      console.log(error)
      return thunkAPI.rejectWithValue(error.response?.data || 'login failed')
    }
  }
)



export const restoreSession = createAsyncThunk<
CompleteAuthResponse,
void,
{rejectValue:string}
>(
  'auth/restoreSession',
   async ( _,thunkAPI) => {
  const accessToken = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  console.log(accessToken)
  console.log(userId)

  if (!accessToken || !userId) {
    return thunkAPI.rejectWithValue('No session found');
  }

  try {
    const user = await authApi.getUserById(Number(userId), accessToken);
   console.log('restore user from localstorage and dbjsom')
    return { user, accessToken };
  } catch (err) {
    return thunkAPI.rejectWithValue('Failed to restore session');
  }
});











const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      state.accessToken = null
      state.error = null,
      state.isAuthenticated=false
      state.isInitialized=true
       localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('skipRestoreSession')
    },
      

  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log(action.payload)
        state.loading = false
        state.accessToken = action.payload.accessToken
        state.isAuthenticated=true
      })
      .addCase(register.rejected, (state) => {
        state.loading = false
        
      })
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated=true
        state.accessToken = action.payload.accessToken
        state.user=action.payload.user
        })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
        .addCase(restoreSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isInitialized=true
      })
      .addCase(restoreSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'خطا در بازیابی نشست';
        state.accessToken = null;
        state.user = null;
        state.isAuthenticated = false;
        state.isInitialized=true
      });
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
import type { User } from "@/features/users/types"




export interface RegisterCredentials {
  email: string
  password: string
  username:string
  role:string
}

export interface LoginCredentials {
  email: string  
  password: string
}

export interface AuthResponse{
  accessToken:string,
  user:{
    id:number,
    email:string
  }
}

export interface CompleteAuthResponse {
  user: User;
  accessToken: string;
}




export interface AuthState {
  user: User | null
  accessToken: string | null
  loading: boolean
  error: string | null
  isAuthenticated: boolean
  isInitialized:boolean
}
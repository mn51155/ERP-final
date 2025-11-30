import axios from 'axios'
import type { User } from '../users/types'
import type { RegisterCredentials, LoginCredentials, AuthResponse , CompleteAuthResponse} from '@/features/auth/types'
import axiosInstance from '../../api/axiosInstance'

const API_URL = 'http://localhost:8000'

export async function registerUser(credentials: RegisterCredentials): Promise<AuthResponse> {
    console.log(credentials)
  const response = await axios.post(`${API_URL}/register`,credentials )
  
  
  return response.data
}

export async function loginUser(credentials: LoginCredentials): Promise<CompleteAuthResponse> {
  const response = await axios.post<CompleteAuthResponse>(`${API_URL}/login`, credentials)
  console.log('response.date:',response.data)
  return response.data
  
}





export async function getUserById (id: number, token: string): Promise<User>  {
  const res = await axiosInstance.get(`/600/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
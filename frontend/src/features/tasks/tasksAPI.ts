import axiosInstance from '../../api/axiosInstance';
import type {
  Task,
  CreateTaskRequest,
  UpdateTaskRequest,
} from './types';

const BASE_URL = '/tasks';

export async function fetchTasks(): Promise<Task[]> {
  const res = await axiosInstance.get(BASE_URL);
  return res.data;
}

export async function createTask(data: CreateTaskRequest): Promise<Task> {
  const res = await axiosInstance.post(BASE_URL, data);
  return res.data;
}

export async function updateTask(id: number, data: UpdateTaskRequest): Promise<Task> {
  const res = await axiosInstance.put(`${BASE_URL}/${id}`, data);
  return res.data;
}

export async function deleteTask(id: number): Promise<void> {
  await axiosInstance.delete(`${BASE_URL}/${id}`);
}
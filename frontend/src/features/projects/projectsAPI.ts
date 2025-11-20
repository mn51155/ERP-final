import axiosInstance from '../../api/axiosInstance';
import type { Project,CreateProjectRequest,UpdateProjectRequest } from './types';

const BASE_URL = '/projects';

export async function getProjects(): Promise<Project[]> {
  const response = await axiosInstance.get<Project[]>(BASE_URL);
  console.log(response)
  return response.data;
}

export async function getProjectById(id: number): Promise<Project> {
  const response = await axiosInstance.get<Project>(`${BASE_URL}/${id}`);
  return response.data;
}

export async function createProject(projectData: CreateProjectRequest): Promise<Project> {
  const response = await axiosInstance.post<Project>(BASE_URL, projectData);
  return response.data;
}

export async function updateProject(id: number, projectData:UpdateProjectRequest): Promise<Project> {
  const response = await axiosInstance.put<Project>(`${BASE_URL}/${id}`, projectData);
  return response.data;
}

export async function deleteProject(id: number): Promise<void> {
  await axiosInstance.delete(`${BASE_URL}/${id}`);
}
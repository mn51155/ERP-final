import axiosInstance from '../../api/axiosInstance';
import type {
  Contractor,
  CreateContractorRequest,
  UpdateContractorRequest,
} from './types';

const BASE_URL = '/contractors';

export async function fetchContractors(): Promise<Contractor[]> {
  const res = await axiosInstance.get(BASE_URL);
  return res.data;
}

export async function createContractor(data: CreateContractorRequest): Promise<Contractor> {
  const res = await axiosInstance.post(BASE_URL, data);
  return res.data;
}

export async function updateContractor(id: number, data: UpdateContractorRequest): Promise<Contractor> {
  const res = await axiosInstance.put(`${BASE_URL}/${id}`, data);
  return res.data;
}

export async function deleteContractor(id: number): Promise<void> {
  await axiosInstance.delete(`${BASE_URL}/${id}`);
}
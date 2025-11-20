// src/features/users/api.ts
import axios from "axios";
import type { User } from "./types";
import axiosInstance from "../../api/axiosInstance";

const API_URL = "/users"; // مسیر سرور

export const getUsers = async (): Promise<User[]> => {
  const res = await axiosInstance.get(API_URL);
  return res.data;
};



export const updateUser = async (id: number, user: Partial<User>): Promise<User> => {
  console.log(user)
  console.log(id)
  const res = await axiosInstance.put(`${API_URL}/${id}`, user);
  console.log(res.data)
  return res.data;
};

export const deleteUser = async (id: number): Promise<number> => {
  await axiosInstance.delete(`${API_URL}/${id}`);
  return id; // فقط id رو برمی‌گردونیم برای حذف از state
};
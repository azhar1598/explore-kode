import { API_BASE_URL } from "@/constants";
import { createClient } from "@/utils/supabase/client";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getSession } from "next-auth/react";

export const BASE_URL = API_BASE_URL;

export const api = axios.create({
  baseURL: BASE_URL,
});

export interface ApiResponse<T = any> {
  data: T;
  status: number;
}

const callApi = {
  async get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return await callApi.request<T>(url, "GET", null, config);
  },
  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return await callApi.request<T>(url, "POST", data, config);
  },
  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return await callApi.request<T>(url, "PUT", data, config);
  },
  async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return await callApi.request<T>(url, "DELETE", null, config);
  },
  async request<T = any>(
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const accessToken = session?.access_token;

      const headers = {
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...config?.headers,
      };

      console.log("Request headers:", headers); // For debugging

      const response: AxiosResponse<T> = await api.request({
        url,
        method,
        data,
        headers,
        ...config,
      });

      return { data: response.data, status: response.status };
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.log("API Error:", error.message);
        throw error.response?.data || error.message;
      } else {
        console.error("Unexpected Error:", error);
        throw new Error("An unexpected error occurred");
      }
    }
  },
};

export default callApi;

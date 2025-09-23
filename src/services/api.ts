import type { Business, ApiResponse } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

class ApiService {
  private async request<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'API request failed');
      }
      
      return data;
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error instanceof Error ? error : new Error('Unknown API error');
    }
  }

  async getBusinesses(params: Record<string, string | number> = {}): Promise<ApiResponse<Business[]>> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, String(value));
      }
    });
    
    const endpoint = `/businesses${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    return this.request<ApiResponse<Business[]>>(endpoint);
  }

  async getBusinessById(id: number): Promise<ApiResponse<Business>> {
    return this.request<ApiResponse<Business>>(`/businesses/${id}`);
  }

  async getCategories(): Promise<ApiResponse<string[]>> {
    return this.request<ApiResponse<string[]>>('/businesses/meta/categories');
  }

  async getServices(): Promise<ApiResponse<string[]>> {
    return this.request<ApiResponse<string[]>>('/businesses/meta/services');
  }

  async healthCheck(): Promise<{ status: string; message: string }> {
    const response = await fetch('http://localhost:3001/health');
    return response.json();
  }
}

export const apiService = new ApiService();
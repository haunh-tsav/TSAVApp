// src/api/client.ts
import axios from 'axios';

// Tạo instance chung cho toàn bộ API
const apiClient = axios.create({
  baseURL: `${process.env.API_URL ?? ''}/`, // thay bằng API backend của bạn
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10_000, // timeout 10s
});

// 🛠️ Interceptors
// Add token trước khi gửi request
apiClient.interceptors.request.use(
  async (config) => {
    // Ví dụ: lấy token từ MMKV (hoặc AsyncStorage)
    // const token = MMKV.getString('access_token');
    const token = undefined;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Xử lý response / refresh token
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Nếu lỗi 401 → có thể refresh token tại đây
    if (error.response?.status === 401) {
      // TODO: refresh token hoặc redirect login
    }
    throw error;
  },
);

export default apiClient;

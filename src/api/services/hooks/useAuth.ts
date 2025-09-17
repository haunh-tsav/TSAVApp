import { useMutation, useQueryClient } from '@tanstack/react-query'

import { LoginInput, RegisterInput } from '@/models/auth.model'
import { clearAccessToken, setAccessToken } from '@/storage/token'

import { authService } from '..'
import { DEFAULT_QUERY_USER_KEY } from './useUser'

export default function useAuth() {
  const queryClient = useQueryClient()

  // Login (POST)
  // Sử dụng useMutation vì đây là thao tác thay đổi dữ liệu (POST)
  // Tuy không cần lưu cache nhưng cần dùng useMutation để dễ dàng quản lý trạng thái (loading, error, success)
  // và thực hiện các hành động phụ trợ (side effects) như lưu token, điều hướng, hiển thị thông báo, v.v.
  const login = useMutation({
    mutationFn: async (parameters: LoginInput) => authService.login(parameters),
    onSuccess: async data => {
      const token = data.data?.token
      // Check token not undefined or empty
      if (token != undefined && token !== '') {
        // Lưu token vào storage
        await setAccessToken(token)
      }
      return data
    },
  })

  // Logout (POST)
  // Sử dụng useMutation vì đây là thao tác thay đổi dữ liệu (POST)
  // Tuy không cần lưu cache nhưng cần dùng useMutation để dễ dàng quản lý trạng thái (loading, error, success)
  // và thực hiện các hành động phụ trợ (side effects) như xóa token, điều hướng, hiển thị thông báo, v.v.
  // Khi logout thành công, xóa token khỏi storage và xoá cache 'user'
  const logout = useMutation({
    mutationFn: async () => authService.logout(),
    onSuccess: async () => {
      await clearAccessToken()
      queryClient.removeQueries({ queryKey: [DEFAULT_QUERY_USER_KEY] })
    },
  })

  // Get user by id (GET)
  const register = useMutation({
    mutationFn: async (parameters: RegisterInput) => authService.register(parameters),
    onSuccess: async data => {
      const token = data.data?.token
      if (token != undefined && token !== '') {
        // Lưu token vào storage
        await setAccessToken(token)
      }
      if (data.data != undefined) {
        queryClient.setQueryData([DEFAULT_QUERY_USER_KEY], data.data)
      }
    },
  })

  return {
    login,
    logout,
    register,
  }
}

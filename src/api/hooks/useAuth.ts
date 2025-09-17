import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { LoginInput, RegisterInput } from '@/models/auth.model'
import { clearAccessToken, setAccessToken } from '@/storage/token'
import { authService } from '../services'
import { DEFAULT_QUERY_USER_KEY } from './useUser'

export default function useAuth() {
  const queryClient = useQueryClient()
  const [authenticated, setAuthenticated] = useState(false) // Thêm state authenticated

  // Login (POST)
  const useLogin = useMutation({
    mutationFn: async (parameters: LoginInput) => {
      try {
        const response = await authService.login(parameters)
        return response
      } catch (error) {
        throw new Error('Login failed. Please check your credentials.')
      }
    },
    onSuccess: async data => {
      const token = data?.data?.token
      if (token) {
        await setAccessToken(token)
        setAuthenticated(true) // Cập nhật state khi đăng nhập thành công
      }
    },
    onError: error => {
      console.error('Login error:', error)
    },
  })

  // Logout (POST)
  const useLogout = useMutation({
    mutationFn: async () => {
      try {
        await authService.logout()
      } catch (error) {
        throw new Error('Logout failed.')
      }
    },
    onSuccess: async () => {
      await clearAccessToken()
      queryClient.removeQueries({ queryKey: [DEFAULT_QUERY_USER_KEY] })
      setAuthenticated(false) // Cập nhật state khi đăng xuất
    },
    onError: error => {
      console.error('Logout error:', error)
    },
  })

  // Register (POST)
  const useRegister = useMutation({
    mutationFn: async (parameters: RegisterInput) => {
      try {
        const response = await authService.register(parameters)
        return response
      } catch (error) {
        throw new Error('Registration failed. Please try again.')
      }
    },
    onSuccess: async data => {
      const token = data?.data?.token
      if (token) {
        await setAccessToken(token)
        setAuthenticated(true) // Cập nhật state khi đăng ký thành công
      }
      if (data?.data) {
        queryClient.setQueryData([DEFAULT_QUERY_USER_KEY], data.data)
      }
    },
    onError: error => {
      console.error('Registration error:', error)
    },
  })

  return {
    useLogin,
    useLogout,
    useRegister,
    authenticated, // Trả về state authenticated
  }
}

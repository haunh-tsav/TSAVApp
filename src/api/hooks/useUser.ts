import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { User } from '@/models/user.model'

import { userService } from '../services'
import { RequestDataType } from '../types'

export const DEFAULT_QUERY_USER_KEY = 'user' // key dùng để lưu cache user (username, email, employeeCode, ...)
export const DEFAULT_QUERY_USERS_KEY = 'users' // key dùng để lưu cache danh sách users

export default function useUser() {
  const createUser = (newItem: User) => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: () => userService.createUser(newItem), // hàm gọi API
      onSuccess: () => {
        // Sau khi tạo user mới, refetch lại danh sách users
        queryClient.invalidateQueries({ queryKey: [DEFAULT_QUERY_USERS_KEY] })
      },
    })
  }

  // Get user by id (GET)
  const getUserById = (id: number) => {
    return useQuery({
      queryFn: () => userService.getUserById(id), // hàm gọi API
      queryKey: [DEFAULT_QUERY_USER_KEY, id], // cache key
      staleTime: 5 * 60 * 1000, // cache sống 5 phút, sau 5 phút sẽ gọi lại queryFn để lấy dữ liệu mới
    })
  }

  // Get user by employeeCode (GET)
  const getUserByCode = (code: string) => {
    return useQuery({
      queryFn: () => userService.getUserByCode(code), // hàm gọi API
      queryKey: [DEFAULT_QUERY_USER_KEY, code], // cache key
      staleTime: 5 * 60 * 1000, // cache sống 5 phút, sau 5 phút sẽ gọi lại queryFn để lấy dữ liệu mới
    })
  }

  // Patch update user by id (PATCH)
  const patchUpdateUserById = (id: number, updatedFields: Partial<User>) => {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: () => userService.partialUpdateUserById(id, updatedFields), // hàm gọi API
      onError: (error) => {
        console.error('Error updating user:', error)
      },
      onSuccess: () => {
        // invalidateQueries sẽ xoá cache của queryKey, khi nào component dùng queryKey này mount lại sẽ gọi lại queryFn để lấy dữ liệu mới
        queryClient.invalidateQueries({
          queryKey: [DEFAULT_QUERY_USER_KEY, id],
        })
      },
    })
  }

  // Put update user by id (PUT)
  const putUpdateUserById = (id: number, updatedFields: User) => {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: () => userService.updateRecordUserById(id, updatedFields), // hàm gọi API
      onError: (error) => {
        console.error('Error updating user:', error)
      },
      onSuccess: () => {
        // invalidateQueries sẽ xoá cache của queryKey, khi nào component dùng queryKey này mount lại sẽ gọi lại queryFn để lấy dữ liệu mới
        queryClient.invalidateQueries({
          queryKey: [DEFAULT_QUERY_USER_KEY, id],
        })
      },
    })
  }

  // Get all users with parameters (POST)
  const getAllUsers = (parameters: RequestDataType) => {
    return useQuery({
      queryFn: () => userService.getAllUsers(parameters), // hàm gọi API
      queryKey: [DEFAULT_QUERY_USERS_KEY],
      staleTime: 5 * 60 * 1000, // cache sống 5 phút, sau 5 phút sẽ gọi lại queryFn để lấy dữ liệu mới
    })
  }

  return {
    createUser,
    getAllUsers,
    getUserByCode,
    getUserById,
    patchUpdateUserById,
    putUpdateUserById,
  }
}

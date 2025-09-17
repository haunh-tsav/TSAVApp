import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { User } from '@/api/schemas/UserSchema'
import { RequestDataType } from '../../types'
import { userService } from '../user.service'

export const DEFAULT_QUERY_USER_KEY = 'user' // key dùng để lưu cache user (username, email, employeeCode, ...)
export const DEFAULT_QUERY_USERS_KEY = 'users' // key dùng để lưu cache danh sách users
const enum UserQueryKey {
  fetchOne = 'fetchOneUser',
  fetchAll = 'fetchAllUsers',
}

export default function useUserService() {
  const queryClient = useQueryClient()

  const useCreateUser = useMutation({
    mutationFn: async (newItem: User) => {
      const response = await userService.createUser(newItem)
      return response?.data
    }, // hàm gọi API
    onSuccess: async () => {
      // Sau khi tạo user mới, refetch lại danh sách users
      await queryClient.invalidateQueries({ queryKey: [DEFAULT_QUERY_USERS_KEY] })
    },
  })

  // Lấy user theo id
  const useGetUserById = (userId: number) =>
    useQuery({
      queryKey: [DEFAULT_QUERY_USER_KEY, userId],
      queryFn: async () => {
        const response = await userService.getUserById(userId)
        return response?.data
      },
      enabled: !!userId, // chỉ gọi khi có userId
      staleTime: 5 * 60 * 1000,
    })

  // Get user by employeeCode (GET)
  const useGetUserByCode = (employeeCode: string) =>
    useQuery({
      queryFn: async () => {
        if (!employeeCode) return undefined // Trả về null nếu không có employeeCode
        const response = await userService.getUserByCode(employeeCode)
        return response?.data
      },
      queryKey: [DEFAULT_QUERY_USER_KEY, employeeCode],
      enabled: !!employeeCode, // Chỉ gọi query khi có employeeCode
      staleTime: 5 * 60 * 1000,
    })

  // Patch update user by id (PATCH)
  const usePartialUpdateUserById = useMutation({
    mutationFn: async ({ id, updatedFields }: { id: number; updatedFields: Partial<User> }) => {
      const response = await userService.partialUpdateUserById(id, updatedFields)
      return response?.data
    }, // hàm gọi API
    onError: error => {
      console.error('Error updating user:', error)
    },
    onSuccess: async data => {
      // invalidateQueries sẽ xoá cache của queryKey, khi nào component dùng queryKey này mount lại sẽ gọi lại queryFn để lấy dữ liệu mới
      await queryClient.invalidateQueries({
        queryKey: [DEFAULT_QUERY_USER_KEY, data?.id],
      })
    },
  })

  // Put update user by id (PUT)
  const useUpdateUserById = useMutation({
    mutationFn: async ({ id, updatedRecord }: { id: number; updatedRecord: User }) => {
      const response = await userService.updateRecordUserById(id, updatedRecord)
      return response?.data
    }, // hàm gọi API
    onError: error => {
      console.error('Error updating user:', error)
    },
    onSuccess: async data => {
      // invalidateQueries sẽ xoá cache của queryKey, khi nào component dùng queryKey này mount lại sẽ gọi lại queryFn để lấy dữ liệu mới
      await queryClient.invalidateQueries({
        queryKey: [DEFAULT_QUERY_USER_KEY, data?.id],
      })
    },
  })

  // Get all users with parameters (POST)
  const useGetAllUsers = (parameters: RequestDataType) =>
    useQuery({
      queryFn: async () => await userService.getAllUsers(parameters), // hàm gọi API
      queryKey: [DEFAULT_QUERY_USERS_KEY, parameters], // thêm parameters vào queryKey để phân biệt cache
      staleTime: 5 * 60 * 1000, // cache sống 5 phút, sau 5 phút sẽ gọi lại queryFn để lấy dữ liệu mới
    })

  const invalidateQuery = (queryKeys: UserQueryKey[]) =>
    queryClient.invalidateQueries({
      queryKey: queryKeys,
    })

  return {
    invalidateQuery,
    useCreateUser,
    useGetAllUsers,
    useGetUserByCode,
    useGetUserById,
    usePartialUpdateUserById,
    useUpdateUserById,
  }
}

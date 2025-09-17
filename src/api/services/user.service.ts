// src/api/services/posts.service.ts

import apiClient from '../client'
import { User } from '../schemas/UserSchema'
import { RequestDataType, ResponseDataType } from '../types'

const NAMESPACE = 'users'

export const userService = {
  createUser: async (newItem: User): Promise<ResponseDataType<User> | undefined> => {
    return await apiClient
      .post<ResponseDataType<User>>(`/${NAMESPACE}`, newItem)
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching user by ID:', error)
        return undefined
      })
  },
  getUserById: async (userId: number): Promise<ResponseDataType<User> | undefined> => {
    return await apiClient
      .get<ResponseDataType<User>>(`/${NAMESPACE}?id=${userId}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching user by ID:', error)
        return undefined
      })
  },
  getUserByCode: async (code: string): Promise<ResponseDataType<User> | undefined> => {
    return await apiClient
      .get<ResponseDataType<User>>(`/${NAMESPACE}?code=${code}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching user by Code:', error)
        return undefined
      })
  },
  getAllUsers: async (
    parameters: RequestDataType,
  ): Promise<ResponseDataType<User[]> | undefined> => {
    return await apiClient
      .post<ResponseDataType<User[]>>(`/${NAMESPACE}`, parameters)
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching user by Code:', error)
        return undefined
      })
  },
  partialUpdateUserById: async (
    id: number,
    newItem: Partial<User>,
  ): Promise<ResponseDataType<User> | undefined> => {
    return await apiClient
      .patch<ResponseDataType<User>>(`/${NAMESPACE}?id=${id}`, newItem)
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching user by Code:', error)
        return undefined
      })
  },
  updateRecordUserById: async (
    id: number,
    newItem: User,
  ): Promise<ResponseDataType<User> | undefined> => {
    return await apiClient
      .put<ResponseDataType<User>>(`/${NAMESPACE}?id=${id}`, newItem)
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching user by Code:', error)
        return undefined
      })
  },
}

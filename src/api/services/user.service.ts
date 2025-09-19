// src/api/services/posts.service.ts

import apiClient from '../client'
import { User } from '../schemas/UserSchema'
import { RequestDataType, ResponseDataType } from '../types'

const endPoint = '/users'

export const userService = {
  createUser: async (newItem: User): Promise<ResponseDataType<User> | undefined> => {
    return await apiClient
      .post<ResponseDataType<User>>(`${endPoint}`, newItem)
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching user by ID:', error)
        return undefined
      })
  },
  getUserById: async (userId: number): Promise<ResponseDataType<User> | undefined> => {
    return await apiClient
      .get<ResponseDataType<User>>(`${endPoint}?id=${userId}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching user by ID:', error)
        return undefined
      })
  },
  getUserByCode: async (code: string): Promise<ResponseDataType<User> | undefined> => {
    return await apiClient
      .get<ResponseDataType<User>>(`${endPoint}?code=${code}`)
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
      .post<ResponseDataType<User[]>>(`${endPoint}`, parameters)
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching user by Code:', error)
        return undefined
      })
  },
  getAllUsersFakeData: async (): Promise<User[] | undefined> => {
    return await apiClient
      .get<User[]>(`${endPoint}`)
      .then(response => {
        console.log('Fake data users loaded')
        return response.data
      })
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
      .patch<ResponseDataType<User>>(`${endPoint}?id=${id}`, newItem)
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
      .put<ResponseDataType<User>>(`${endPoint}?id=${id}`, newItem)
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching user by Code:', error)
        return undefined
      })
  },
}

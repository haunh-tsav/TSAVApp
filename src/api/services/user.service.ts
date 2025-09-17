// src/api/services/posts.service.ts
import { User } from '@/models/user.model'

import apiClient from '../client'
import { RequestDataType, ResponseDataType } from '../types'

const NAMESPACE = '/users'

// Create new user (POST)
export const createUser = async (
  newItem: User,
): Promise<ResponseDataType<User>> => {
  return await apiClient
    .post<ResponseDataType<User>>(NAMESPACE, newItem)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      throw error
    })
    .finally(() => {
      // console.log('done')
    })
}

// Get user by id (GET)
export const getUserById = async (
  id: number,
): Promise<ResponseDataType<User>> => {
  return await apiClient
    .get<ResponseDataType<User>>(`${NAMESPACE}?id=${id}`)
    .then((res) => res.data)
    .catch((error) => {
      throw error
    })
    .finally(() => {
      // console.log('done')
    })
}

// Get user by employeeCode (GET)
export const getUserByCode = async (
  code: string,
): Promise<ResponseDataType<User>> => {
  return await apiClient
    .get<ResponseDataType<User>>(`${NAMESPACE}?code=${code}`)
    .then((res) => res.data)
    .catch((error) => {
      throw error
    })
    .finally(() => {
      // console.log('done')
    })
}

// Get all user with parameters (POST)
export const getAllUsers = async (
  parameters: RequestDataType,
): Promise<ResponseDataType<User[]>> => {
  return await apiClient
    .post<ResponseDataType<User[]>>(NAMESPACE, parameters)
    .then((res) => res.data)
    .catch((error) => {
      throw error
    })
    .finally(() => {
      // console.log('done')
    })
}

// Partial update user by id (PATCH)
export const partialUpdateUserById = async (
  id: number,
  newItem: Partial<User>,
): Promise<ResponseDataType<User>> => {
  return await apiClient
    .patch<ResponseDataType<User>>(`${NAMESPACE}?id=${id}`, newItem)
    .then((res) => res.data)
    .catch((error) => {
      throw error
    })
    .finally(() => {
      // console.log('done')
    })
}

// Update record user by id (PUT)
export const updateRecordUserById = async (
  id: number,
  newItem: User,
): Promise<ResponseDataType<User>> => {
  return await apiClient
    .put<ResponseDataType<User>>(`${NAMESPACE}?id=${id}`, newItem)
    .then((response) => response.data)
    .catch((error) => {
      throw error
    })
    .finally(() => {
      // console.log('done')
    })
}

import { LoginInput, RegisterInput } from '@/models/auth.model'
import { User } from '@/models/user.model'

import apiClient from '../client'
import { ResponseDataType } from '../types'

const NAMESPACE = '/auth'

// Create new user (POST)
export const login = async (
  parameters: LoginInput,
): Promise<ResponseDataType<User>> => {
  return await apiClient
    .post<ResponseDataType<User>>(NAMESPACE, parameters)
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

// Create new user (POST)
export const logout = async (): Promise<ResponseDataType<string>> => {
  return await apiClient
    .post<ResponseDataType<string>>(`${NAMESPACE}/logout`)
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

export const register = async (
  parameters: RegisterInput,
): Promise<ResponseDataType<User>> => {
  return await apiClient
    .post<ResponseDataType<User>>(`${NAMESPACE}/register`, parameters)
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

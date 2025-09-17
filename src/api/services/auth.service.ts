import { LoginInput, RegisterInput } from '@/models/auth.model'

import apiClient from '../client'
import { User } from '../schemas/UserSchema'
import { ResponseDataType } from '../types'

const NAMESPACE = '/auth'

// Create new user (POST)
export const login = async (parameters: LoginInput): Promise<ResponseDataType<User>> => {
  return await apiClient
    .post<ResponseDataType<User>>(NAMESPACE, parameters)
    .then(response => {
      return response.data
    })
    .catch(error => {
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
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error
    })
    .finally(() => {
      // console.log('done')
    })
}

export const register = async (parameters: RegisterInput): Promise<ResponseDataType<User>> => {
  return await apiClient
    .post<ResponseDataType<User>>(`${NAMESPACE}/register`, parameters)
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error
    })
    .finally(() => {
      // console.log('done')
    })
}

// src/storage/token.ts
import * as Keychain from 'react-native-keychain'

const DEFAULT_TOKEN_KEY = 'access_token'

export const setToken = async (token: string) => {
  await Keychain.setGenericPassword(DEFAULT_TOKEN_KEY, token)
}

export const getToken = async (): Promise<string | undefined> => {
  const creds = await Keychain.getGenericPassword()
  return creds ? creds.password : undefined
}

export const clearToken = async () => {
  await Keychain.resetGenericPassword()
}

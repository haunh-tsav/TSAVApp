// src/storage/token.ts
import * as Keychain from 'react-native-keychain'

const DEFAULT_TOKEN_KEY = 'accessToken'

export const setAccessToken = async (token: string) => {
  await Keychain.setGenericPassword(DEFAULT_TOKEN_KEY, token)
}

export const getAccessToken = async (): Promise<string | undefined> => {
  const creds = await Keychain.getGenericPassword()
  return creds ? creds.password : undefined
}

export const clearAccessToken = async () => {
  await Keychain.resetGenericPassword()
}

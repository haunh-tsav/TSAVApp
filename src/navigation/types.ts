import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { AuthPaths, Paths, RootPaths } from './paths'

export type AppTabParamList = {
  [Paths.Explore]: undefined
  [Paths.Home]: undefined
  [Paths.Profile]: undefined
  [Paths.Search]: undefined
}

export type AuthStackParamList = {
  [AuthPaths.Login]: undefined
  [AuthPaths.Register]: undefined
}

export type RootScreenProps<S extends keyof RootStackParamList = keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, S>

export type RootStackParamList = {
  [RootPaths.App]: undefined
  [RootPaths.Auth]: undefined
}

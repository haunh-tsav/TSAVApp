import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginScreen from '@/screens/Authen/Login/LoginScreen'
import RegisterScreen from '@/screens/Authen/Register/RegisterScreen'

import useTheme from '@/theme/hooks/useTheme'
import { AuthPaths } from '../paths'
import { AuthStackParamList } from '../types'

const Stack = createNativeStackNavigator<AuthStackParamList>()

export default function AuthStack() {
  const { variant } = useTheme()

  return (
    <Stack.Navigator
      key={variant}
      initialRouteName={AuthPaths.Login}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen component={LoginScreen} name={AuthPaths.Login} />
      <Stack.Screen component={RegisterScreen} name={AuthPaths.Register} />
    </Stack.Navigator>
  )
}

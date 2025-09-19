import type { RootStackParamList } from '@/navigation/types'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { RootPaths } from '@/navigation/paths'

import useAuth from '@/api/hooks/useAuth'
import { useTheme } from '@/theme'
import AppStack from './stacks/AppStack'
import AuthStack from './stacks/AuthStack'

const RootStack = createNativeStackNavigator<RootStackParamList>()

export default function RootNavigator() {
  const { authenticated } = useAuth()
  const { navigationTheme, variant } = useTheme()

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navigationTheme}>
        <RootStack.Navigator
          key={variant}
          initialRouteName={!authenticated ? RootPaths.App : RootPaths.Auth}
          screenOptions={{ headerShown: false }}
        >
          <RootStack.Screen component={AppStack} name={RootPaths.App} />
          <RootStack.Screen component={AuthStack} name={RootPaths.Auth} />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

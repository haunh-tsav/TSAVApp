import 'react-native-gesture-handler'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { MMKV } from 'react-native-mmkv'

import { ThemeProvider } from '@/theme'
import '@/translations'
import RootNavigator from './navigation/RootNavigator'

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
    },
    queries: {
      retry: false,
    },
  },
})

export const storage = new MMKV()

function App() {
  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider storage={storage}>
          <RootNavigator />
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  )
}

export default App

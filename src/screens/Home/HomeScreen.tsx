import useUser from '@/api/hooks/useUser'
import { ScrollView, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

function HomeScreen() {
  const { useGetAllUsersFakeData } = useUser()
  const getAllUsers = useGetAllUsersFakeData()

  if (getAllUsers.isLoading) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <Text>{JSON.stringify(getAllUsers.data, null, 2)}</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

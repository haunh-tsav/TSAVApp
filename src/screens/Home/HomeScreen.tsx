import useUser from '@/api/hooks/useUser'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

function HomeScreen() {
  const { useGetAllUsersFakeData } = useUser()
  const getAllUsers = useGetAllUsersFakeData()

  if (getAllUsers.isLoading) {
    return (
      <SafeAreaView>
        <View>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <Text>{JSON.stringify(getAllUsers.data, null, 5)}</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

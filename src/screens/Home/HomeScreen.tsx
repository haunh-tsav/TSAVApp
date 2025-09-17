import useUser from '@/api/hooks/useUser'
import { User } from '@/api/schemas/UserSchema'
import { userService } from '@/api/services/user.service'
import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

function HomeScreen() {
  const { useGetAllUsersFakeData } = useUser()
  const getAllUsers = useGetAllUsersFakeData()
  const [users, setUsers] = useState<User[] | undefined>(undefined)

  useEffect(() => {
    callAPIs()
  }, [])

  const callAPIs = async () => {
    try {
      const response = await userService.getAllUsersFakeData()
      setUsers(response)
    } catch (error) {}
  }

  return (
    <SafeAreaView>
      <View>
        <Text>{users?.toString()}</Text>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

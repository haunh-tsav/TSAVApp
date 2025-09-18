import ExploreScreen from '@/screens/Explore/ExploreScreen'
import HomeScreen from '@/screens/Home/HomeScreen'
import ProfileScreen from '@/screens/Profile/ProfileScreen'
import SearchScreen from '@/screens/Search/SearchScreen'
import useTheme from '@/theme/hooks/useTheme'
import Icon from '@react-native-vector-icons/feather'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Paths } from '../paths'
import { AppTabParamList } from '../types'

const Drawer = createDrawerNavigator<AppTabParamList>()

export default function AppStack() {
  const { variant, colors } = useTheme()

  return (
    <Drawer.Navigator
      defaultStatus="open"
      screenOptions={{
        headerShown: true,
        drawerLabelStyle: {
          color: 'black',
          fontSize: 20,
          fontFamily: 'Georgia',
        },
      }}
    >
      <Drawer.Screen
        component={HomeScreen}
        name={Paths.Home}
        options={{
          drawerIcon: () => <Icon name="home" size={20} color={colors.gray400} />,
        }}
      />
      <Drawer.Screen component={ExploreScreen} name={Paths.Explore} />
      <Drawer.Screen component={SearchScreen} name={Paths.Search} />
      <Drawer.Screen component={ProfileScreen} name={Paths.Profile} />
    </Drawer.Navigator>
  )
}

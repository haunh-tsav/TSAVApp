import ExploreScreen from '@/screens/Explore/ExploreScreen'
import HomeScreen from '@/screens/Home/HomeScreen'
import ProfileScreen from '@/screens/Profile/ProfileScreen'
import SearchScreen from '@/screens/Search/SearchScreen'
import useTheme from '@/theme/hooks/useTheme'
import Icon from '@react-native-vector-icons/feather'
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Text } from 'react-native'
import { Paths } from '../paths'
import { AppTabParamList } from '../types'

const Tab = createBottomTabNavigator<AppTabParamList>()

export default function AppStack() {
  const { variant, colors } = useTheme()

  const tabConfigOptions = (
    iconName: 'home' | 'compass' | 'search' | 'user',
  ): BottomTabNavigationOptions => {
    return {
      tabBarIcon: props => (
        <Icon name={iconName} size={20} color={props.focused ? colors.gray400 : colors.gray200} />
      ),
      tabBarLabel: props => (
        <Text style={{ color: props.focused ? colors.gray400 : colors.gray200 }}>Home</Text>
      ),
      animation: 'fade',
    }
  }

  return (
    <Tab.Navigator
      key={variant}
      initialRouteName={Paths.Home}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen component={HomeScreen} name={Paths.Home} options={tabConfigOptions('home')} />
      <Tab.Screen
        component={ExploreScreen}
        name={Paths.Explore}
        options={tabConfigOptions('compass')}
      />
      <Tab.Screen
        component={SearchScreen}
        name={Paths.Search}
        options={tabConfigOptions('search')}
      />
      <Tab.Screen
        component={ProfileScreen}
        name={Paths.Profile}
        options={tabConfigOptions('user')}
      />
    </Tab.Navigator>
  )
}

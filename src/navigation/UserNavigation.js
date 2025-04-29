import { createStackNavigator } from '@react-navigation/stack';
import SignUp from '../screens/SignUp';
import Login from '../screens/Login';
import UserProfiles from '../screens/UserProfiles';



const Stack = createStackNavigator();

export default function UserNavigation() {
  return (
    <Stack.Navigator initialRouteName='SignUp'
      screenOptions={{
        headerTitleStyle: {
          fontSize: 22, 
          fontWeight: 'bold', 
          marginBottom: 10
        },
        headerTitleAlign: 'center', 
        headerTintColor: 'black', 
        headerBackTitle: '',   //headerBackTitleVisible: false doesn't work with nested navigation
      }}  
    >
      <Stack.Screen name='UserProfiles' component={UserProfiles} options={{headerShown: false}}/>
      <Stack.Screen name='SignUp' component={SignUp} options={{headerShown: false}}/>
      <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
    </Stack.Navigator>

  )
}

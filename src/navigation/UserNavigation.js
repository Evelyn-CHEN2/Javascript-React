import { createStackNavigator } from '@react-navigation/stack';
import SignUp from '../screens/SignUp';
import SignIn from '../screens/SignIn';
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
      <Stack.Screen name='SignIn' component={SignIn} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

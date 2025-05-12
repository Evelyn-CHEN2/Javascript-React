import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import Categories from '../screens/Categories';
import ProductsList from '../screens/ProductsList';
import ProductDetails from '../screens/ProductDetails';
import CustomHeader from '../components/CustomHeader';
import SignIn from '../screens/SignIn';

const Stack = createStackNavigator();

export default function ProductsNavigation({ navigation }) {
  const loggedUser = useSelector (state => state.user.loggedUser)

  if (!loggedUser){
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignIn} />
      </Stack.Navigator>
    )
  }

  // logged user can navigate between these screens
  return (
    <Stack.Navigator initialRouteName='Categories'
      screenOptions={{
        headerTitleAlign: 'center', 
        headerTintColor: 'black', 
        headerBackTitle: '',   //headerBackTitleVisible: false doesn't work with nested navigation
      }}  
    >
      <Stack.Screen name='Categories' component={Categories} options={{
        headerTitle: () => <CustomHeader title = 'Categories'/>
      }}/>
      <Stack.Screen name='Products List' component={ProductsList} />
      <Stack.Screen name='Product Details' component={ProductDetails} />
    </Stack.Navigator>

  )
}

import { createStackNavigator } from '@react-navigation/stack';
import Categories from '../screens/Categories';
import ProductsList from '../screens/ProductsList';
import ProductDetails from '../screens/ProductDetails';

const Stack = createStackNavigator();

export default function ProductsNavigation() {
  return (
    <Stack.Navigator initialRouteName='Categories'
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
      <Stack.Screen name='Categories' component={Categories}/>
      <Stack.Screen name='Products List' component={ProductsList}/>
      <Stack.Screen name='Product Details' component={ProductDetails}/>
    </Stack.Navigator>

  )
}

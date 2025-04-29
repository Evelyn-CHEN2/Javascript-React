import { Text, View } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ShoppingCart from '../screens/ShoppingCart';
import Orders from '../screens/Orders';
import colors from "../constants/color";
import ProductsNavigation from "./ProductsNavigation";
import UserNavigation from './UserNavigation';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();
export default function BottomTab() {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    return (
      <Tab.Navigator
        screenOptions={({route})=> ({
          tabBarIcon: ({focused, size}) => {
            let iconName;
            let iconColor = focused ? colors.titleBorder : 'black';
            let iconSize = 24;

            if (route.name === 'Product Tabs') iconName = 'home'
            if (route.name === 'ShoppingCart') iconName = 'cart'
            if (route.name === 'Orders') iconName = 'gift'
            if (route.name === 'Profile Tab') iconName = 'people'

            return(
              <View>
                <Ionicons name={iconName} size={iconSize} color={iconColor}/>
                {route.name === 'ShoppingCart' && totalItems > 0 && (
                  <View style={{position: 'absolute',
                                top: -5,
                                right: -10,
                                width: 16,
                                height: 16,
                                justifyContent: 'center',
                                alignItems: 'center',
                  }}>
                    <Text style={{color: colors.titleBorder, fontWeight: 'bold'}}>{totalItems}</Text>
                  </View>
                )}
              </View>
              );
          },
          tabBarLabelStyle: {
            fontSize: 12, 
            fontWeight: '400',
          },
          tabBarActiveTintColor: colors.titleBorder,
          tabBarInactiveTintColor: 'black',
          tabBarShowLabel: true
        })}>
      <Tab.Screen name='Product Tabs' component={ProductsNavigation} 
        options={{tabBarLabel: 'Products', headerShown: false}}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // Prevent default behavior
            e.preventDefault();
            // Reset to root screen of the stack (Categories)
            navigation.navigate('Product Tabs', {
              screen: 'Categories', 
          });
        }
      })}
      />
      <Tab.Screen name='ShoppingCart' component={ShoppingCart} options={{tabBarLabel: 'My Cart', headerTitleStyle: {fontSize: 22, fontWeight: 'bold'}, headerTitleAlign: 'center'}}/>
      <Tab.Screen name='Orders' component={Orders} options={{tabBarLabel: 'My Orders', headerTitleStyle: {fontSize: 22, fontWeight: 'bold'}, headerTitleAlign: 'center'}}/>
      <Tab.Screen name='Profile Tab' component={UserNavigation} 
        options={{tabBarLabel:'User Profiles', headerTitleStyle: {fontSize: 22, fontWeight: 'bold'}, headerTitleAlign: 'center', headerShown: false}}/>
      </Tab.Navigator>
    )
  }
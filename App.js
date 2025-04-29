import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './store';
import SplashScreen from './src/screens/SplashScreen';
import BottomTab from './src/navigation/BottomTab';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
          <Stack.Navigator initialRouteName='SplashScreen'>
              <Stack.Screen name='SplashScreen' component={SplashScreen} options={{headerShown: false}}/>
              <Stack.Screen name='MainTabs' component={BottomTab} options={{headerShown: false}}/>
          </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}






// Practice to create draw navigation
// import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import BottomTab from './src/navigation/BottomTab';
// import UserProfiles from './src/screens/UserProfiles';
// const Drawer = createDrawerNavigator();
// const MyDrawer = () => {
//   return (
//     <SafeAreaView style= {{flex:1}}>
//       <Drawer.Navigator
//         initialRouteName='Categories'
//         screenOptions={{
//           drawerType: 'front',
//           drawerPosition: 'left',
//           drawerStyle: {width: 200, backgroundColor: 'white'},
//           headerStyle: {
//             height: 50,
//             backgroundColor: 'lightblue',
//           },
//           headerTitleStyle: {
//             fontSize: 24,
//             fontWeight: 'bold',
//           },
//           headerStatusBarHeight: 0,
//         }}
//         drawerContent={props => {
//           const {routeNames, index} = props.state;
//           const focused = routeNames[index];

//           return (
//             <DrawerContentScrollView {...props}>
//               <DrawerItem
//                 label = {'Home'}
//                 onPress = {() => props.navigation.navigate('Home')}
//                 focused = {focused === 'Home'}
//                 activeTintColor = {'blue'}
//                 inactiveTintColor = {'black'}>
//               </DrawerItem>
//               <DrawerItem
//                 label = {'Categories'}
//                 onPress = {() => props.navigation.navigate('Categories')}
//                 focused = {focused === 'Categories'}
//                 activeTintColor = {'blue'}
//                 inactiveTintColor = {'black'}>
//               </DrawerItem>
//               <DrawerItem
//                 label = {'User Profiles'}
//                 onPress = {() => props.navigation.navigate('User Profiles')}
//                 focused = {focused === 'Home'}
//                 activeTintColor = {'blue'}
//                 inactiveTintColor = {'black'}>
//               </DrawerItem>

//             </DrawerContentScrollView>
//           )
//         }}
//       >
//         <Drawer.Screen name= {'Home'} component={Home}/>
//         <Drawer.Screen name= {'Categories'} component={BottomTab}/>
//         <Drawer.Screen name= {'User Profiles'} component={UserProfiles}/>
//       </Drawer.Navigator>
//     </SafeAreaView>
//   )
// }





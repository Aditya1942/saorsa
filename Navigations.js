
// import * as React from 'react';
// import { Text, View } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
// import Home from './Screens/DashBoard/Home';
// import Moodtracker from './Screens/Moodtracker';
// import Profile from './Screens/Profile';
// import Login from './Screens/Auth/Login';
// import Register from './Screens/Auth/Register';


// const Tab = createBottomTabNavigator();

// const Navigations = () => {
//     return (
//         <NavigationContainer>
//           <Tab.Navigator
//             screenOptions={({ route }) => ({
//               tabBarIcon: ({ focused, color, size }) => {
//                 let iconName;
    
//                 if (route.name === 'Home') {
//                   iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
//                 } else if (route.name === 'Settings') {
//                   iconName = focused ? 'ios-list-box' : 'ios-list';
//                 }

//                 return <Ionicons name={iconName} size={size} color={color} />;
//               },
//             })}
//             tabBarOptions={{
//               activeTintColor: 'tomato',
//               inactiveTintColor: 'gray',
//             }}
//           >
//             <Tab.Screen name="Profile" component={Profile} />
//             <Tab.Screen name="Welcome" component={Home} />
//             <Tab.Screen name="Moodtracker" component={Moodtracker} />
//           </Tab.Navigator>
//         </NavigationContainer>
//       );
// }

// export default Navigations



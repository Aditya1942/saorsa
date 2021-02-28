// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, Dimensions, Animated, } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { AntDesign } from '@expo/vector-icons';
// import MyTabBar from './MyTabBar';
// import { Entypo } from '@expo/vector-icons';


// function HomeScreen() {
//     return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <Text>Home!</Text>
//         </View>
//     );
// }

// function SettingsScreen() {
//     return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <Text>Settings!</Text>
//         </View>
//     );
// }

// const Tab = createBottomTabNavigator();


// const CustomeTabBar = () => {
//     return (
//         <NavigationContainer >
//             <Tab.Navigator tabBar={props => <MyTabBar {...props} />} initialRouteName={'Settings'} >
//                 <Tab.Screen initialParams={{ IconName: 'emoji-neutral',icontype:'Entypo' }} name="Home" component={HomeScreen} />
//                 {/* <Tab.Screen initialParams={{ component: <Entypo name={'emoji-neutral'} size={25} /> }} name="Home" component={HomeScreen} /> */}
//                 <Tab.Screen initialParams={{ IconName: 'setting',icontype:'AntDesign',iconSize:50,style:{paddingBottom:15,} }} tabBarIconName={'welcome'} name="Settings" component={SettingsScreen}  />
//                 {/* <Tab.Screen initialParams={{ component: <Entypo name={'emoji-neutral'} size={25} /> }}  name="Settings" component={SettingsScreen}  /> */}
//             </Tab.Navigator>
//         </NavigationContainer>
//     )
// }

// export default CustomeTabBar



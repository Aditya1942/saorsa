import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import CustomeTabBar from './CustomeTabBar';
import Navigations from './Navigations';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from './Screens/DashBoard/Home';
import Profile from './Screens/Profile';
import Moodtracker from './Screens/Moodtracker';
import DrawerScreen from './Components/DrawerScreen';
import MyTabBar from './MyTabBar';
import {colors} from './Constants';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent({navigation}) {
  return (
    <Button
      title="Go somewhere"
      onPress={() => {
        // Navigate using the `navigation` prop that you received
        navigation.navigate('SomeScreen');
      }}
    />
  );
}

const AppDrawer = () => {
  return (
    <Drawer.Navigator
      drawerPosition={'right'}
      drawerStyle={{backgroundColor: colors.primary, width: 200}}
      drawerContent={(props) => <DrawerScreen {...props} />}>
      <Stack.Screen name="CustomeTab" component={CustomeTab} />
    </Drawer.Navigator>
  );
};

const CustomeTab = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <MyTabBar {...props} />}
      initialRouteName={'Home'}>
      <Tab.Screen
        initialParams={{image: require('./assets/userprofile.png')}}
        name="Profile"
        component={Profile}
      />
      <Tab.Screen
        initialParams={{image: require('./assets/Home.png'), middle: true}}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        initialParams={{image: require('./assets/moodtracker.png')}}
        name="MoodTracker"
        component={Moodtracker}
      />
    </Tab.Navigator>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'AppDrawer'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="AppDrawer" component={AppDrawer} />
      <Stack.Screen name="CustomeTab" component={CustomeTab} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

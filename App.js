import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from './Screens/DashBoard/Home';
import Profile from './Screens/Profile/Profile';
import Moodtracker from './Screens/Moodtracker';
import MenuExample from './Screens/MenuExample';
import DrawerScreen from './Components/DrawerScreen';
import MyTabBar from './MyTabBar';
import {colors} from './Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Register from './Screens/Auth/Register';
import Login from './Screens/Auth/Login';
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
  const [loginToken, setLoginToken] = useState('0');
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@loginToken');
      if (value !== null) {
        setLoginToken(value);
        console.log('loginToken', value);
      }
    } catch (e) {
      setLoginToken('');
      console.log(e);
    }
  };
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@userInfo', jsonValue);
    } catch (e) {
      // saving error
    }
  };
  useEffect(() => {
    getData();
    fetch('http://192.168.1.172:4000/api/auth', {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'x-auth-token': loginToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        storeData(data);
        console.log(data);
      });
  }, [loginToken]);

  return (
    <Stack.Navigator
      initialRouteName={loginToken ? 'AppDrawer' : 'Register'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="AppDrawer" component={AppDrawer} />
      <Stack.Screen name="CustomeTab" component={CustomeTab} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
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

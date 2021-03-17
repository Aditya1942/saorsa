import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from './Screens/DashBoard/Home';
import Profile from './Screens/Profile/Profile';
import Moodtracker from './Screens/Moodtracker';
import DrawerScreen from './Components/DrawerScreen';
import MyTabBar from './MyTabBar';
import {colors} from './Constants';
import Register from './Screens/Auth/Register';
import Login from './Screens/Auth/Login';
import axios from './Screens/Auth/axios';
import {getUserAuthToken, storetUserProfileData} from './Screens/Auth/auth';
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

const CustomeTab = ({navigation}) => {
  const [loginToken, setloginToken] = useState('');
  getUserAuthToken().then((token) => {
    setloginToken(token);
    axios({
      method: 'get',
      url: '/api/profile/me',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    })
      .then(({data}) => {
        storetUserProfileData(data);
      })
      .catch((err) => {});
    console.log('token', token);
  });
  useEffect(() => {
    if (!loginToken) navigation.navigate('Login');
  }, [loginToken]);

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
  const [loginToken, setloginToken] = useState('lol');
  return (
    <Stack.Navigator
      initialRouteName={loginToken ? 'AppDrawer' : 'Login'}
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
// "proxy":"http://192.168.1.172:4000",

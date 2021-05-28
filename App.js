import React, {useEffect} from 'react';
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
import Step from './Screens/steps/Step';
import StepCourse from './Screens/steps/StepCourse';
import PlayerScreen from './Screens/steps/Player';
import {useFocusEffect} from '@react-navigation/core';
import {BackHandler, StyleSheet} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import VideoPlayerView from './Screens/steps/VideoPlayer';
import PaidCourse from './Screens/course/PaidCourse';
import PaidSubCourse from './Screens/course/PaidSubCourse';
import BottomMenu from './Screens/course/BottomMenu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StepFormData from './Screens/steps/StepFormData';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator();

// const requestCameraPermission = async () => {
//   if (Platform.OS === 'android') {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//         {
//           title: 'Camera Permission',
//           message: 'App needs camera permission',
//         },
//       );
//       // If CAMERA Permission is granted
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } catch (err) {
//       console.warn(err);
//       return false;
//     }
//   } else return true;
// };

// const requestExternalWritePermission = async () => {
//   if (Platform.OS === 'android') {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//         {
//           title: 'External Storage Write Permission',
//           message: 'App needs write permission',
//         },
//       );
//       // If WRITE_EXTERNAL_STORAGE Permission is granted
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } catch (err) {
//       console.warn(err);
//       alert('Write permission err', err);
//     }
//     return false;
//   } else return true;
// };

const AppDrawer = () => {
  return (
    <Drawer.Navigator
      drawerPosition={'right'}
      drawerStyle={styles.drawer}
      drawerContent={(props) => <DrawerScreen {...props} />}>
      <Stack.Screen name="CustomeTab" component={CustomeTab} />
      <Stack.Screen name="VideoPlayer" component={VideoPlayerView} />
    </Drawer.Navigator>
  );
};

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      initialRouteName={'Home'}
      screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Step" component={Step} />
      <HomeStack.Screen name="StepCourse" component={StepCourse} />
      <HomeStack.Screen name="PaidCourse" component={PaidCourse} />
      <HomeStack.Screen name="PaidSubCourse" component={PaidSubCourse} />
      <HomeStack.Screen name="StepFormData" component={StepFormData} />
      <HomeStack.Screen name="BottomMenu" component={BottomMenu} />
    </HomeStack.Navigator>
  );
};
const CustomeTab = ({navigation}) => {
  useFocusEffect(
    React.useCallback(() => {
      getUserAuthToken().then((token) => {
        if (!token) {
          navigation.replace('Login');
        }
        axios({
          method: 'get',
          url: '/api/profile/me',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        })
          .then(({data}) => {
            console.log('USER DATA', data);
            if (data?.msg === 'Token is not valid') {
              navigation.replace('Login');
              AsyncStorage.removeItem('@loginToken');
              AsyncStorage.removeItem('@userInfo');
              AsyncStorage.removeItem('@userSocialLoginInfo');
            }
            storetUserProfileData(data);
          })
          .catch((err) => {
            console.log(err);
          });
      });
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation]),
  );

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
        component={HomeStackScreen}
      />
      <Tab.Screen
        initialParams={{image: require('./assets/moodtracker.png')}}
        name="MoodTracker"
        component={Moodtracker}
      />
    </Tab.Navigator>
  );
};

const MainStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName={'AppDrawer'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="AppDrawer" component={AppDrawer} />
      <Stack.Screen name="CustomeTab" component={CustomeTab} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default function App() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '645452951437-4822qslv7eev4bnu4dfudv52kv1tfuak.apps.googleusercontent.com',
    });
  }, []);
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
  drawer: {backgroundColor: colors.primary, width: 200},
});
// "proxy":"http://192.168.1.172:4000",

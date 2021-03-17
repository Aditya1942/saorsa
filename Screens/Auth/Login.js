import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {sizes} from '../../Constants';
import {storeUserAuthToken, getUserAuthToken} from './auth';
import axios from './axios';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginToken, setLoginToken] = useState('');
  const handleLogin = () => {
    axios({
      method: 'post',
      url: '/api/auth',
      data: {
        email: email,
        password: password,
      },
      headers: {'Content-Type': 'application/json'},
    })
      .then(({data}) => {
        // make a profile for user
        if (data.errors) alert(data.errors[0].msg);
        else {
          console.log(data.token);
          axios({
            method: 'post',
            url: '/api/profile',
            data: {
              bio: 'addbio',
              coverImage: 'coverImage',
            },
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': data.token,
            },
          })
            .then((data2) => {
              console.log(data2.data);
              setLoginToken(data.token);
            })
            .catch((err) => {});
        }
      })
      .catch((err) => {});
  };
  useEffect(() => {
    if (loginToken) {
      storeUserAuthToken(loginToken);
      navigation.navigate('Home');
    }
  }, [loginToken]);
  useEffect(() => {
    getUserAuthToken()
      .then((token) => {
        if (token) {
          navigation.navigate('Home');
        }
      })
      .catch((err) => {});
  }, []);
  return (
    <View>
      <View style={loginStyle.body}>
        <Input
          placeholder="Email"
          value={email}
          textContentType={'emailAddress'}
          autoCompleteType={'email'}
          clearButtonMode={'while-editing'}
          returnKeyLabel={'next'}
          returnKeyType={'next'}
          keyboardType={'email-address'}
          onChangeText={(value) => setEmail(value)}
          leftIcon={<Icon name="envelope" size={24} color="black" />}
        />
        <Input
          placeholder="Password"
          value={password}
          textContentType={'password'}
          autoCompleteType={'password'}
          clearButtonMode={'while-editing'}
          returnKeyLabel={'done'}
          returnKeyType={'done'}
          onChangeText={(value) => setPassword(value)}
          secureTextEntry={true}
          leftIcon={<Icon name="lock" size={24} color="black" />}
        />
        <Button
          title="Login"
          onPress={handleLogin}
          iconRight
          icon={
            <Icon
              name="sign-in"
              style={{marginHorizontal: 10}}
              size={20}
              color="white"
            />
          }
        />
        <View style={loginStyle.userRegister}>
          <Text
            style={loginStyle.userRegisterText}
            onPress={() => {
              // Navigate using the `navigation` prop that you received
              console.log('register');
              navigation.navigate('Register');
            }}>
            Create an account
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Login;

const loginStyle = StyleSheet.create({
  body: {
    height: sizes.height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userRegister: {
    display: 'flex',
    width: sizes.width,
    padding: 10,
    justifyContent: 'flex-start',
  },
  userRegisterText: {
    fontSize: 15,
  },
});
// const getData = async () => {
//   try {
//     const value = await AsyncStorage.getItem('@loginToken');
//     if (value !== null) {
//       // value previously stored
//       setLoginToken(value);
//       navigation.closeDrawer();
//       navigation.navigate('AppDrawer');
//     }
//   } catch (e) {
//     // error reading value
//     console.log(e);
//   }
// };
// const storeToken = async (value) => {
//   try {
//     await AsyncStorage.setItem('@loginToken', value);
//     navigation.reset({
//       routes: [{name: 'AppDrawer'}],
//     });
//   } catch (e) {
//     // saving error
//     console.log(e);
//   }
// };

// const handleLogin = () => {
//   console.log(email, password);
//   async function postuserData(url = '', data = {}) {
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'x-auth-token': loginToken,
//       },
//       body: JSON.stringify(data),
//     });
//     return response.json();
//   }
//   postuserData('/api/auth', {
//     email: email,
//     password: password,
//   }).then((data) => {
//     console.log('loginToken', data);
//     if (data.errors) {
//       alert(data.errors[0].msg);
//     } else {
//       setLoginToken(data.token);
//       postuserData('/api/profile', {
//         bio: 'add bio',
//         coverImage: 'coverImage',
//       }).then((data2) => {
//         if (!data2.errors) {
//           console.log(data2);
//           storeToken(data.token);
//         }
//       });
//     }
//   });
// };

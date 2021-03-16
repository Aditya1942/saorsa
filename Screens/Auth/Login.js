import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {sizes} from '../../Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginToken, setLoginToken] = useState();

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@loginToken');
      if (value !== null) {
        // value previously stored
        setLoginToken(value);
        navigation.navigate('CustomeTab');
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };
  const storeToken = async (value) => {
    try {
      await AsyncStorage.setItem('@loginToken', value);
      navigation.navigate('CustomeTab');
    } catch (e) {
      // saving error
      console.log(e);
    }
  };
  const handleLogin = () => {
    console.log(email, password);
    async function postData(url = '', data = {}) {
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data),
      });
      return response.json();
    }
    postData('http://192.168.1.172:4000/api/auth', {
      email: email,
      password: password,
    }).then((data) => {
      setLoginToken(data.token);
      storeToken(data.token);
      console.log('loginToken', loginToken);
    });
  };
  useEffect(() => {
    // getData();
  }, []);
  return (
    <View>
      <View style={loginStyle.body}>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={(value) => setEmail(value)}
          leftIcon={<Icon name="envelope" size={24} color="black" />}
        />
        <Input
          placeholder="Password"
          value={password}
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

import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {sizes} from '../../Constants';
import {getUserAuthToken, storeUserAuthToken} from './auth';
import axios from './axios';

const Register = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [error, seterror] = useState('');
  const [loginToken, setLoginToken] = useState('');

  const handleRegister = () => {
    console.log(name, email, password);

    axios({
      method: 'post',
      url: 'http://10.0.2.2:4000/api/user',
      data: {name: name, email: email, password: password},
      headers: {'Content-Type': 'application/json'},
    })
      .then(({data}) => {
        console.log(data);
        if (data.errors) {
          // alert(data.errors[0].msg);
          seterror(data.errors[0].msg);
        } else {
          axios({
            method: 'post',
            url: '/api/profile',
            data: {
              bio: 'add bio',
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
      .catch((err) => {
        console.log('err=>', err);
      });
  };
  useEffect(() => {
    if (loginToken) {
      storeUserAuthToken(loginToken);
      navigation.goBack();
    }
  }, [loginToken]);
  useEffect(() => {
    getUserAuthToken()
      .then((token) => {
        if (token) {
          navigation.goBack();
        }
      })
      .catch((err) => {});
  }, []);
  return (
    <View>
      <View style={registerStyle.body}>
        <Text style={registerStyle.error}>{error}</Text>
        <Input
          placeholder="Full Name"
          value={name}
          onChangeText={(value) => setName(value)}
          leftIcon={<Icon name="user" size={24} color="black" />}
        />
        <Input
          value={email}
          placeholder="Email"
          onChangeText={(value) => setEmail(value)}
          leftIcon={<Icon name="envelope" size={24} color="black" />}
        />
        <Input
          value={password}
          placeholder="Password"
          onChangeText={(value) => setpassword(value)}
          secureTextEntry={true}
          leftIcon={<Icon name="lock" size={24} color="black" />}
        />
        <Button title={`Sign Up`} onPress={handleRegister} />
        <View style={registerStyle.userRegister}>
          <Text
            style={registerStyle.userRegisterText}
            onPress={() => {
              navigation.navigate('Login');
            }}>
            Already have an account
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Register;

const registerStyle = StyleSheet.create({
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
  error: {
    fontSize: 20,
    color: 'red',
  },
});

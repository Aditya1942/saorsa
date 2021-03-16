import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {sizes} from '../../Constants';

const Register = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [error, seterror] = useState('');

  const storeToken = async (value) => {
    try {
      await AsyncStorage.setItem('@loginToken', value);
      navigation.navigate('CustomeTab');
    } catch (e) {
      // saving error
      console.log(e);
    }
  };
  const handleRegister = () => {
    console.log(name, email, password);
    async function postNewUserData(url = '', data = {}) {
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data),
      });
      return response.json();
    }
    postNewUserData('http://192.168.1.172:4000/api/user', {
      name: name,
      email: email,
      password: password,
    }).then((data) => {
      if (data.errors) seterror(data.errors[0].msg);
      else storeToken(data.token);
    });
  };
  useEffect(() => {
    // Example POST method implementation:
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

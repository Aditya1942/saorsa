import React, {useEffect, useRef, useState} from 'react';
import {
  BackHandler,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors, sizes} from '../../Constants';
import {storeUserAuthToken, getUserAuthToken} from './auth';
import axios from './axios';
import {useFocusEffect} from '@react-navigation/core';
import {TextInput} from 'react-native-paper';
import {KeyboardAvoidingView} from 'react-native';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginToken, setLoginToken] = useState('');
  const [error, seterror] = useState('');

  const handleLogin = () => {
    console.log(email, password);
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
        if (data.errors) {
          seterror(data.errors[0].msg);
        } else {
          console.log(data.token);
          setLoginToken(data.token);
          storeUserAuthToken(data.token).then(() => {
            navigation.reset({
              routes: [{name: 'AppDrawer'}],
            });
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useFocusEffect(
    React.useCallback(() => {
      axios({
        method: 'get',
        url: 'https://mighty-bastion-04883.herokuapp.com/api/step',
      })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => console.log('err', err));
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );
  useEffect(() => {
    getUserAuthToken()
      .then((token) => {
        if (token) {
          navigation.reset({
            routes: [{name: 'AppDrawer'}],
          });
        }
      })
      .catch((err) => {});
  }, []);
  const passwordRef = useRef();
  return (
    <View style={loginStyle.container}>
      <View style={loginStyle.body}>
        <KeyboardAvoidingView behavior={'position'}>
          <View style={loginStyle.headerImageContainer}>
            <Image
              source={require('../../assets/logo.png')}
              style={{width: '100%', height: '100%'}}
              resizeMode={'cover'}
            />
          </View>
          <View style={loginStyle.title}>
            <Text style={loginStyle.titleHeading}>Welcome,</Text>
            <Text style={loginStyle.titleHeading2}>Sign in to continue</Text>
          </View>
          <View style={loginStyle.inputBody}>
            <Text style={loginStyle.error}>{error}</Text>
            <TextInput
              label="Email"
              mode="outlined"
              value={email}
              onChangeText={(text) => setEmail(text)}
              textContentType={'emailAddress'}
              autoCompleteType={'email'}
              clearButtonMode={'while-editing'}
              returnKeyLabel={'next'}
              returnKeyType={'next'}
              keyboardType={'email-address'}
              onSubmitEditing={() => {
                passwordRef.current.focus();
              }}
              style={{
                backgroundColor: colors.primary,
              }}
              theme={{
                colors: {
                  placeholder: 'white',
                  text: 'white',
                  primary: 'white',
                  underlineColor: 'transparent',
                  background: '#003489',
                },
              }}
            />
            <TextInput
              label="Password"
              mode="outlined"
              value={password}
              textContentType={'password'}
              autoCompleteType={'password'}
              clearButtonMode={'while-editing'}
              returnKeyLabel={'done'}
              returnKeyType={'done'}
              onChangeText={(value) => setPassword(value)}
              secureTextEntry={true}
              ref={passwordRef}
              onSubmitEditing={handleLogin}
              style={{
                backgroundColor: colors.primary,
                marginTop: 20,
              }}
              theme={{
                colors: {
                  placeholder: 'white',
                  text: 'white',
                  primary: 'white',
                  underlineColor: 'transparent',
                  background: '#003489',
                },
              }}
            />
            <View
              style={{
                width: sizes.width,
                justifyContent: 'flex-start',
                marginBottom: 40,
                paddingHorizontal: 90,
              }}>
              <TouchableOpacity style={{alignSelf: 'flex-end'}}>
                <Text style={{color: '#fff'}}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <Button
              title="Login"
              buttonStyle={{backgroundColor: colors.secondary}}
              containerStyle={{
                width: sizes.ITEM_WIDTH * 2.7,
                borderRadius: 10,
              }}
              onPress={handleLogin}
            />
            <Button
              title="CONNECT WITH FACEBOOK"
              titleStyle={{color: 'black'}}
              buttonStyle={{backgroundColor: '#fff'}}
              mode="outlined
            "
              containerStyle={{
                width: sizes.ITEM_WIDTH * 2.7,
                borderRadius: 10,
                marginTop: 20,
                color: 'black',
              }}
              onPress={() => {
                alert('Login with fb');
              }}
              icon={
                <Icon
                  name="facebook-square"
                  style={{paddingHorizontal: 10}}
                  size={24}
                  color={colors.primary}
                />
              }
            />
          </View>
        </KeyboardAvoidingView>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Register');
          }}
          style={loginStyle.userRegister}>
          <Text style={loginStyle.userRegisterText}>New Member? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const loginStyle = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  body: {},
  inputBody: {
    justifyContent: 'center',
    padding: 10,
    paddingHorizontal: 40,
  },
  userRegister: {
    display: 'flex',
    width: sizes.width,
    padding: 10,
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  },
  userRegisterText: {
    color: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    fontSize: 15,
  },
  headerImageContainer: {
    width: 120,
    height: 80,
    marginBottom: 10,
  },
  title: {
    padding: 25,
    marginBottom: 20,
  },
  titleHeading: {
    fontSize: 35,
    color: '#fff',
  },
  titleHeading2: {
    color: '#fff',
    fontSize: 20,
  },
  error: {
    fontSize: 20,
    color: 'red',
  },
});

{
  /* <Input
            placeholder="Email"
            value={email}
            onChangeText={(value) => setEmail(value)}
            inputStyle={{color: '#fff'}}
            leftIcon={<Icon name="envelope" size={24} color="white" />}
          /> */
}
{
  /* <Input
            placeholder="Password"
            value={password}
            textContentType={'password'}
            autoCompleteType={'password'}
            clearButtonMode={'while-editing'}
            returnKeyLabel={'done'}
            returnKeyType={'done'}
            onChangeText={(value) => setPassword(value)}
            secureTextEntry={true}
            inputStyle={{color: '#fff'}}
            leftIcon={<Icon name="lock" size={24} color="white" />}
          /> */
}

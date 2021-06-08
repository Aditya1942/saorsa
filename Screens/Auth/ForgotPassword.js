/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {colors, sizes} from '../../Constants';

import {TextInput} from 'react-native-paper';
import {KeyboardAvoidingView} from 'react-native';
import axios from './axios';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [error, seterror] = useState('');
  const [successMsg, setSuccess] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef();

  const handleForgetPassword = () => {
    console.log(email, password);
    if (email === '') {
      seterror('Please enter your email');
      setSuccess('');
    } else if (password === '') {
      seterror("New password can not be blank'");
      setSuccess('');
    } else {
      axios({
        method: 'post',
        url: '/api/user/forgot',
        data: {
          email: email,
          password: password,
        },
        headers: {'Content-Type': 'application/json'},
      }).then(async (response) => {
        // body of the function
        console.log(response.data);
        try {
          if (response.data === "Cannot read property 'email' of null") {
            seterror('Invalid email id');
            setSuccess('');
          } else if (response.data === 'Email Sent') {
            setSuccess('confirmation email sent to your email');
            seterror('');
          }
          console.log('successfully');
        } catch (e) {
          // saving error
          seterror('something went wrong please try again');
          setSuccess('');

          console.log('error', e);
          throw e;
        }
      });
    }
  };

  return (
    <View style={loginStyle.container}>
      <View style={loginStyle.body}>
        <View style={loginStyle.headerImageContainer}>
          <Image
            source={require('../../assets/logo.png')}
            style={loginStyle.logo}
            resizeMode={'cover'}
          />
        </View>
        <KeyboardAvoidingView behavior={'position'}>
          <View style={loginStyle.title}>
            <Text style={loginStyle.titleHeading}>Forget Password</Text>
            <Text style={loginStyle.titleHeading2}>
              Enter your registered email
            </Text>
          </View>
          <View style={loginStyle.inputBody}>
            {error !== '' && <Text style={loginStyle.error}>{error}</Text>}
            {successMsg !== '' && (
              <Text style={loginStyle.successMsg}>{successMsg}</Text>
            )}
            <TextInput
              label="Enter Your Email"
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
                marginBottom: 20,
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
              label="Enter New Password"
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
              onSubmitEditing={handleForgetPassword}
              style={{
                backgroundColor: colors.primary,
                marginBottom: 50,
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
            <Button
              title="Change Password"
              buttonStyle={{backgroundColor: colors.secondary}}
              containerStyle={loginStyle.loginBtn}
              onPress={handleForgetPassword}
            />
          </View>
        </KeyboardAvoidingView>
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

  headerImageContainer: {
    width: 120,
    height: 80,
    marginBottom: 10,
  },
  logo: {width: '100%', height: '100%'},
  title: {
    padding: 25,
    marginBottom: 10,
  },
  titleHeading: {
    fontSize: 35,
    color: '#fff',
  },
  titleHeading2: {
    color: '#fff',
    fontSize: 20,
    marginTop: 10,
  },
  error: {
    fontSize: 20,
    color: 'red',
    textTransform: 'capitalize',
    marginBottom: 30,
  },
  successMsg: {
    fontSize: 17,
    color: 'lightgreen',
    textTransform: 'capitalize',
    marginBottom: 30,
  },
  login: {
    width: sizes.ITEM_WIDTH * 2.7,
    borderRadius: 10,
  },
  socialLoginBtn: {
    width: sizes.ITEM_WIDTH * 2.7,
    borderRadius: 10,
    marginTop: 20,
    color: 'black',
  },
});

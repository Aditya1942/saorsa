/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {colors, sizes} from '../../Constants';

import {TextInput} from 'react-native-paper';
import {KeyboardAvoidingView} from 'react-native';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [error, seterror] = useState('');

  const handleForgetPassword = () => {
    console.log(email);
  };

  return (
    <View style={loginStyle.container}>
      <View style={loginStyle.body}>
        <KeyboardAvoidingView behavior={'position'}>
          <View style={loginStyle.headerImageContainer}>
            <Image
              source={require('../../assets/logo.png')}
              style={loginStyle.logo}
              resizeMode={'cover'}
            />
          </View>
          <View style={loginStyle.title}>
            <Text style={loginStyle.titleHeading}>Forget Password</Text>
            <Text style={loginStyle.titleHeading2}>
              Enter your registered email
            </Text>
          </View>
          <View style={loginStyle.inputBody}>
            <Text style={loginStyle.error}>{error}</Text>
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
              title="Forget Password"
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
    marginBottom: 20,
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

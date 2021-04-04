import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors, sizes} from '../../Constants';
import {getUserAuthToken, storeUserAuthToken} from './auth';
import axios from './axios';
import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
      url: '/api/user',
      data: {name: name, email: email, password: password},
      headers: {'Content-Type': 'application/json'},
    })
      .then((result) => {
        console.log(result);
        const {data} = result;
        if (data.errors) {
          seterror(data.errors[0].msg);
        } else {
          alert('Verification email is sent');
        }
      })
      .catch((err) => {
        console.log('err=>', err);
      });
  };
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
  const storeFbLogin = (fbData, email, name) => {
    axios({
      method: 'post',
      url: '/api/user/social',
      data: {
        name: name,
        email: email,
        confirmed: true,
      },
      headers: {'Content-Type': 'application/json'},
    }).then(async ({data}) => {
      // body of the function
      try {
        const jsonValue = JSON.stringify(fbData);
        await AsyncStorage.setItem('@userFbInfo', jsonValue);
        console.log('successfully');
        console.log(data);
        setLoginToken(data?.token);
        storeUserAuthToken(data?.token).then(() => {
          navigation.reset({
            routes: [{name: 'AppDrawer'}],
          });
        });
      } catch (e) {
        // saving error
        throw e;
      }
    });
  };

  const HandleFbLogin = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
          AccessToken.getCurrentAccessToken().then((data) => {
            let {accessToken} = data;
            console.log(data);
            let PROFILE_REQUEST_PARAMS = {
              fields: {
                string: 'name,email,profile_picture',
              },
            };
            const infoRequest = new GraphRequest(
              '/me?fields=email,name,picture',
              {
                accessToken: accessToken,
                parameters: {
                  fields: {
                    string: 'email,name,picture.height(480)',
                  },
                },
              },
              _responseInfoCallback,
            );
            // Start the graph request.
            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  const _responseInfoCallback = (error, result) => {
    if (error) {
      console.log(error);
    } else {
      // alert('Result Name: ' + result.name);
      console.log(result);
      storeFbLogin(result, result.email, result.name);
    }
  };

  const emailRef = useRef();
  const passwordRef = useRef();
  return (
    <View>
      <View style={registerStyle.body}>
        <KeyboardAvoidingView
          behavior={'position'}
          style={registerStyle.inputBody}>
          <View style={registerStyle.headerImageContainer}>
            <Image
              source={require('../../assets/logo.png')}
              style={{width: '100%', height: '100%'}}
              resizeMode={'cover'}
            />
          </View>
          <View style={registerStyle.title}>
            <Text style={registerStyle.titleHeading}>Create Account,</Text>
            <Text style={registerStyle.titleHeading2}>
              Start your Mental Health Journey
            </Text>
          </View>
          <Text style={registerStyle.error}>{error}</Text>
          <View style={{padding: 10, paddingHorizontal: 40}}>
            <TextInput
              value={name}
              onChangeText={(value) => setName(value)}
              label="Name"
              mode="outlined"
              textContentType={'name'}
              autoCompleteType={'name'}
              clearButtonMode={'while-editing'}
              returnKeyLabel={'next'}
              returnKeyType={'next'}
              onSubmitEditing={() => {
                emailRef.current.focus();
              }}
              style={{
                backgroundColor: colors.primary,
                marginTop: 0,
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
              label="Email"
              mode="outlined"
              value={email}
              onChangeText={(value) => setEmail(value)}
              textContentType={'emailAddress'}
              autoCompleteType={'email'}
              clearButtonMode={'while-editing'}
              returnKeyLabel={'next'}
              returnKeyType={'next'}
              keyboardType={'email-address'}
              ref={emailRef}
              onSubmitEditing={() => {
                passwordRef.current.focus();
              }}
              secureTextEntry={true}
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
            <TextInput
              label="Password"
              mode="outlined"
              value={password}
              onChangeText={(value) => setpassword(value)}
              textContentType={'password'}
              autoCompleteType={'password'}
              clearButtonMode={'while-editing'}
              returnKeyLabel={'done'}
              returnKeyType={'done'}
              secureTextEntry={true}
              ref={passwordRef}
              onSubmitEditing={handleRegister}
              style={{
                backgroundColor: colors.primary,
                marginTop: 20,
                marginBottom: 40,
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
              buttonStyle={{backgroundColor: colors.secondary}}
              containerStyle={{
                width: sizes.ITEM_WIDTH * 2.7,
                borderRadius: 10,
              }}
              title={`Sign Up`}
              onPress={handleRegister}
            />
            {/* <Button
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
                HandleFbLogin();
              }}
              icon={
                <Icon
                  name="facebook-square"
                  style={{paddingHorizontal: 10}}
                  size={24}
                  color={colors.primary}
                />
              }
            /> */}
          </View>
        </KeyboardAvoidingView>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}
          style={registerStyle.userRegister}>
          <Text style={registerStyle.userRegisterText}>
            Already have an account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;

const registerStyle = StyleSheet.create({
  body: {
    height: sizes.height,
    backgroundColor: colors.primary,
  },
  userRegister: {
    display: 'flex',
    width: sizes.width,
    padding: 10,
    marginTop: 50,
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
    marginBottom: 0,
  },
  titleHeading: {
    fontSize: 35,
    color: '#fff',
  },
  titleHeading2: {
    color: '#fff',
    fontSize: 20,
  },
  inputBody: {
    justifyContent: 'center',
  },
  error: {
    fontSize: 20,
    color: 'red',
  },
});

// <Input
// placeholder="Full Name"
// value={name}
// onChangeText={(value) => setName(value)}
// leftIcon={<Icon name="user" size={24} color="black" />}
// />
// <Input
// placeholder="Email"
// value={email}
// onChangeText={(value) => setEmail(value)}
// leftIcon={<Icon name="envelope" size={24} color="black" />}
// />
// <Input
// placeholder="Password"
// value={password}
// onChangeText={(value) => setpassword(value)}
// secureTextEntry={true}
// leftIcon={<Icon name="lock" size={24} color="black" />}
// />

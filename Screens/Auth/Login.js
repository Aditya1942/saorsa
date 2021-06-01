/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  BackHandler,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors, sizes} from '../../Constants';
import {
  storeUserAuthToken,
  getUserAuthToken,
  storetuserSocialLoginInfo,
} from './auth';
import axios from './axios';
import {useFocusEffect} from '@react-navigation/core';
import {TextInput} from 'react-native-paper';
import {KeyboardAvoidingView} from 'react-native';
import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, seterror] = useState('');
  const passwordRef = useRef();
  // login with google
  async function onGoogleButtonPress() {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }
  // add login details in database from social login
  const storeSoclialLogin = (loginData, socialemail, socialname, avatar) => {
    axios({
      method: 'post',
      url: '/api/user/social',
      data: {
        name: socialname,
        email: socialemail,
        confirmed: true,
      },
      headers: {'Content-Type': 'application/json'},
    }).then(async (response) => {
      // body of the function
      console.log(response);
      let {data} = response;
      try {
        storetuserSocialLoginInfo(loginData);
        console.log('successfully');
        console.log(data);
        storeUserAuthToken(data?.token).then(() => {
          navigation.reset({
            routes: [{name: 'AppDrawer'}],
          });
        });
      } catch (e) {
        // saving error
        console.log('error', e);
        throw e;
      }
    });
  };
  // login with email and password
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
        } else if (!data.token) {
          axios({
            method: 'post',
            url: '/api/user/resend',
            data: {
              email: email,
              password: password,
            },
            headers: {'Content-Type': 'application/json'},
          }).then(() => {
            seterror('This email is not verified. Please Check your email');
          });
        } else if (data.token) {
          AsyncStorage.removeItem('@userSocialLoginInfo');

          storeUserAuthToken(data?.token).then(() => {
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
  // login with facebook
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
  // get data from after login facebook
  function _responseInfoCallback(err, result) {
    if (err) {
      console.log(error);
    } else {
      // alert('Result Name: ' + result.name);
      console.log(result);
      console.log(result.picture.url);
      storeSoclialLogin(result, result.email, result.name, result.picture.url);
    }
  }
  useFocusEffect(
    React.useCallback(() => {
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
      .catch((err) => {
        console.log(err);
      });
  }, [navigation]);
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
              style={loginStyle.passwordInput}
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
            <View style={loginStyle.forgotpasswords}>
              <TouchableOpacity
                style={{alignSelf: 'flex-end'}}
                onPress={() => {
                  navigation.navigate('forgotPassword');
                }}>
                <Text style={{color: '#fff'}}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            {Platform.OS === 'android' && (
              <>
                <Button
                  title="Login"
                  buttonStyle={{backgroundColor: colors.secondary}}
                  containerStyle={loginStyle.loginBtn}
                  onPress={handleLogin}
                />

                <Button
                  onPress={() => {
                    HandleFbLogin();
                  }}
                  title="CONNECT WITH FACEBOOK"
                  titleStyle={{color: 'black'}}
                  buttonStyle={{backgroundColor: '#fff'}}
                  mode="outlined
              "
                  containerStyle={loginStyle.socialLoginBtn}
                  icon={
                    <Icon
                      name="facebook-square"
                      style={{paddingHorizontal: 10}}
                      size={24}
                      color={colors.primary}
                    />
                  }
                />

                <Button
                  onPress={() => {
                    onGoogleButtonPress().then((data) => {
                      const {additionalUserInfo} = data;
                      const gemail = additionalUserInfo.profile.email;
                      const gname = additionalUserInfo.profile.name;
                      const gpicture = additionalUserInfo.profile.picture.slice(
                        0,
                        -6,
                      );
                      console.log('SIGN IN WITH GOOGLE', data);
                      console.log(
                        additionalUserInfo.profile.picture.slice(0, -6),
                      );
                      storeSoclialLogin(data, gemail, gname, gpicture);
                    });
                  }}
                  title="SIGN IN WITH GOOGLE"
                  titleStyle={{color: 'black'}}
                  buttonStyle={{backgroundColor: '#fff'}}
                  mode="outlined
              "
                  containerStyle={loginStyle.socialLoginBtn}
                  icon={
                    <Icon
                      name="google"
                      style={{paddingHorizontal: 10}}
                      size={24}
                      color={'#ea4335'}
                    />
                  }
                />
              </>
            )}
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
    marginTop: 30,
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
  },
  error: {
    fontSize: 20,
    color: 'red',
  },
  passwordInput: {
    backgroundColor: colors.primary,
    marginTop: 20,
  },
  forgotpasswords: {
    width: sizes.width,
    justifyContent: 'flex-start',
    marginBottom: 40,
    paddingHorizontal: 90,
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

/* <Input
            placeholder="Email"
            value={email}
            onChangeText={(value) => setEmail(value)}
            inputStyle={{color: '#fff'}}
            leftIcon={<Icon name="envelope" size={24} color="white" />}
          /> */

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

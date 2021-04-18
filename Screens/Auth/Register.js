import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Button} from 'react-native-elements';
import {TextInput} from 'react-native-paper';
import {colors, sizes} from '../../Constants';
import {getUserAuthToken} from './auth';
import axios from './axios';
const Register = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [error, seterror] = useState('');
  // const [loginToken, setLoginToken] = useState('');

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
          Alert.alert('Verification email is sent');
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
      .catch((err) => {
        console.log(err);
      });
  }, [navigation]);
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
              style={registerStyle.logo}
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
          <View style={registerStyle.form}>
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
              style={registerStyle.nameInput}
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
              style={registerStyle.emailInput}
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
              style={registerStyle.passwordInput}
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
              containerStyle={registerStyle.signup}
              title={'Sign Up'}
              onPress={handleRegister}
            />
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
    marginBottom: 20,
  },
  logo: {width: '100%', height: '100%'},
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
  form: {padding: 10, paddingHorizontal: 40},
  signup: {
    width: sizes.ITEM_WIDTH * 2.7,
    borderRadius: 10,
  },
  nameInput: {
    backgroundColor: colors.primary,
    marginTop: 0,
  },
  emailInput: {
    backgroundColor: colors.primary,
    marginTop: 20,
  },
  passwordInput: {
    backgroundColor: colors.primary,
    marginTop: 20,
    marginBottom: 40,
  },
});

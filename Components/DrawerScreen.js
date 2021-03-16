import React from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DrawerScreen({navigation}) {
  const logOut = async () => {
    await AsyncStorage.removeItem('@loginToken');
    navigation.navigate('Login');
  };
  return (
    <View style={DrawerStyle.drawerItem}>
      <View style={DrawerStyle.drawerHeader}>
        <Text style={DrawerStyle.heading}>Your Soarsa</Text>
        <TouchableOpacity
          style={DrawerStyle.close}
          activeOpacity={0.5}
          onPress={() => navigation.closeDrawer()}>
          <Image
            source={require('../assets/hamburger-vertical.png')}
            style={{width: 50, height: 50}}
          />
        </TouchableOpacity>
      </View>
      <View style={DrawerStyle.drawerBody}>
        <TouchableOpacity>
          <Text style={DrawerStyle.bodyText}>Terms of Use</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={DrawerStyle.bodyText}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={DrawerStyle.bodyText}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={DrawerStyle.bodyText}>Contact Us</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={logOut}>
          <Text style={DrawerStyle.bodyText}>Log Out</Text>
        </TouchableOpacity>
      </View>
      <View style={DrawerStyle.drawerFooter}></View>
      <View style={{alignItems: 'center'}}>
        <Text style={DrawerStyle.footerText}>Connect witsh us</Text>
      </View>
      <TouchableOpacity activeOpacity={0.5} style={DrawerStyle.iconView}>
        <Image
          source={require('../assets/facebook.png')}
          style={{width: 30, height: 60, ...DrawerStyle.footerIcon}}
        />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.5} style={DrawerStyle.iconView}>
        <Image
          source={require('../assets/instagram.png')}
          style={{width: 50, height: 50, ...DrawerStyle.footerIcon}}
        />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.5} style={DrawerStyle.iconView}>
        <Image
          source={require('../assets/twitter.png')}
          style={{width: 50, height: 40, ...DrawerStyle.footerIcon}}
        />
      </TouchableOpacity>
    </View>
  );
}

const DrawerStyle = StyleSheet.create({
  drawerItem: {
    flex: 1,
  },
  drawerHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  heading: {
    color: '#fff',
    fontSize: 19,
    padding: 5,
    paddingLeft: 10,
    paddingTop: 30,
  },
  close: {
    padding: 10,
  },
  drawerBody: {
    marginTop: 50,
  },
  bodyText: {
    color: '#fff',
    fontSize: 17,
    paddingLeft: 20,
    paddingBottom: 30,
  },
  drawerFooter: {
    marginTop: 100,
  },
  footerText: {
    color: '#fff',
    fontSize: 17,
    alignItems: 'center',
  },
  footerIcon: {
    marginLeft: 30,
    marginTop: 20,
  },
  iconView: {},
});

import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
//import { Ionicons } from '@expo/vector-icons';

const {width, height} = Dimensions.get('window');
const Header = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('./../assets/logo.png')}
          style={{width: '100%', height: '100%'}}
          resizeMode={'cover'}
        />
      </View>
      {/* <Ionicons name="ios-menu-outline" size={30} color="#fff" onPress={onPress} /> */}

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => navigation.openDrawer()}>
        <Image
          source={require('../assets/hamburger.png')}
          style={{width: 50, height: 50}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageContainer: {
    width: 80,
    height: 40,
  },
  openDrawerBtn: {},
});

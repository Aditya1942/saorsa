import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../Components/Header';
import {colors, sizes, MoodImgs} from '../Constants';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
  MenuProvider,
} from 'react-native-popup-menu';
import FastImage from 'react-native-fast-image';
import {BackHandler} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MoodIcons = ({id, img, name, navigation, loginToken}) => {
  const {ContextMenu, SlideInMenu, Popover} = renderers;
  const [openMenu, setopenMenu] = useState(false);
  const backActionHandler = () => {
    if (!openMenu) {
      BackHandler.removeEventListener('hardwareBackPress', backActionHandler);
      navigation.goBack();
    } else {
      setopenMenu(false);
    }
    return true;
  };
  async function postMoodData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': loginToken,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  loginToken;

  useEffect(() => {
    // Add event listener for hardware back button press on Android
    BackHandler.addEventListener('hardwareBackPress', backActionHandler);

    return () =>
      // clear/remove event listener
      BackHandler.removeEventListener('hardwareBackPress', backActionHandler);
  }, [openMenu]);
  return (
    <Menu
      renderer={ContextMenu}
      opened={openMenu}
      onBackdropPress={() => setopenMenu(false)}
      onSelect={(value) => {
        // postData('http://192.168.1.172:4000/api/auth', {
        //   email: 'parmaraditya1942@gmail.com',
        //   password: 'aditya123',
        // }).then((data) => {
        //   setopenMenu(false);
        // });
        alert(`Selected: ${name} => ${value}`);
      }}>
      <MenuTrigger
        children={
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              setopenMenu(true);
            }}>
            <FastImage source={img} style={MoodTrackerStyle.MoodImg} />
          </TouchableOpacity>
        }
      />
      <MenuOptions customStyles={optionsStyles}>
        <MenuOption
          value={1}
          text="A Little"
          customStyles={{
            OptionTouchableComponent: MoodOptionCustomStyle,
            optionTouchable: touchableHighlightProps,
          }}
        />
        <MenuOption
          value={2}
          text="Somewhat"
          customStyles={{
            OptionTouchableComponent: MoodOptionCustomStyle,
            optionTouchable: touchableHighlightProps,
          }}
        />
        <MenuOption
          value={3}
          text="Very"
          customStyles={{
            OptionTouchableComponent: MoodOptionCustomStyle,
            optionTouchable: touchableHighlightProps,
          }}
        />
        <MenuOption
          value={4}
          text="Extremely"
          customStyles={{
            OptionTouchableComponent: MoodOptionCustomStyle,
            optionTouchable: touchableHighlightProps,
          }}
        />
      </MenuOptions>
    </Menu>
  );
};
const MoodOptionCustomStyle = (props) => {
  return (
    <View>
      <TouchableHighlight style={{borderRadius: 20}} {...props}>
        {props.children}
      </TouchableHighlight>
    </View>
  );
};
const Moodtracker = ({navigation}) => {
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@loginToken');
      if (value !== null) {
        // value previously stored
        console.log('loginToken', value);
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <MenuProvider customStyles={menuProviderStyles}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.primary,
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}>
        <Header navigation={navigation} />
        <ScrollView
          alwaysBounceVertical={true}
          showsVerticalScrollIndicator={false}
          style={{marginTop: 5, marginBottom: 50}}>
          <Text style={MoodTrackerStyle.headerTitle}>Mood Checker</Text>
          <Text style={MoodTrackerStyle.headerSubTitle}>
            How are you {'\n'}Feeling today?
          </Text>
          <ScrollView style={{marginTop: 30, marginBottom: 30}}>
            {MoodImgs.map((MoodRow, index) => (
              <View key={index} style={MoodTrackerStyle.container}>
                {MoodRow.map((MoodImgObject) => (
                  <MoodIcons
                    key={MoodImgObject.id}
                    id={MoodImgObject.id}
                    img={MoodImgObject.img}
                    name={MoodImgObject.name}
                    navigation={navigation}
                  />
                ))}
              </View>
            ))}
            <TouchableOpacity activeOpacity={0.5}>
              <View style={MoodTrackerStyle.moodChart}>
                <View style={MoodTrackerStyle.MoodInfoMain}>
                  <Text style={MoodTrackerStyle.ChartInfoHeading}>
                    Mood Chart
                  </Text>
                  <View>
                    <Text style={MoodTrackerStyle.MoodInfo}>
                      HAPPY 23rd Feb 1:28pm
                    </Text>
                    <Text style={MoodTrackerStyle.MoodInfo}>
                      ANGRY 13th Feb 4:30pm
                    </Text>
                  </View>
                </View>
                <View style={MoodTrackerStyle.MoodInfoChart}>
                  <Text>Chart</Text>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </ScrollView>
      </SafeAreaView>
    </MenuProvider>
  );
};

export default Moodtracker;

const MoodTrackerStyle = StyleSheet.create({
  // Mood Chart And information
  headerTitle: {
    fontSize: sizes.h1,
    color: '#fff',
    paddingTop: 10,
    fontFamily: 'AvenirLTStd-Black',
  },
  headerSubTitle: {
    fontSize: sizes.h1,
    color: '#fff',
    paddingTop: 30,
    fontFamily: 'AvenirLTStd-Black',
  },
  ChartInfoHeading: {
    padding: 10,
    fontSize: 15,
    fontWeight: 'bold',
  },
  MoodInfo: {
    marginBottom: 5,
    marginLeft: 10,
    fontSize: 13,
  },
  MoodInfoMain: {
    flex: 0.6,
  },
  MoodInfoChart: {
    flex: 0.4,
  },
  moodChart: {
    height: 100,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  // Mood Icons
  MoodMenu: {
    backgroundColor: 'rgba( 9, 56, 110, 0.8 )',
    marginLeft: 100,
  },
  MoodMenuLeft: {
    backgroundColor: 'rgba( 9, 56, 110, 0.8 )',
    marginTop: 100,
  },
  MoodMenuItem: {
    color: '#fff',
    fontSize: 20,
  },
  MoodMenuItemStyle: {},
  MoodImg: {
    width: 100,
    height: 100,
    margin: 5,
    // backgroundColor: 'red',
    // marginRight: sizes.SPACING,
    borderRadius: 10,
    // overflow: 'hidden',
  },
  // Main Container
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  backdrop: {
    backgroundColor: 'black',
    opacity: 0.5,
  },
});

const optionsStyles = {
  optionsContainer: {
    backgroundColor: 'rgba(9,56,110,0.8)',
    width: 140,
  },
  optionText: {
    color: '#fff',
    fontSize: 20,
    borderRadius: 20,
  },
};
const touchableHighlightProps = {
  activeOpacity: 0.5,
  underlayColor: colors.secondary,
  borderRadius: 20,
};
const menuProviderStyles = {
  backdrop: MoodTrackerStyle.backdrop,
};

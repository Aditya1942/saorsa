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
import {getUserAuthToken, getUserProfileData} from './Auth/auth';
import axios from './Auth/axios';
const MoodIcons = ({id, img, name, navigation, loginToken, update}) => {
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

  const handleUpdateMoodStatus = (mood, rating) => {
    axios({
      method: 'post',
      url: '/api/mood/new',
      data: {
        mood: mood,
        rating: rating,
        moodImage: `${mood} image`,
      },
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': loginToken,
      },
    }).then(({data}) => {
      if (data.errors) {
        alert(data.errors[0].msg);
      } else {
        console.log('data', data);
        update();
        // alert(data);
      }
    });
    console.log(mood, rating, loginToken);
    setopenMenu(false);
  };

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
        handleUpdateMoodStatus(name, value);
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
  const [loginToken, setLoginToken] = useState('');
  const [MoodHistory, setMoodHistory] = useState([]);
  const [triggerMoodUpdateFromMain, setTriggerMoodUpdateFromMain] = useState(
    '',
  );
  const setTriggerMoodUpdateFromMainFun = async () => {
    await axios({
      method: 'get',
      url: 'api/mood/all',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': loginToken,
      },
    }).then(({data}) => {
      function formatDate(date) {
        let day = date.getDate();
        if (day === 1) {
          day = day + 'st';
        } else if (day === 2) {
          day = day + 'nd';
        } else if (day === 3) {
          day = day + 'rd';
        } else {
          day = day + 'th';
        }
        var month_names_short = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ];

        const options = {month: 'short'};

        let month = month_names_short[date.getMonth()];
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ampm;
        return day + ' ' + month + ' ' + strTime;
      }
      console.log('data', data);
      var moodDateAndTime = new Array();
      try {
        data.map((m) => {
          var dateObject = new Date(m.date);
          let dateAndTime = formatDate(dateObject);
          let moodDateAndTimeObject = {
            mood: m.mood.toUpperCase(),
            date: dateAndTime,
          };
          moodDateAndTime.push(moodDateAndTimeObject);
          console.log('moodDateAndTimeObject', moodDateAndTime);
        });
      } catch (error) {
        console.log('error', error);
      }
      setTriggerMoodUpdateFromMain('0');
      console.log('MoodHistory', MoodHistory);
      setMoodHistory(moodDateAndTime);
    });
  };

  useEffect(() => {
    getUserAuthToken().then((token) => {
      setLoginToken(token);
      console.log('loginToken', loginToken);
      setTriggerMoodUpdateFromMainFun();
    });
  }, [loginToken]);
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
                    loginToken={loginToken}
                    update={setTriggerMoodUpdateFromMainFun}
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
                    {MoodHistory.map((m) => (
                      <Text key={m.date} style={MoodTrackerStyle.MoodInfo}>
                        {`${m.mood} ${m.date}`}
                      </Text>
                    ))}
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

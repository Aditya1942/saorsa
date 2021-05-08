import React, {useCallback, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
  MenuProvider,
} from 'react-native-popup-menu';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../Components/Header';
import {colors, sizes, MoodImgs} from '../Constants';
import FastImage from 'react-native-fast-image';
import {BackHandler} from 'react-native';
import {getUserAuthToken} from './Auth/auth';
import axios from './Auth/axios';
import {useFocusEffect} from '@react-navigation/core';

const MoodIcons = ({id, img, name, score, navigation, loginToken, update}) => {
  const {ContextMenu} = renderers;
  const [openMenu, setopenMenu] = useState(false);
  // backpress
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (openMenu) {
          setopenMenu(false);
        } else if (navigation.canGoBack()) {
          navigation.goBack();
        } else {
          navigation.reset({
            routes: [{name: 'Home'}],
          });
        }
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation, openMenu]),
  );
  // this function will run when user add new mood
  const handleUpdateMoodStatus = (mood, rating, Score, id) => {
    let score = Score;
    if (id <= 6) {
      switch (rating) {
        case 4:
          score -= 0;
          break;
        case 3:
          score -= 1;
          break;
        case 2:
          score -= 2;
          break;
        case 1:
          score -= 3;
          break;

        default:
          break;
      }
    } else {
      score -= rating;
    }
    console.log('score', score, id);
    axios({
      method: 'post',
      url: '/api/mood/new',
      data: {
        mood: mood,
        rating: rating,
        score: score,
        moodImage: `${mood} image`,
      },
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': loginToken,
      },
    })
      .then(({data}) => {
        if (data.errors) {
          Alert.alert(data.errors[0].msg);
        } else {
          // this update fun will send update req to parent component
          update();
        }
      })
      .catch((err) => {});
    setopenMenu(false);
  };

  return (
    <Menu
      renderer={ContextMenu}
      opened={openMenu}
      onBackdropPress={() => setopenMenu(false)}
      onSelect={(value) => {
        try {
          handleUpdateMoodStatus(name, value, score, id);
        } catch (error) {}
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

  const setTriggerMoodUpdateFromMainFun = useCallback(async () => {
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
    await axios({
      method: 'get',
      url: 'api/mood/all',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': loginToken,
      },
    }).then(({data}) => {
      // format date
      console.log('MOOD HISTORRY', data);

      var moodDateAndTime = new Array(1);
      try {
        // add only last two mood history
        for (let i = 1; i < 3; i++) {
          var dateObject = new Date(data[data.length - i].date);
          // format date according
          let dateAndTime = formatDate(dateObject);
          // date object
          let moodDateAndTimeObject = {
            id: data[data.length - i]._id,
            moodType: data[data.length - i].mood.toUpperCase(),
            rating: data[data.length - i].rating,
            dateAndTime: dateAndTime,
            date: data[data.length - i].date,
          };
          moodDateAndTime.push(moodDateAndTimeObject);
          console.log('moodDateAndTimeObject', moodDateAndTime);
        }
      } catch (error) {}
      setTriggerMoodUpdateFromMain('0');
      setMoodHistory(moodDateAndTime);
    });
  }, [loginToken]);
  useEffect(() => {
    getUserAuthToken().then((token) => {
      setLoginToken(token);
      setTriggerMoodUpdateFromMainFun();
    });
  }, [loginToken, setTriggerMoodUpdateFromMainFun]);
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
                    score={MoodImgObject.score}
                    navigation={navigation}
                    loginToken={loginToken}
                    update={setTriggerMoodUpdateFromMainFun}
                  />
                ))}
              </View>
            ))}
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                navigation.navigate('Profile');
              }}>
              <View style={MoodTrackerStyle.moodChart}>
                <View style={MoodTrackerStyle.MoodInfoMain}>
                  <Text style={MoodTrackerStyle.ChartInfoHeading}>
                    Mood Chart
                  </Text>
                  <View>
                    {MoodHistory.map((m) => (
                      <Text key={m.id} style={MoodTrackerStyle.MoodInfo}>
                        {`${m.moodType} ${m.dateAndTime}`}
                      </Text>
                    ))}
                  </View>
                </View>
                <View style={MoodTrackerStyle.MoodInfoChart}>
                  {/* <Text>Chart</Text> */}
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
    overflow: 'hidden',
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

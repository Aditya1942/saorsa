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

const MoodIcons = ({id, img, name, navigation}) => {
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
        alert(`Selected: ${name} => ${value}`);
        setopenMenu(false);
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
          value={'A Little'}
          text="A Little"
          customStyles={{
            OptionTouchableComponent: MoodOptionCustomStyle,
            optionTouchable: touchableHighlightProps,
          }}
        />
        <MenuOption
          value={'Somewhat'}
          text="Somewhat"
          customStyles={{
            OptionTouchableComponent: MoodOptionCustomStyle,
            optionTouchable: touchableHighlightProps,
          }}
        />
        <MenuOption
          value={'Very'}
          text="Very"
          customStyles={{
            OptionTouchableComponent: MoodOptionCustomStyle,
            optionTouchable: touchableHighlightProps,
          }}
        />
        <MenuOption
          value={'Extremely'}
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
  const {ContextMenu, SlideInMenu, Popover} = renderers;

  console.log(MoodImgs);
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
          showsVerticalScrollIndicator={false}
          style={{marginTop: 5, marginBottom: 50}}>
          <Text
            // onPress={() => {
            //   navigation.navigate('Menu');
            // }}
            style={{
              fontSize: sizes.h1,
              color: '#fff',
              paddingTop: 10,
              fontFamily: 'AvenirLTStd-Black',
            }}>
            Mood Checker
          </Text>
          <Text
            style={{
              fontSize: sizes.h1,
              color: '#fff',
              paddingTop: 30,
              fontFamily: 'AvenirLTStd-Black',
            }}>
            How are you {'\n'}Feeling today?
          </Text>
          <ScrollView style={{marginTop: 30, marginBottom: 30}}>
            {MoodImgs.map((MoodRow) => (
              <View style={MoodTrackerStyle.container}>
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

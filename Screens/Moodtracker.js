import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
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
} from 'react-native-popup-menu';
import FastImage from 'react-native-fast-image';

const MoodIcons = ({img}) => {
  const {ContextMenu, SlideInMenu, Popover} = renderers;
  const [openMenu, setopenMenu] = useState(false);
  return (
    <Menu
      renderer={Popover}
      opened={openMenu}
      onBackdropPress={() => setopenMenu(false)}
      onSelect={(value) => alert(`Selected: ${value}`)}>
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
      <MenuOptions>
        <MenuOption value={'A Little'} text="A Little" />
        <MenuOption value={'Somewhat'} text="Somewhat" />
        <MenuOption value={'Very'} text="Very" />
        <MenuOption value={'Extremely'} text="Extremely" />
      </MenuOptions>
    </Menu>
  );
};

const Moodtracker = ({navigation}) => {
  const {ContextMenu, SlideInMenu, Popover} = renderers;

  console.log(MoodImgs);
  return (
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
        <Menu
          renderer={SlideInMenu}
          onSelect={(value) => alert(`Selected: ${value}`)}>
          <MenuTrigger text="Select option" />
          <MenuOptions optionsContainerStyle={{padding: 20}}>
            <MenuOption value={'A Little'} text="A Little" />
            <MenuOption value={'Somewhat'} text="Somewhat" />
            <MenuOption value={'Very'} text="Very" />
            <MenuOption value={'Extremely'} text="Extremely" />
          </MenuOptions>
        </Menu>
        <ScrollView style={{marginTop: 30, marginBottom: 30}}>
          {MoodImgs.map((MoodRow) => (
            <View style={MoodTrackerStyle.container}>
              {MoodRow.map((MoodImgObject) => (
                <MoodIcons img={MoodImgObject.img} />
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
});

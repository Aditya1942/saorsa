import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
//import { AntDesign, Entypo, FontAwesome, FontAwesome5, Ionicons, SimpleLineIcons } from "@expo/vector-icons";

export const BottomMenuItem = ({isCurrent, label, style, image, middle}) => {
  return (
    <View style={{...BottomMenuItemStyle.main, style}}>
      <View
        style={
          middle === true
            ? BottomMenuItemStyle.iconstyleMiddle
            : BottomMenuItemStyle.iconstyle
        }>
        <Image
          source={image}
          style={
            middle ? BottomMenuItemStyle.imgMiddle : BottomMenuItemStyle.img
          }
        />
      </View>
      <Text
        style={
          isCurrent
            ? BottomMenuItemStyle.textStyleActive
            : BottomMenuItemStyle.textStyle
        }>
        {label}
      </Text>
    </View>
  );
};

const BottomMenuItemStyle = StyleSheet.create({
  iconstyle: {
    backgroundColor: '#496AD1',
    borderRadius: 100,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 3,
  },
  iconstyleMiddle: {
    backgroundColor: '#496AD1',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    height: 55,
    width: 55,
    top: -20,
  },
  textStyle: {
    fontSize: 10,
    position: 'absolute',
    bottom: 8,
    color: 'gray',
  },
  textStyleActive: {
    fontSize: 10,
    position: 'absolute',
    bottom: 8,
    color: 'blue',
  },
  main: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 15,
  },
  img: {width: 50, height: 50},
  imgMiddle: {width: 70, height: 70},
});

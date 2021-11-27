import React from 'react';
import {
  StyleSheet,

  Dimensions,
  TouchableOpacity,
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import FastImage from 'react-native-fast-image';
import { sizes } from '../../Constants';
// import { Fontisto } from '@expo/vector-icons';
const { height } = Dimensions.get('window');

const Courseslist = ({ image, title, navigation, onPress, componentName }) => {
  return (
    <TouchableOpacity
      style={styles.courseItems}
      onPress={() => {
        if (onPress) {
          navigation.navigate('PaidCourse', {
            CourseName: title,
            componentName: componentName,
            image: image,
          });
        }
        console.log(onPress);
      }}>
      <AutoHeightImage width={350} source={image} style={styles.courseImg} />
      {/* <View style={styles.captions}>
        <Text
          style={[
            styles.title,
            {
              fontSize: sizes.h2,
              color: colors.primary,
              fontFamily: 'AvenirLTStd-Black',
            },
          ]}>
          {title}
        </Text>
        <View style={{borderBottomColor: 'blue', borderBottomWidth: 1}}>
          <Text style={{color: '#fff', fontFamily: 'AvenirLTStd-Black'}}>
            START YOUR FREE INTRO NOW
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: '#fff', fontFamily: 'AvenirLTStd-Black'}}>
            MUSIC
          </Text>
          <Image
            source={require('../../assets/lock.png')}
            style={{width: 13, height: 13, marginLeft: 5}}
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: '#fff', fontFamily: 'AvenirLTStd-Black'}}>
            EXCERCISE
          </Text>
          <Image
            source={require('../../assets/lock.png')}
            style={{width: 13, height: 13, marginLeft: 5}}
          />
        </View>
      </View> */}
    </TouchableOpacity>
  );
};

export default Courseslist;

const styles = StyleSheet.create({
  courseItems: {
    width: sizes.width * 0.89,
    height: height * 0.2,
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  courseImg: {
    flex: 1,
  },
  captions: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  title: {},
});

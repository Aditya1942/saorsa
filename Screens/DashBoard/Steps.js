import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {TouchableHighlight} from 'react-native';
import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {colors, sizes, coursesImages} from '../../Constants';
import {getUserAuthToken} from '../Auth/auth';
import axios from '../Auth/axios';

const Steps = ({navigation}) => {
  const [stepDataLoaded, setstepDataLoaded] = useState(false);
  const setStepData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@StepData', jsonValue);
    } catch (e) {
      // saving error
      throw e;
    }
  };
  useEffect(() => {
    setTimeout(() => {
      getUserAuthToken().then((token) => {
        if (!token) navigation.navigate('Login');
        axios({
          method: 'get',
          url: '/api/step',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        })
          .then(({data}) => {
            setStepData(data);
          })
          .catch((err) => {});
      });
      setstepDataLoaded(true);
    }, 1000);
  }, [navigation]);
  return (
    <FlatList
      data={coursesImages}
      keyExtractor={(item) => item.id.toString()}
      initialNumToRender={6}
      horizontal
      style={{paddingTop: 10}}
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      snapToInterval={sizes.ITEM_WIDTH}
      contentContainerStyle={{paddingRight: sizes.SPACING * 2}}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity
            onPress={() => {
              if (stepDataLoaded) {
                navigation.navigate('Step', {
                  id: index + 1,
                  index: index,
                  stepName: item.id,
                });
              }
            }}>
            <View style={styles.courseItems}>
              <FastImage
                source={item.img}
                style={styles.courseImg}
                resizeMode={'cover'}
              />
              <View style={styles.courseTitle}>
                <Text
                  style={{
                    fontSize: sizes.body,
                    color: '#fff',
                    fontWeight: 'bold',
                    fontFamily: 'AvenirLTStd-Black',
                  }}>
                  {item.id}
                </Text>
                <Text
                  style={{
                    fontSize: sizes.caption,
                    color: '#fff',
                    fontFamily: 'AvenirLTStd-Book',
                  }}>
                  {item.title}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default Steps;

const styles = StyleSheet.create({
  courseItems: {
    width: sizes.ITEM_WIDTH,
    height: sizes.ITEM_HEIGHT,
    backgroundColor: colors.primary,
    marginRight: sizes.SPACING,
    borderRadius: 10,
    overflow: 'hidden',
  },
  courseImg: {
    width: '100%',
    height: '100%',
  },
  courseTitle: {
    position: 'absolute',
    bottom: 10,
    paddingHorizontal: 10,
  },
});

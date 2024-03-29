import {useFocusEffect} from '@react-navigation/core';
import React from 'react';
import {StyleSheet, Text, Pressable, BackHandler} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../Components/Header';
import {colors, sizes, courses} from '../../Constants';
import Courseslist from './Courseslist';
import Steps from './Steps';

const Home = ({navigation}) => {
  // const [CourseData, setCourseData] = React.useState([]);
  useFocusEffect(
    React.useCallback(() => {
      // const source = CancelToken.source();
      // axios({
      //   method: 'get',
      //   url: 'api/courses/all',
      //   cancelToken: source.token,
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // }).then((data) => {
      //   console.log(data);
      //   setCourseData(data.data);
      // });
      const onBackPress = () => {
        if (navigation.canGoBack()) navigation.goBack();
        else BackHandler.exitApp();
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        // source.cancel('Get req canceled');
      };
    }, [navigation]),
  );

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
          Welcome
        </Text>
        <Text
          style={{
            fontSize: sizes.title,
            color: '#fff',
            fontFamily: 'AvenirLTStd-Book',
          }}>
          How are you feeling today
        </Text>
        <Text
          style={{
            fontSize: sizes.header * 0.9,
            color: '#fff',
            paddingTop: 20,
            fontFamily: 'AvenirLTStd-Black',
          }}>
          FREE EMOTIONAL REGULATION COURSES
        </Text>

        <Steps navigation={navigation} />

        {courses.map((item, index) => {
          return (
            <Pressable key={item.id}>
              <Courseslist
                image={item.img}
                onPress={item.onPress}
                title={item.title}
                componentName={item.Component}
                navigation={navigation}
              />
            </Pressable>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  courseItems: {
    width: sizes.ITEM_WIDTH,
    height: sizes.ITEM_HEIGHT,
    backgroundColor: 'red',
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
  description: {
    marginTop: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
});

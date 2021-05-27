import React from 'react';

import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Header from '../../Components/Header';
import {colors, sizes} from '../../Constants';
import axios, {CancelToken} from '../Auth/axios';

export const PaidCourseBtn = ({
  navigation,
  courseimage,
  name,
  locked,
  courses,
  mcq,
}) => {
  return (
    <TouchableOpacity
      style={courseBtnStyle.StepBtn}
      onPress={() => {
        if (!locked) {
          navigation.navigate('PaidSubCourse', {
            // id: id,
            CourseTitle: name,
            image: courseimage,
            data: courses,
            mcq: mcq,
          });
        }
      }}>
      <View>
        <View style={courseBtnStyle.StepBtnBody}>
          {locked && <View style={courseBtnStyle.blurBg} />}
          <FastImage
            style={courseBtnStyle.courseImg}
            source={{uri: courseimage}}
          />
          {locked && (
            <FastImage
              style={courseBtnStyle.lockIcon}
              source={require('../../assets/lock2.png')}
            />
          )}

          <Text style={courseBtnStyle.StepBtnText}>{name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const PaidCourse = ({navigation, route}) => {
  const [CourseData, setCourseData] = React.useState([]);
  console.log(route.params);
  React.useEffect(() => {
    const source = CancelToken.source();
    axios({
      method: 'get',
      url: 'api/courses/one/' + route.params.componentName.toUpperCase(),
      cancelToken: source.token,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((data) => {
      console.log(data);
      setCourseData(data.data);
    });

    return () => {
      source.cancel('Get req canceled');
    };
  }, [route.params.componentName]);

  const CourseName = CourseData[0]?.name;
  const image = CourseData[0]?.image;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}>
      <ImageBackground source={{uri: image}} style={Styles.headerImg}>
        <View style={Styles.header}>
          <Header navigation={navigation} />
        </View>
        <View style={Styles.headerText}>
          <Text style={Styles.title}>{CourseName}</Text>
        </View>
      </ImageBackground>
      <ScrollView style={Styles.body}>
        {/* <Text style={Styles.bodyTitles}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, error
          dolor repudiandae magnam consequatur iusto laborum reiciendis! Esse
          veniam labore nulla assumenda? Quos modi quo, nisi deserunt id esse
          sed adipisci dolores? Debitis molestias nostrum facilis ullam
          distinctio magni maiores neque dolore explicabo id, nam odio unde
          nulla aliquid repellat?
        </Text>
        <TouchableOpacity style={Styles.introvideo}>
          <FastImage
            style={Styles.playBtn}
            source={require('../../assets/playButton.png')}
          />
        </TouchableOpacity> */}
        <View style={Styles.stepBtns}>
          {CourseData[0]?.courses?.map((e, i) => (
            <PaidCourseBtn
              key={i}
              name={e.name}
              navigation={navigation}
              courseimage={e.img}
              locked={e?.isLocked}
              mcq={e.mcq}
              courses={e.data}
            />
          ))}
        </View>
        <View style={{margin: 50}} />
      </ScrollView>
    </SafeAreaView>
  );
};
export default PaidCourse;
const courseBtnStyle = StyleSheet.create({
  StepBtn: {
    alignItems: 'center',
    width: sizes.ITEM_WIDTH * 1.62,
    // width: sizes.width,
    height: sizes.ITEM_HEIGHT * 1.25,
    // flexGrow: 1,
    marginRight: 5,
  },
  StepBtnBody: {
    backgroundColor: '#fff',
    height: sizes.ITEM_HEIGHT + 10,
    borderRadius: 20,
  },
  StepBtnText: {
    color: 'black',
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 12,
    // width: 170,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'bottom',
    textTransform: 'uppercase',
  },
  courseImg: {
    width: sizes.ITEM_WIDTH * 1.65,
    height: sizes.ITEM_WIDTH,
    borderRadius: 20,
  },
  blurBg: {
    position: 'absolute',
    width: sizes.ITEM_WIDTH * 1.65,
    backgroundColor: 'rgba(0, 0, 0,0.5)',
    height: sizes.ITEM_WIDTH,
    borderRadius: 20,
    zIndex: 2,
  },
  lockIcon: {
    position: 'absolute',
    width: sizes.ITEM_WIDTH * 0.8,
    height: sizes.ITEM_WIDTH * 0.8,
    marginTop: sizes.ITEM_WIDTH * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
    alignSelf: 'center',
  },
});

const Styles = StyleSheet.create({
  headerImg: {
    height: sizes.ITEM_HEIGHT * 1.3,
    justifyContent: 'flex-start',
  },
  header: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0,0.3)',
  },
  headerText: {
    paddingHorizontal: 10,
    paddingBottom: 15,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0,0.3)',
    alignContent: 'flex-end',
  },
  title: {
    color: '#fff',
    fontFamily: 'AvenirLTStd-Black',
    fontSize: 30,
    fontWeight: 'bold',
  },
  body: {
    marginTop: 10,
  },
  bodyTitles: {
    padding: 10,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'AvenirLTStd-Book',
    marginBottom: 10,
  },
  introvideo: {
    backgroundColor: '#fff',
    height: sizes.ITEM_HEIGHT * 1.3,
    borderRadius: 20,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBtn: {
    position: 'absolute',
    justifyContent: 'center',
    aspectRatio: 1,
    width: 100,
    flex: 1,
    alignSelf: 'center',
  },
  stepBtns: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 30,
    flexWrap: 'wrap',
  },
});

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  FlatList,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../Components/Header';
import {colors, sizes} from '../../Constants';
import {useFocusEffect} from '@react-navigation/core';
import AutoHeightImage from 'react-native-auto-height-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StepBtn} from './Step';
import FastImage from 'react-native-fast-image';
import axios from '../Auth/axios';
import {getUserAuthToken} from '../Auth/auth';
import {Button} from 'react-native-elements';
import SubmitBtn from '../../Components/SubmitBtn';

export const Audio = ({navigation, audio}) => {
  return (
    <TouchableOpacity
      style={StepCourseStyles.audio}
      onPress={async () => {
        navigation.navigate('PlayerScreen', {title: 'lol', filepath: audio});
      }}>
      <Text style={StepCourseStyles.audioText}>
        Audio <Icon name="headphones" size={15} color="#fff" />
      </Text>
    </TouchableOpacity>
  );
};
const Forms = ({formData, navigation, stepName, image, description}) => {
  const formStyle = {
    smallBox: {
      flex: 0.5,
      flexDirection: 'column',
      backgroundColor: '#fff',
      height: '100%',
      width: sizes.width * 0.48,
      marginVertical: 5,
      padding: 10,
      paddingTop: 15,
      borderRadius: 10,
    },
    smallBoxTitle: {
      alignSelf: 'center',
      fontSize: 13,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      fontFamily: 'AvenirLTStd-Book',
      marginBottom: 5,
      color: colors.primary,
    },
    smallBoxbody: {
      marginTop: 5,
      textAlign: 'center',
      fontSize: 12,
      color: 'black',
      flex: 1,
      lineHeight: 13,
      // fontFamily: 'AvenirLTStd-Book',
    },
    bigBox: {
      flex: 1,
      width: sizes.width * 0.99,
      backgroundColor: '#fff',
      marginVertical: 5,
      paddingVertical: 10,
      paddingTop: 15,
      paddingHorizontal: 20,
      borderRadius: 10,
    },
    bigBoxTitle: {
      alignSelf: 'flex-start',
      fontSize: 14,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      fontFamily: 'AvenirLTStd-Book',
      color: colors.primary,
    },
    bigBoxbody: {
      marginTop: 5,
      textAlign: 'center',
      fontSize: 12,
      color: 'black',
      lineHeight: 17,
      // fontFamily: 'AvenirLTStd-Book',
    },
  };
  var FormInput = [];
  const SmallBox = ({title, placeholder}) => {
    const handleChange = (e) => {
      FormInput[title] = e;
    };
    return (
      <View style={formStyle.smallBox}>
        <Text style={formStyle.smallBoxTitle}>{title}</Text>
        <View
          style={{
            backgroundColor: 'rgb(230,230,230)',
            borderRadius: 20,
            paddingBottom: 80,
          }}>
          <TextInput
            onChangeText={handleChange}
            placeholder={placeholder}
            style={{
              backgroundColor: 'rgb(230,230,230)',
              borderRadius: 20,
              padding: 7,
            }}
            multiline={true}
          />
        </View>
        {/* <Text style={YourPlanTabStyle.smallBoxFooter}>{footer}</Text> */}
      </View>
    );
  };
  const BigBox = ({title, placeholder}) => {
    const handleChange = (e) => {
      FormInput[title] = e;
    };
    return (
      <View style={formStyle.bigBox}>
        <Text style={formStyle.bigBoxTitle}>{title}</Text>
        <View
          style={{
            backgroundColor: 'rgb(230,230,230)',
            borderRadius: 20,
            paddingBottom: 80,
          }}>
          <TextInput
            placeholder={placeholder}
            onChangeText={handleChange}
            style={{
              backgroundColor: 'rgb(230,230,230)',
              borderRadius: 20,
              padding: 7,
            }}
            multiline={true}
          />
        </View>
        {/* <Text style={YourPlanTabStyle.bigBoxFooter}>{footer}</Text> */}
      </View>
    );
  };
  const [Error, setError] = useState(false);
  const convertPostArrayy = (arr) => {
    let questions = [];
    let answers = [];
    arr.forEach((element) => {
      questions.push(element[0]);
      answers.push(element[1]);
    });
    let result = {
      questions,
      answers,
      name: formData[0].name,
    };
    return result;
  };
  const handleSubmit = () => {
    let data = Object.entries(FormInput);

    let PostData = convertPostArrayy(data);
    console.log(FormInput);

    if (data.length === formData[0].questions.length) {
      console.log(PostData);
      getUserAuthToken().then((token) => {
        axios({
          url: '/api/formsubmit/',
          method: 'post',
          data: PostData,
          headers: {'Content-Type': 'application/json', 'x-auth-token': token},
        })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      });
      setError(false);
    } else {
      setError(true);
    }
    // setError(!Error);
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      }}>
      {formData[0].questions.map((f, i) => {
        return (
          <View key={i}>
            {f.size === 'small' ? (
              <SmallBox title={f.label} placeholder={f.placeholder} />
            ) : (
              <BigBox title={f.label} placeholder={f.placeholder} />
            )}
          </View>
        );
      })}
      <View style={{marginTop: 30}}>
        {Error && (
          <Text
            style={{
              fontSize: 18,
              // marginTop: 10,
              color: 'red',
              alignSelf: 'center',
            }}>
            Please fill all fields
          </Text>
        )}

        <SubmitBtn onPress={handleSubmit} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('StepFormData', {
              stepName,
              description,
              image,
            });
          }}
          style={{
            backgroundColor: '#fff',
            width: 200,
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
          }}>
          <Text style={{color: colors.secondary, fontSize: 16}}>
            VIEW YOUR PLANS
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const Title = ({audio, titleText, navigation}) => {
  const stepCourseTitleStyle = {
    main: {
      flexDirection: 'row',
      marginVertical: 0,
      position: 'relative',
      left: -10,
      justifyContent: 'space-between',
    },
    body: {
      flexDirection: 'row',
    },
    before: {
      width: 20,
      padding: 10,
      paddingLeft: 20,
      justifyContent: 'center',
      alignItems: 'center',
      height: 10,
      marginTop: 10,
      position: 'relative',
      left: 0,
      transform: [{skewY: '147deg'}, {translateX: -10}, {scaleX: -2}],
      backgroundColor: '#304da6',
    },

    title: {
      width: sizes.width * 0.68,
      paddingVertical: 10,
      paddingLeft: 5,
      justifyContent: 'center',
      alignItems: 'flex-start',
      backgroundColor: colors.secondary,
      height: 10,
    },
    titleText: {
      color: '#FFF',
      fontWeight: 'bold',
      fontFamily: 'AvenirLTStd-Black',
      textTransform: 'uppercase',
      fontSize: 14,
    },
    after: {
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderRightWidth: 20,
      borderTopWidth: 20,
      borderRightColor: 'transparent',
      borderTopColor: colors.secondary,
      transform: [{rotate: '0deg'}],
    },
  };

  return (
    <View style={stepCourseTitleStyle.main}>
      <View style={stepCourseTitleStyle.body}>
        <View style={stepCourseTitleStyle.before} />
        <View style={stepCourseTitleStyle.title}>
          <Text style={stepCourseTitleStyle.titleText}>{titleText}</Text>
        </View>
        <View style={stepCourseTitleStyle.after} />
      </View>
      <View>
        {audio ? <Audio audio={audio} navigation={navigation} /> : <View />}
      </View>
    </View>
  );
};
const Course = ({
  title,
  audio,
  video,
  navigation,
  img,
  description,
  thumbnail,
}) => {
  function WordCount(str) {
    var lengthyTitle = [];
    let titleStr = '';
    str = str.split(' ');
    str.forEach((word, i) => {
      titleStr = titleStr.concat(word + ' ');
      let join = false;
      let n = str[i + 1];
      // if string length is greater then 23
      if (titleStr.length >= 24) {
        join = true;
        if (n) {
          if (titleStr.length >= 10 && titleStr.length <= 26 && n.length <= 4) {
            join = false;
          }
          if (n.length < 2) {
            join = false;
          }
        }
      }
      if (titleStr.length >= 20 && titleStr.length <= 25 && word.length <= 10) {
        join = true;
      }

      if (join) {
        lengthyTitle.push(titleStr);
        titleStr = '';
      }
    });
    if (titleStr !== '') {
      lengthyTitle.push(titleStr);
    }
    return lengthyTitle;
  }
  var titles = [];
  if (title) {
    titles = WordCount(title);
    // console.log(titles);
  }

  return (
    <View>
      {title &&
        titles.map((titleText, index) => (
          <Title
            key={index}
            titleText={titleText}
            audio={index === 0 ? audio : null}
            navigation={navigation}
          />
        ))}
      {video !== undefined && (
        <TouchableOpacity
          style={StepCourseStyles.videoPicture}
          onPress={() => {
            navigation.navigate('VideoPlayer', {video});
          }}>
          <FastImage
            style={StepCourseStyles.picture}
            source={{uri: thumbnail}}
            blurRadius={50}
          />
          <FastImage
            style={StepCourseStyles.playpicture}
            source={require('../../assets/playButton.png')}
          />
        </TouchableOpacity>
      )}
      {description && (
        <Text style={StepCourseStyles.description}>{description}</Text>
      )}

      <View style={{paddingHorizontal: 10}}>
        <AutoHeightImage width={350} source={{uri: img}} />
        {/* <FastImage width={350} source={{uri: img}} /> */}
      </View>
    </View>
  );
};
const StepCourse = ({route, navigation}) => {
  const {data} = route.params;
  const Coursedata = route.params;
  const FormData = route.params.data?.data;
  const [StepData, setStepData] = React.useState([]);
  const [nextCourse, setnextCourse] = React.useState([]);

  const getStepData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@StepData');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
      throw e;
    }
  };
  // this function will post progress
  useEffect(() => {
    var myVar = setTimeout(function () {
      let step = route.params.stepName;
      let course = data.name;
      getUserAuthToken().then((token) => {
        axios({
          url: '/api/progress',
          data: JSON.stringify({step, course}),
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        }).then((e) => {
          console.log(e);
        });
      });
    }, 60000);
    return () => {
      clearTimeout(myVar);
    };
  }, [data.name, route]);

  useFocusEffect(
    React.useCallback(() => {
      getStepData()
        .then((steps) => {
          setStepData(steps);
          setnextCourse(steps[Coursedata.stepId]?.courses[Coursedata.id + 1]);
        })
        .catch((err) => {
          console.log(err);
        });
      const onBackPress = () => {
        if (navigation.canGoBack()) {
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
    }, [Coursedata, navigation]),
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}>
      <ImageBackground
        source={{uri: data.img}}
        style={StepCourseStyles.headerImg}>
        <View style={StepCourseStyles.header}>
          <Header navigation={navigation} />
        </View>
        <View style={StepCourseStyles.headerText}>
          <Text style={StepCourseStyles.title}>{route.params.stepName}</Text>
          <Text style={StepCourseStyles.titleDescription}>{data.name}</Text>
        </View>
      </ImageBackground>
      <ScrollView style={StepCourseStyles.body}>
        <View style={{marginTop: 30}}>
          {data.data[0].category !== 'basic_form' ? (
            data.data.map((course, index) => (
              <Course
                key={index}
                title={course?.title}
                description={course?.description}
                img={course?.img}
                audio={course?.audio}
                video={course.video}
                thumbnail={course.thumbnail}
                navigation={navigation}
              />
            ))
          ) : (
            <Forms
              formData={FormData}
              navigation={navigation}
              stepName={route.params.stepName}
              description={data.name}
              image={data.img}
            />
          )}
        </View>
        <View
          style={{
            marginTop: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {nextCourse && (
            <StepBtn
              navigation={navigation}
              key={nextCourse._id}
              id={Coursedata.id + 1}
              name={'CLICK HERE TO LEARN MORE ABOUT ' + nextCourse.name}
              courseimage={nextCourse.img}
              data={nextCourse}
              stepId={Coursedata.stepId}
              stepName={Coursedata.stepName}
            />
          )}
        </View>
        <View style={{height: 100}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default StepCourse;
const StepCourseStyles = StyleSheet.create({
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
    justifyContent: 'center',
    color: 'black',
    backgroundColor: 'rgba(0, 0, 0,0.3)',
    alignContent: 'flex-end',
  },
  title: {
    // color: 'black',
    color: '#fff',
    fontFamily: 'AvenirLTStd-Black',
    fontSize: 30,
    fontWeight: 'bold',
  },
  titleDescription: {
    color: '#fff',
    padding: 10,
    paddingHorizontal: 20,
    fontFamily: sizes.fontFamily,
    fontSize: sizes.title,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    color: '#fff',
    padding: 10,
    paddingHorizontal: 20,
    fontFamily: sizes.fontFamily,
    fontSize: sizes.title,
    textAlign: 'center',
  },
  body: {},
  audio: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    // float: 'right',
  },
  audioText: {
    color: '#fff',
  },

  picture: {
    flex: 1,
    aspectRatio: 1,
    // backgroundColor: 'red',
    resizeMode: 'cover',
    height: sizes.ITEM_HEIGHT * 1.7,
    borderRadius: 20,
    width: '100%',
  },
  videoPicture: {
    // backgroundColor: '#fff',
    // height: sizes.ITEM_HEIGHT * 1.3,
    borderRadius: 20,
    flex: 0.8,
    marginHorizontal: 10,
    marginBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playpicture: {
    position: 'absolute',
    justifyContent: 'center',
    aspectRatio: 1,
    width: 100,
    flex: 1,
    alignSelf: 'center',
  },
});

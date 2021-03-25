import React, {useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../Components/Header';
import {colors, sizes} from '../../Constants';
import {useFocusEffect} from '@react-navigation/core';
import FastImage from 'react-native-fast-image';

const Audio = ({navigation, audio}) => {
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

const Title = ({audio, titleText, navigation}) => {
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
      backgroundColor: 'red',
      height: 10,
      marginTop: 10,
      position: 'relative',
      left: 0,
      transform: [{skewY: '147deg'}, {translateX: -10}, {scaleX: -2}],
      backgroundColor: '#304da6',
    },

    title: {
      width: sizes.width * 0.65,
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
      fontSize: 12,
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
const Course = ({title, audio, navigation, img, description}) => {
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     console.log('This will run after 5 second!');
  //   }, 5000);
  //   return () => clearTimeout(timer);
  // }, []);
  function WordCount(str) {
    var lengthyTitle = [];
    let titleStr = '';
    str = str.split(' ');
    str.forEach((word, i) => {
      titleStr = titleStr.concat(word + ' ');
      if (i === 4) {
        lengthyTitle.push(titleStr);
        titleStr = '';
      }
    });
    lengthyTitle.push(titleStr);
    return lengthyTitle;
  }

  var titles = WordCount(title);
  return (
    <View>
      {titles.map((title, index) => (
        <Title
          key={index}
          titleText={title}
          audio={index === 0 ? audio : null}
          navigation={navigation}
        />
      ))}
      <Text style={StepCourseStyles.description}>{description}</Text>
      <View style={{paddingHorizontal: 10}}>
        <FastImage style={StepCourseStyles.picture} source={img} />
      </View>
    </View>
  );
};
const StepCourse = ({route, navigation}) => {
  const {data} = route.params;
  console.log(route.params);

  useFocusEffect(
    React.useCallback(() => {
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
    }, []),
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}>
      <ImageBackground source={data.img} style={StepCourseStyles.headerImg}>
        <View style={StepCourseStyles.header}>
          <Header navigation={navigation} />
        </View>
        <View style={StepCourseStyles.headerText}>
          <Text style={StepCourseStyles.title}>Step 1</Text>
          <Text style={StepCourseStyles.description}>{data.name}</Text>
        </View>
      </ImageBackground>
      <ScrollView style={StepCourseStyles.body}>
        <View style={{marginTop: 30}} />
        {data.data.map((course, index) => (
          <Course
            key={index}
            title={course.title}
            description={course.description}
            img={course.img}
            audio={course.audio}
            navigation={navigation}
          />
        ))}
        <View style={{marginTop: 100}} />
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
  header: {},
  headerText: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    height: '100%',
    alignContent: 'flex-end',
  },
  title: {
    color: '#fff',
    fontFamily: 'AvenirLTStd-Black',
    fontSize: 30,
    fontWeight: 'bold',
  },
  description: {
    fontWeight: 'normal',
    color: '#fff',
    fontFamily: 'AvenirLTStd-Black',
    fontSize: 25,
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
  description: {
    color: 'white',
    padding: 10,
    paddingHorizontal: 20,
    fontFamily: sizes.fontFamily,
    fontSize: sizes.title,
    textAlign: 'justify',
  },
  picture: {
    flex: 1,
    aspectRatio: 1.2,
    resizeMode: 'contain',
  },
});

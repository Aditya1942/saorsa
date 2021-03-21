import React, {useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  BackHandler,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../Components/Header';
import {colors, sizes} from '../../Constants';

const Audio = () => {
  return (
    <TouchableOpacity style={StepCourseStyles.audio}>
      <Text style={StepCourseStyles.audioText}>
        Audio <Icon name="headphones" size={15} color="#fff" />
      </Text>
    </TouchableOpacity>
  );
};

const Title = ({audio, titleText}) => {
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
      width: sizes.width * 0.6,
      padding: 10,
      paddingLeft: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.secondary,
      height: 10,
    },
    titleText: {
      color: '#FFF',
      fontWeight: 'bold',
      fontFamily: 'AvenirLTStd-Black',
      textTransform: 'uppercase',
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
      <View>{audio === true ? <Audio /> : <View />}</View>
    </View>
  );
};
const Course = ({title, audio}) => {
  return (
    <View>
      <Title titleText={title} audio={audio} />
    </View>
  );
};
const StepCourse = ({route, navigation}) => {
  const {data} = route.params;
  console.log(route.params);
  const backActionHandler = () => {
    navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backActionHandler);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backActionHandler);
    };
  }, []);
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
        <Course title={data.name} audio={true} />
        <Text
          style={{
            color: 'white',
            padding: 10,
            fontFamily: sizes.fontFamily,
            fontSize: sizes.title,
            textAlign: 'justify',
          }}>
          When we can’t regulate our emotions we use unhelpful coping strategies
          to manage emotions, this is known as Emotional Dysregulation{'\n\n'}
          Dysregulation results in difficulties coping and processing the
          emotion. Which can resulting in us using unhelpful coping strategies
          such as taking substances, binge eating, saying things we regret, self
          criticising or self harming.
        </Text>
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
});

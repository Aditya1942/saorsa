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
import Header from '../../Components/Header';
import FastImage from 'react-native-fast-image';
import {colors, sizes, coursesImages} from '../../Constants';
import {Image} from 'react-native-elements';
import {step1} from './stepData.js';
import Icon from 'react-native-vector-icons/FontAwesome';

const StepBtn = ({courseimage, name, id, navigation, data}) => {
  return (
    <TouchableOpacity
      style={StepStyles.StepBtn}
      onPress={() => {
        navigation.navigate('StepCourse', {
          id: id,
          Coursename: name,
          data: data,
        });
      }}>
      <View>
        <View style={StepStyles.StepBtnBody}>
          <FastImage style={StepStyles.courseImg} source={courseimage} />
          <Text style={StepStyles.StepBtnText}>{name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const NextStep = ({id, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Step', {
          id: id + 1,
          step: coursesImages[id].id,
          title: coursesImages[id].title,
        });
        console.log(coursesImages[id]);
      }}>
      <View style={StepStyles.nextStep}>
        <Text style={StepStyles.nextStepText}>
          NEXT&nbsp;STEP&nbsp;&nbsp;
          <Icon name="arrow-right" size={15} color="#fff" />
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const PreviousStep = ({id, navigation}) => {
  var previousId = id - 2;
  console.log(coursesImages[previousId]);
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Step', {
          id: id - 1,
          step: coursesImages[previousId].id,
          title: coursesImages[previousId].title,
        });
      }}>
      <View style={StepStyles.PreviousStep}>
        <Text style={StepStyles.PreviousStepText}>
          <Icon name="arrow-left" size={15} color="#fff" />
          &nbsp;&nbsp;PREVIOUS&nbsp;STEP
        </Text>
      </View>
    </TouchableOpacity>
  );
};
function Step({route, navigation}) {
  step1.courses.forEach(function (data) {
    console.log('stepData', data);
  });
  console.log(navigation);
  const {step, title, id} = route.params;
  console.log('route', id);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}>
      <ImageBackground
        source={require('../../assets/Steps/step1/header.png')}
        style={StepStyles.headerImg}>
        <View style={StepStyles.header}>
          <Header navigation={navigation} />
        </View>
        <View style={StepStyles.headerText}>
          <Text style={StepStyles.title}>{step}</Text>
          <Text style={StepStyles.title2}>{title}</Text>
        </View>
      </ImageBackground>
      <ScrollView style={StepStyles.body}>
        <Text style={StepStyles.bodyTitles}>
          Emotional awareness is essentially being able to identify the emotions
          you're experiencing, Emotional awareness helps us know what we need
          and want or don't want. It helps us build better relationships
        </Text>
        {step1.courses.map((stepdata, index) => (
          <View key={index} style={StepStyles.stepBtns}>
            {stepdata.map((course) => (
              <StepBtn
                navigation={navigation}
                id={course.id}
                key={course.id}
                name={course.name}
                courseimage={course.img}
                data={course}
              />
            ))}
          </View>
        ))}
        <View style={StepStyles.footer}>
          {id !== 1 ? (
            <PreviousStep id={id} navigation={navigation} />
          ) : (
            <View />
          )}
          {id !== 6 ? <NextStep id={id} navigation={navigation} /> : <View />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Step;

const StepStyles = StyleSheet.create({
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
  title2: {
    fontWeight: 'normal',
    color: '#fff',
    fontFamily: 'AvenirLTStd-Black',
    fontSize: 25,
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
  stepBtns: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  StepBtn: {
    alignItems: 'center',
    width: '50%',
    height: '100%',
  },
  StepBtnBody: {
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  StepBtnText: {
    color: 'black',
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 12,
    width: 170,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'bottom',
    textTransform: 'uppercase',
  },
  courses: {},
  courseImg: {
    width: sizes.ITEM_WIDTH * 1.6,
    height: sizes.ITEM_WIDTH,
    borderRadius: 20,
  },
  footer: {
    marginBottom: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nextStep: {
    color: '#fff',
    padding: 10,
    backgroundColor: colors.secondary,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'top',
  },
  nextStepText: {
    color: '#fff',
  },
  PreviousStepText: {
    color: '#fff',
    padding: 10,
    backgroundColor: colors.secondary,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'top',
  },
  PreviousStep: {
    color: '#fff',
  },
});

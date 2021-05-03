import React, {useState, useEffect} from 'react';
import {
  BackHandler,
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
import {colors, sizes} from '../../Constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useFocusEffect} from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Step({route, navigation}) {
  const [StepData, setStepData] = useState([]);
  const {stepName, id, index} = route.params;
  const getStepData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@StepData');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log('axios'.data);
      // error reading value
      throw e;
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      getStepData()
        .then((data) => {
          setStepData(data);
          console.log(data);
        })
        .catch((err) => {
          console.error(err);
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
    }, [navigation]),
  );
  useEffect(() => {}, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}>
      {/* require('../../assets/Steps/step1/header.png') */}
      <ImageBackground
        source={{uri: StepData[index]?.image}}
        style={StepStyles.headerImg}>
        <View style={StepStyles.header}>
          <Header navigation={navigation} />
        </View>
        <View style={StepStyles.headerText}>
          <Text style={StepStyles.title}>{StepData[index]?.name}</Text>
          <Text style={StepStyles.title2}>{StepData[index]?.title}</Text>
        </View>
      </ImageBackground>
      <ScrollView style={StepStyles.body}>
        <Text style={StepStyles.bodyTitles}>
          {StepData[index]?.headingText}
        </Text>

        <View style={StepStyles.stepBtns}>
          {StepData[index]?.courses.map((course, i) => (
            <StepBtn
              navigation={navigation}
              key={i}
              id={i}
              name={course.name}
              courseimage={course.img}
              data={course}
              stepId={index}
              stepName={StepData[index]?.name}
            />
          ))}
        </View>
        <View style={StepStyles.footer}>
          {id !== 1 ? (
            <PreviousStep
              navigationData={{
                id: index,
                index: index - 1,
                stepName: StepData[index - 1]?.name,
              }}
              navigation={navigation}
            />
          ) : (
            <View />
          )}
          {id !== 6 ? (
            <NextStep
              navigationData={{
                id: index + 2,
                index: index + 1,
                stepName: StepData[index + 1]?.name,
              }}
              navigation={navigation}
            />
          ) : (
            <View />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export const StepBtn = ({
  courseimage,
  name,
  id,
  navigation,
  data,
  stepName,
  stepId,
}) => {
  return (
    <TouchableOpacity
      style={StepStyles.StepBtn}
      onPress={() => {
        navigation.navigate('StepCourse', {
          id: id,
          Coursename: name,
          data: data,
          stepName: stepName,
          stepId: stepId,
        });
      }}>
      <View>
        <View style={StepStyles.StepBtnBody}>
          <FastImage style={StepStyles.courseImg} source={{uri: courseimage}} />
          <Text style={StepStyles.StepBtnText}>{name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const NextStep = ({navigationData, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Step', navigationData);
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
const PreviousStep = ({navigationData, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Step', navigationData);
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

export default Step;

const StepStyles = StyleSheet.create({
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    flexWrap: 'wrap',
  },
  StepBtn: {
    alignItems: 'center',
    width: sizes.ITEM_WIDTH * 1.62,
    // width: sizes.width,
    height: sizes.ITEM_HEIGHT * 1.25,
    // flexGrow: 1,
  },
  StepBtnBody: {
    backgroundColor: '#fff',
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
  courses: {},
  courseImg: {
    width: sizes.ITEM_WIDTH * 1.65,
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

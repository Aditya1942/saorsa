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
import {Title} from './StepCourse';

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
        {/* <View style={StepStyles.headerText}>
          <Text style={StepStyles.title}>{StepData[index]?.name}</Text>
          <Text style={StepStyles.title2}>{StepData[index]?.title}</Text>
        </View> */}
      </ImageBackground>
      <ScrollView style={StepStyles.body}>
        <Text style={StepStyles.bodyTitles}>
          {StepData[index]?.headingText}
        </Text>

        <View>
          {StepData[index]?.data.map((item, i) => {
            let title = item.title;
            let video = item.video;
            let thumbnail = item.thumbnail;
            const WordCount = (str) => {
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
                    if (
                      titleStr.length >= 10 &&
                      titleStr.length <= 26 &&
                      n.length <= 4
                    ) {
                      join = false;
                    }
                    if (n.length < 2) {
                      join = false;
                    }
                  }
                }
                if (
                  titleStr.length >= 20 &&
                  titleStr.length <= 25 &&
                  word.length <= 10
                ) {
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
            };
            let titles = [];
            if (title) {
              titles = WordCount(title);
              // console.log(titles);
            }
            return (
              <View key={item._id || i}>
                {title &&
                  titles.map((titleText, titleIndex) => (
                    <Title
                      key={titleIndex}
                      titleText={titleText}
                      audio={item?.audio || null}
                      navigation={navigation}
                    />
                  ))}
                {video !== undefined && (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('VideoPlayer', {
                        video: video,
                      });
                    }}
                    key={i}
                    style={StepStyles.introvideo}>
                    <FastImage
                      style={StepStyles.playBtn}
                      source={require('../../assets/playButton.png')}
                    />
                    <FastImage
                      style={StepStyles.VideoThumbnail}
                      source={{uri: thumbnail}}
                    />
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
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
          {id !== 5 ? (
            <NextStep
              navigationData={{
                id: index + 2,
                index: index + 1,
                stepName: StepData[index + 1]?.name,
              }}
              navigation={navigation}
            />
          ) : (
            <NextStep
              navigationData={{
                id: index + 2,
                index: index + 1,
                stepName: StepData[index + 1]?.name,
              }}
              navigation={navigation}
              navigateToStep6={true}
            />
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
export const NextStep = ({
  navigationData,
  navigation,
  navigateToStep6 = false,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (!navigateToStep6) {
          navigation.navigate('Step', navigationData);
        } else {
          navigation.navigate('Profile', {activeTab: 'tab3'});
        }
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
    // backgroundColor: 'rgba(0, 0, 0,0.3)',
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
  introvideo: {
    backgroundColor: '#fff',
    height: sizes.ITEM_HEIGHT * 1.3,
    borderRadius: 20,
    margin: 10,
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
    zIndex: 2,
  },
  VideoThumbnail: {
    position: 'absolute',
    justifyContent: 'center',
    aspectRatio: 1,
    height: sizes.ITEM_HEIGHT * 1.3,
    width: '100%',
    flex: 1,
    borderRadius: 20,
    alignSelf: 'center',
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

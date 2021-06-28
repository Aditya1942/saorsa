import React, {useEffect, useState} from 'react';
import {
  Button,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import FastImage from 'react-native-fast-image';
import Header from '../../Components/Header';
import {colors, sizes} from '../../Constants';
import BottomSheet from 'react-native-bottomsheet-reanimated';
import axios, {CancelToken} from '../Auth/axios';
import {getUserAuthToken} from '../Auth/auth';
import AutoHeightImage from 'react-native-auto-height-image';
import SubmitBtn from '../../Components/SubmitBtn';

const Questions = ({
  data,
  onOpenBottomSheetHandler,
  setUpdateGraph,
  CourseTitle,
}) => {
  const QuestionsInput = data;
  const [AnswerError, setAnswerError] = useState(false);
  const SumMcqs = [];
  console.log('CourseTitle', CourseTitle);
  const Question = ({q, index}) => {
    const QuestionStyles = StyleSheet.create({
      container: {
        margin: 20,
      },
      question: {
        color: '#fff',
        fontSize: 18,
      },
      options: {
        flexDirection: 'row',
        marginLeft: 20,

        flexWrap: 'wrap',
        marginTop: 10,
      },
      option: {
        width: 130,
        padding: 7,
        margin: 7,
        borderWidth: 1,
        borderColor: colors.secondary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      activeOption: {
        backgroundColor: colors.secondary,
      },
      optionText: {
        fontSize: 13,
        color: '#fff',
      },
    });
    const [ActiveQuestion, setActiveQuestion] = useState(0);
    return (
      <View style={QuestionStyles.container}>
        <Text style={QuestionStyles.question}>{`${index + 1}. ${
          q.question
        }`}</Text>
        <View style={QuestionStyles.options}>
          {q.options.map((o, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                setActiveQuestion(i + 1);
                console.log(i);
                SumMcqs[QuestionsInput[index].question] = o.value;
                // QuestionsInput[index].answer = o.value;
              }}
              style={[
                QuestionStyles.option,
                parseInt(ActiveQuestion) === i + 1 &&
                  QuestionStyles.activeOption,
              ]}>
              <Text style={QuestionStyles.optionText}>{o.option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };
  const submit = () => {
    let mcqSum = 0;
    let error = false;
    let length = 0;
    console.log(SumMcqs);
    for (const key in SumMcqs) {
      if (Object.hasOwnProperty.call(SumMcqs, key)) {
        length++;
        const element = SumMcqs[key];
        console.log(element);
        mcqSum += element;
      }
    }
    if (length !== QuestionsInput.length) {
      error = true;
      setAnswerError(true);
    } else {
      error = false;
    }
    console.log(error);
    if (!error) {
      getUserAuthToken().then((token) => {
        console.log(token);
        axios({
          url: '/api/mcq/',
          method: 'post',
          data: {mcq: CourseTitle, score: mcqSum},
          headers: {'Content-Type': 'application/json', 'x-auth-token': token},
        })
          .then((res) => {
            console.log(res);
            setUpdateGraph((e) => (e += 1));
          })
          .catch((err) => {
            console.log(err);
          });
      });
      setAnswerError(false);
    }
  };
  return (
    <View>
      {data.map((q, index) => (
        <Question key={index} q={q} index={index} />
      ))}
      {AnswerError && (
        <Text
          style={{
            fontSize: 18,
            color: 'red',
            alignSelf: 'center',
          }}>
          Please answer all questions
        </Text>
      )}
      <View
        style={{alignItems: 'center', justifyContent: 'center', marginTop: 25}}>
        <SubmitBtn onPress={submit} />
        <TouchableOpacity
          onPress={() => {
            onOpenBottomSheetHandler(1);
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
            VIEW GRAPH
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
// const MoodHistory = ({name, dateAndTime}) => {
//   const [BColor, setBColor] = useState(colors.secondary);
//   useEffect(() => {
//     switch (name) {
//       case 'HAPPY' || 'EXCITED' || 'GRATEFUL':
//         setBColor('greenyellow');
//         break;
//       case 'RELAXED' || 'CONTENT' || 'TIRED':
//         setBColor('yellowgreen');
//         break;
//       case 'UNSURE' || 'BORED' || 'ANXIOUS':
//         setBColor('#ffc703');
//         break;
//       case 'ANGRY' || 'STRESSED' || 'SAD':
//         setBColor('red');
//         break;
//       default:
//         break;
//     }
//   }, [name]);
//   return (
//     <View style={Styles.MoodHistory}>
//       <Text
//         style={[
//           Styles.MoodHistoryText,
//           Styles.MoodHistoryNameText,
//           {borderColor: BColor},
//         ]}>
//         {name}
//       </Text>
//       <Text style={Styles.MoodHistoryText}>{dateAndTime}</Text>
//     </View>
//   );
// };
const PaidSubCourse = ({navigation, route}) => {
  console.log(route.params);
  const CourseTitle = route.params.CourseTitle;
  const image = route.params.image;
  const CourseData = route.params.data;
  const MCQS = route.params.mcq;
  const [UpdateGraph, setUpdateGraph] = useState(0);
  console.log(MCQS.length);
  // bottom
  const bottomSheet = React.useRef();
  const onOpenBottomSheetHandler = (index) => {
    console.log(bottomSheet);
    bottomSheet.current.snapTo(index);
  };

  const snapPoints = [0, sizes.height / 2, '70%', '100%'];
  // bottom
  // graph elements
  const chartConfig = {
    backgroundColor: '#fff',
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForLabels: {
      // r: '6',
      // strokeWidth: '2',
      stroke: 'black',
    },
    propsForDots: {
      strokeWidth: '2',
      stroke: 'black',
    },
    propsForBackgroundLines: {
      r: '6',
      stroke: 'black',
      fill: 'white',
    },
    propsForVerticalLabels: {},
  };
  const Graph = ({UpdateGraph}) => {
    const [graphData, setGraphData] = useState([]);
    const GraphData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        {
          data: [0, 0, 0, 0, 0, 0],
          datasets: [
            {
              data: GraphData,
              color: (opacity = 1) => colors.primary, // optional
              strokeWidth: 2, // optional
            },
          ],
          color: (opacity = 1) => colors.primary, // optional
          strokeWidth: 2, // optional
        },
      ],
    };
    useEffect(() => {
      const source = CancelToken.source();
      getUserAuthToken().then((token) => {
        axios({
          method: 'get',
          url: 'api/mcq/' + CourseTitle,
          cancelToken: source.token,
          headers: {'Content-Type': 'application/json', 'x-auth-token': token},
        }).then(({data}) => {
          let gdata = data.sumArray;
          console.log(gdata);
          console.log(gdata.slice(-10));

          setGraphData(gdata.slice(-10));
        });
      });
      return () => {
        source.cancel('Get req canceled');
      };
    }, [UpdateGraph]);
    return (
      <BottomSheet
        bottomSheerColor="#FFFFFF"
        // backDropColor="red"
        ref={bottomSheet}
        initialPosition={'0%'}
        snapPoints={snapPoints}
        isBackDrop={true}
        isBackDropDismissByPress={true}
        isRoundBorderWithTipHeader={true}
        keyboardAware
        // isModal
        containerStyle={{
          backgroundColor: '#fff',
          marginHorizontal: 10,
        }}
        // tipStyle={{backgroundColor: 'red'}}
        // headerStyle={{backgroundColor:"red"}}
        // bodyStyle={{backgroundColor:"red",flex:1}}
        header={
          <View>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Report</Text>
          </View>
        }
        body={
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {graphData.length <= 0 ? (
              <LineChart
                withHorizontalLines={false}
                withVerticalLabels={false}
                withHorizontalLabels={false}
                // withOuterLines={false}
                data={GraphData}
                width={sizes.width * 0.92}
                height={220}
                chartConfig={chartConfig}
              />
            ) : (
              <LineChart
                withHorizontalLines={false}
                withVerticalLabels={false}
                withHorizontalLabels={false}
                // withOuterLines={false}
                data={{
                  labels: [],
                  datasets: [
                    {
                      data: graphData,
                      datasets: [
                        {
                          data: GraphData,
                          color: (opacity = 1) => colors.primary, // optional
                          strokeWidth: 2, // optional
                        },
                      ],
                      color: (opacity = 1) => colors.primary, // optional
                      strokeWidth: 2, // optional
                    },
                  ],
                }}
                width={sizes.width * 0.92}
                height={220}
                chartConfig={chartConfig}
              />
            )}
            <View
              style={{
                zIndex: 10,
                marginTop: 10,
                marginLeft: 50,
                alignSelf: 'flex-start',
              }}>
              {/* <MoodHistory name={'HAPPY'} dateAndTime={'12th May 9:09pm'} />
              <MoodHistory name={'RELAXED'} dateAndTime={'12th May 9:09pm'} />
              <MoodHistory name={'UNSURE'} dateAndTime={'12th May 9:09pm'} />
              <MoodHistory name={'ANGRY'} dateAndTime={'12th May 9:09pm'} /> */}
            </View>
          </View>
        }
      />
    );
  };
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
          <Text style={Styles.title}>{CourseTitle}</Text>
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
        </Text> */}
        {MCQS?.mcqs.length > 0 ? (
          <Questions
            onOpenBottomSheetHandler={onOpenBottomSheetHandler}
            setUpdateGraph={setUpdateGraph}
            data={MCQS.mcqs}
            CourseTitle={CourseTitle}
          />
        ) : (
          <View>
            {CourseData?.map((course, i) => (
              <View key={i}>
                {course?.video !== undefined && (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('VideoPlayer', {video: course.video});
                    }}
                    key={i}
                    style={Styles.introvideo}>
                    <FastImage
                      style={Styles.playBtn}
                      source={require('../../assets/playButton.png')}
                    />
                    <FastImage
                      style={Styles.VideoThumbnail}
                      source={{uri: course.thumbnail}}
                    />
                  </TouchableOpacity>
                )}
                {course?.img !== undefined && (
                  <View style={{paddingHorizontal: 10}}>
                    <AutoHeightImage width={350} source={{uri: course.img}} />
                    {/* <FastImage width={350} source={{uri: img}} /> */}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
        <View style={{margin: 60}} />
      </ScrollView>
      {MCQS?.mcqs.length > 0 && <Graph UpdateGraph={UpdateGraph} />}
    </SafeAreaView>
  );
};

export default PaidSubCourse;
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
    height: sizes.height * 0.7,
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
  MoodHistory: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  MoodHistoryText: {
    marginHorizontal: 3,
    fontWeight: 'bold',
    textAlignVertical: 'bottom',
    fontSize: 14,
  },
  MoodHistoryNameText: {
    textTransform: 'uppercase',
    borderBottomWidth: 2,

    padding: 0,
  },
});

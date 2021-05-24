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

const Questions = ({data, onOpenBottomSheetHandler}) => {
  const QuestionsInput = data;
  console.log(QuestionsInput);
  const Question = ({q, index}) => {
    console.log(QuestionsInput);

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
                QuestionsInput[index].answer = o.value;
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

  return (
    <View>
      {data.map((q, index) => (
        <Question key={index} q={q} index={index} />
      ))}
      <View
        style={{alignItems: 'center', justifyContent: 'center', marginTop: 50}}>
        <TouchableOpacity
          onPress={() => {
            console.log(QuestionsInput);
          }}
          style={{
            backgroundColor: colors.secondary,
            width: 200,
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            marginBottom: 10,
          }}>
          <Text style={{color: '#fff', fontSize: 16}}>SUBMIT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onOpenBottomSheetHandler(2);
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
const MoodHistory = ({name, dateAndTime}) => {
  const [BColor, setBColor] = useState(colors.secondary);
  useEffect(() => {
    switch (name) {
      case 'HAPPY' || 'EXCITED' || 'GRATEFUL':
        setBColor('greenyellow');
        break;
      case 'RELAXED' || 'CONTENT' || 'TIRED':
        setBColor('yellowgreen');
        break;
      case 'UNSURE' || 'BORED' || 'ANXIOUS':
        setBColor('#ffc703');
        break;
      case 'ANGRY' || 'STRESSED' || 'SAD':
        setBColor('red');
        break;
      default:
        break;
    }
  }, [name]);
  return (
    <View style={Styles.MoodHistory}>
      <Text
        style={[
          Styles.MoodHistoryText,
          Styles.MoodHistoryNameText,
          {borderColor: BColor},
        ]}>
        {name}
      </Text>
      <Text style={Styles.MoodHistoryText}>{dateAndTime}</Text>
    </View>
  );
};
const PaidSubCourse = ({navigation, route}) => {
  console.log(route.params);
  const CourseTitle = route.params.CourseTitle;
  const image = route.params.image;
  const CourseData = route.params.data;
  const MCQS = route.params.mcq;
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
  const GraphData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
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
            data={MCQS.mcqs}
          />
        ) : (
          <View>
            {CourseData?.map((course, i) => (
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
            ))}
          </View>
        )}
        <View style={{margin: 60}} />
      </ScrollView>
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
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Header</Text>
          </View>
        }
        body={
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
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
            <View
              style={{
                zIndex: 10,
                marginTop: 10,
                marginLeft: 50,
                alignSelf: 'flex-start',
              }}>
              <MoodHistory name={'HAPPY'} dateAndTime={'12th May 9:09pm'} />
              <MoodHistory name={'RELAXED'} dateAndTime={'12th May 9:09pm'} />
              <MoodHistory name={'UNSURE'} dateAndTime={'12th May 9:09pm'} />
              <MoodHistory name={'ANGRY'} dateAndTime={'12th May 9:09pm'} />
            </View>
          </View>
        }
      />
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

import React, {useState} from 'react';
import {
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

const Questions = ({data}) => {
  const QuestionsInput = data;
  const bottomSheet = React.useRef();
  const onOpenBottomSheetHandler = (index) => {
    console.log(bottomSheet);
    bottomSheet.current.snapTo(index);
  };

  const Question = ({q, index}) => {
    const Options = [
      'Not at All',
      'Some Days',
      'Lots of the Days',
      'All the Time',
    ];
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
        <Text style={QuestionStyles.question}>{`${q.id}. ${q.question}`}</Text>
        <View style={QuestionStyles.options}>
          {Options.map((o, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                setActiveQuestion(i + 1);
                console.log(i);
                QuestionsInput[index].answer = o;
              }}
              style={[
                QuestionStyles.option,
                parseInt(ActiveQuestion) === i + 1 &&
                  QuestionStyles.activeOption,
              ]}>
              <Text style={QuestionStyles.optionText}>{o}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };
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
            onOpenBottomSheetHandler(3);
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
        <View style={{marginTop: 50}}>
          <LineChart
            withHorizontalLines={false}
            withVerticalLabels={false}
            withHorizontalLabels={false}
            // withOuterLines={false}
            data={GraphData}
            width={sizes.width}
            height={220}
            chartConfig={chartConfig}
          />
        </View>
      </View>
    </View>
  );
};

const PaidSubCourse = ({navigation, route}) => {
  const CourseTitle = route.params.CourseTitle;
  const image = route.params.image;
  const CourseData = route.params.data;
  console.log(route.params);
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
        <Text style={Styles.bodyTitles}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, error
          dolor repudiandae magnam consequatur iusto laborum reiciendis! Esse
          veniam labore nulla assumenda? Quos modi quo, nisi deserunt id esse
          sed adipisci dolores? Debitis molestias nostrum facilis ullam
          distinctio magni maiores neque dolore explicabo id, nam odio unde
          nulla aliquid repellat?
        </Text>
        {CourseData?.data[0]?.question ? (
          <Questions data={CourseData.data} />
        ) : (
          <View>
            <TouchableOpacity style={Styles.introvideo}>
              <FastImage
                style={Styles.playBtn}
                source={require('../../assets/playButton.png')}
              />
            </TouchableOpacity>
          </View>
        )}
        <View style={{margin: 60}} />
      </ScrollView>
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
});

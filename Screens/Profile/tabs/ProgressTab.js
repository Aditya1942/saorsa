import React, {useEffect, useState} from 'react';
import {ScrollView, View, Text} from 'react-native';
import {PieChart} from 'react-native-svg-charts';
import {Text as SvgText} from 'react-native-svg';
import {colors, sizes} from '../../../Constants';
import {BarChart} from 'react-native-chart-kit';
import {StyleSheet} from 'react-native';
import axios from '../../Auth/axios';
import {getUserAuthToken} from '../../Auth/auth';

const PieChartSteps = ({PieChartStepsData}) => {
  var completedStep = 0;
  PieChartStepsData.forEach((e, i) => {
    if (e.percentage >= 100) {
      completedStep = i + 1;
    }
  });
  const data = [
    {
      key: 1,
      amount: 1,
      svg: {
        fill:
          PieChartStepsData[0].percentage === 100
            ? colors.secondary
            : colors.primary,
      },
      arc:
        PieChartStepsData[0].percentage === 100
          ? {
              outerRadius: '125%',
              innerRadius: '100%',
            }
          : {},
      step: 'Step 1',
      name: 'Emotinal Awareness',
    },
    {
      key: 2,
      amount: 1,
      svg: {
        fill:
          PieChartStepsData[1].percentage === 100
            ? colors.secondary
            : colors.primary,
      },
      arc:
        PieChartStepsData[1].percentage === 100
          ? {
              outerRadius: '125%',
              innerRadius: '100%',
            }
          : {},
      step: 'Step 2',
      name: 'Managing Uncertainty,Worry & Anxiety',
    },
    {
      key: 3,
      amount: 1,
      svg: {
        fill:
          PieChartStepsData[2].percentage === 100
            ? colors.secondary
            : colors.primary,
      },
      arc:
        PieChartStepsData[2].percentage === 100
          ? {
              outerRadius: '125%',
              innerRadius: '100%',
            }
          : {},
      step: 'Step 3',
      name: 'Learning to Self Soothe',
    },
    {
      key: 4,
      amount: 1,
      svg: {
        fill:
          PieChartStepsData[3].percentage === 100
            ? colors.secondary
            : colors.primary,
      },
      arc:
        PieChartStepsData[3].percentage === 100
          ? {
              outerRadius: '125%',
              innerRadius: '100%',
            }
          : {},
      step: 'Step 4',
      name: 'Changing Unhealthy Behaviour',
    },
    {
      key: 5,
      amount: 1,
      svg: {
        fill:
          PieChartStepsData[4].percentage === 100
            ? colors.secondary
            : colors.primary,
      },
      arc:
        PieChartStepsData[4].percentage === 100
          ? {
              outerRadius: '125%',
              innerRadius: '100%',
            }
          : {},
      step: 'Step 5',
      name: 'Sleep Better',
    },
  ];
  const Labels = (lableData) => {
    return (
      <View key={1}>
        <SvgText
          fill={'black'}
          y={-15}
          textAnchor={'middle'}
          alignmentBaseline={'middle'}
          fontSize={24}
          stroke={'black'}
          strokeWidth={0.2}>
          {`${PieChartStepsData[completedStep].step}`}
        </SvgText>
        <SvgText
          y={10}
          fill={'black'}
          textAnchor={'middle'}
          alignmentBaseline={'middle'}
          fontSize={14}
          stroke={'black'}
          strokeWidth={0.2}>
          {`${PieChartStepsData[completedStep].percentage}% Completed`}
        </SvgText>
      </View>
    );
  };
  return (
    <View>
      <PieChart
        style={{height: 300}}
        valueAccessor={({item}) => item.amount}
        data={data}
        spacing={0}
        innerRadius={'75%'}
        outerRadius={'65%'}>
        <Labels data={data} />
      </PieChart>
    </View>
  );
};
const BarChartProgress = ({data}) => {
  const data2 = {
    labels: ['STEP 1', 'STEP 2', 'STEP 3', 'STEP 4', 'STEP 5'],
    datasets: [
      {
        data: data,
        colors: [
          (opacity = 1) => 'red',
          (opacity = 1) => 'blue',
          (opacity = 1) => 'green',
          (opacity = 1) => 'purple',
          (opacity = 1) => 'grey',
          (opacity = 1) => 'yellow',
          (opacity = 1) => '#500000',
        ],
      },
    ],
    barColors: ['#dfe4ea', '#ced6e0', '#a4b0be'],
  };
  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    backgroundGradientFromOpacity: 1,
    backgroundGradientToOpacity: 5,
    color: (opacity = 1) => 'black',
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    labelColor: (opacity = 1) => 'black',
    useShadowColorFromDataset: false, // optional
    propsForLabels: {
      fontSize: '9',
    },
  };

  return (
    <View style={ProgressTabStyle.graph}>
      <BarChart
        data={data2}
        chartConfig={chartConfig}
        width={sizes.width}
        withVerticalLabels
        withHorizontalLabels={false}
        withCustomBarColorFromData
        showBarTops
        flatColor
        height={220}
        fromZero
      />
    </View>
  );
};
const StepDetails = ({title, percentage, list}) => {
  return (
    <View>
      <Text style={ProgressTabStyle.StepDetailsTitle}>{title}</Text>
      <Text style={ProgressTabStyle.StepDetailsPr}>{percentage}</Text>
      <View>
        {list.length > 0 &&
          list.map((item) => (
            <Text key={item.id} style={ProgressTabStyle.StepDetailsList}>
              {`\u2022  ${item.value}`}
            </Text>
          ))}
        {/* <FlatList
          data={list}
          renderItem={({item}) => (
          )}
        /> */}
      </View>
    </View>
  );
};
export const ProgressTab = () => {
  const [ProgressData, setProgressData] = useState([]);
  const [StepDetailsData, setStepDetailsData] = useState([]);
  const [barGraphData, setBarGraphData] = useState([]);
  const StepName = [
    {name: 'Step 1', title: 'Emotional Awareness'},
    {name: 'Step 2', title: 'Managing Uncertainty,Worry & Anxiety'},
    {name: 'Step 3', title: 'Learning to Self Soothe'},
    {name: 'Step 4', title: 'Changing Unhealthy Behaviour'},
    {name: 'Step 5', title: 'Sleep Better'},
  ];
  useEffect(() => {
    const barGraphDataFunction = (data) => {
      let temp = [];
      data.progressArray.forEach((e) => {
        // if (e.step === 'STEP 1' ||) temp.push((e.percentage = 100));
        // else
        temp.push(e.percentage);
      });
      console.log(temp);
      return temp;
    };
    const StepDetailsFunction = (data) => {
      let temp = [];
      data.progressArray.forEach((e) => {
        let tempstep = {
          Step: e.step,
          percentage: e.percentage,
          courses: [],
        };
        e.courses.forEach((c) => {
          let lettempCourse = {id: c._id, value: c.course};
          if (c.done > 0) {
            tempstep.courses.push(lettempCourse);
          }
        });
        temp.push(tempstep);
      });
      console.log(temp);
      return temp;
    };
    getUserAuthToken().then((token) => {
      console.log('token', token);
      axios({
        method: 'get',
        url: '/api/progress',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      }).then((e) => {
        console.log(e.data.progressArray);

        setProgressData(e.data.progressArray);
        setBarGraphData(barGraphDataFunction(e.data));
        setStepDetailsData(StepDetailsFunction(e.data));
      });
    });
  }, []);
  return (
    <ScrollView style={ProgressTabStyle.mainContainer}>
      <Text style={{position: 'absolute', top: 0}}>Progress Report</Text>
      {/* Circular progress steps  */}
      {ProgressData.length > 0 && (
        <PieChartSteps PieChartStepsData={ProgressData} />
      )}
      {/* Bar graph multi color  */}
      {barGraphData.length > 0 && <BarChartProgress data={barGraphData} />}
      <View style={ProgressTabStyle.StepDetailsMain}>
        {/* progress StepDetails */}
        {ProgressData.length > 0 &&
          StepDetailsData?.map((progress, i) => (
            <StepDetails
              key={i}
              title={`${progress.Step}: ${StepName[i].title}`}
              percentage={`${progress.percentage}% Completed`}
              list={progress.courses}
            />
          ))}
      </View>
      <View style={{paddingBottom: 400}} />
    </ScrollView>
  );
};
const ProgressTabStyle = StyleSheet.create({
  mainContainer: {backgroundColor: '#fff', padding: 10, borderRadius: 25},

  graph: {
    position: 'relative',
    right: 50,
  },
  StepDetailsMain: {
    padding: 20,
  },
  StepDetailsTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  StepDetailsPr: {
    fontSize: 16,
    marginBottom: 10,
  },
  StepDetailsList: {
    fontSize: 15,
    marginBottom: 2,
  },
});

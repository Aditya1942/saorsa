import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import {PieChart} from 'react-native-svg-charts';
import {Text as SvgText} from 'react-native-svg';
import {colors, sizes} from '../../../Constants';
import {BarChart} from 'react-native-chart-kit';
import {StyleSheet} from 'react-native';
import {FlatList} from 'react-native';
const PieChartSteps = () => {
  const data = [
    {
      key: 1,
      amount: 1,
      svg: {fill: colors.secondary},
      arc: {outerRadius: '125%', innerRadius: '100%'},
      step: 'Step 1',
      name: 'Emotinal Awareness',
    },
    {
      key: 2,
      amount: 1,
      svg: {fill: colors.primary},
      step: 'Step 2',
      name: 'Emotinal Awareness',
    },
    {
      key: 3,
      amount: 1,
      svg: {fill: colors.primary},
      step: 'Step 3',
      name: 'Emotinal Awareness',
    },
    {
      key: 4,
      amount: 1,
      svg: {fill: colors.primary},
      step: 'Step 4',
      name: 'Emotinal Awareness',
    },
    {
      key: 5,
      amount: 1,
      svg: {fill: colors.primary},
      step: 'Step 5',
      name: 'Emotinal Awareness',
    },
    {
      key: 6,
      amount: 1,
      svg: {fill: colors.primary},
      step: 'Step 6',
      name: 'Emotinal Awareness',
    },
  ];
  const Labels = ({data}) => {
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
          {data[0].step}
        </SvgText>
        <SvgText
          y={10}
          fill={'black'}
          textAnchor={'middle'}
          alignmentBaseline={'middle'}
          fontSize={14}
          stroke={'black'}
          strokeWidth={0.2}>
          {data[0].name}
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
const BarChartProgress = () => {
  const data2 = {
    labels: [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thusday',
      'friday',
      'today',
    ],
    datasets: [
      {
        data: [80, 45, 55, 80, 99, 43, 50],
        colors: [
          (opacity = 1) => `red`,
          (opacity = 1) => `blue`,
          (opacity = 1) => `green`,
          (opacity = 1) => `purple`,
          (opacity = 1) => `#500000`,
          (opacity = 1) => `yellow`,
          (opacity = 1) => `grey`,
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
    color: (opacity = 1) => `black`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    labelColor: (opacity = 1) => `black`,
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
        withVerticalLabels={true}
        withHorizontalLabels={false}
        withCustomBarColorFromData={true}
        flatColor={true}
        height={220}
        fromZero={true}
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
        {list.map((item) => (
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
  return (
    <ScrollView style={ProgressTabStyle.mainContainer}>
      <Text style={{position: 'absolute', top: 0}}>Progress Report</Text>
      {/* Circular progress steps  */}
      <PieChartSteps />
      {/* Bar graph multi color  */}
      <BarChartProgress />
      <View style={ProgressTabStyle.StepDetailsMain}>
        {/* progress StepDetails */}
        <StepDetails
          title="Step&nbsp;1:&nbsp;Emotinal&nbsp;Awareness"
          percentage="80%&nbsp;Completed"
          list={[
            {id: 1, value: 'Feelings Wheel'},
            {id: 2, value: 'Feelings Wheel 2'},
          ]}
        />
      </View>
      <View style={{paddingBottom: 400}}></View>
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
    fontSize: 20,
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

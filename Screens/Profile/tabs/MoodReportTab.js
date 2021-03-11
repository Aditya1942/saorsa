import React from 'react';
import {TouchableOpacity} from 'react-native';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {colors, sizes} from '../../../Constants';
export const MoodReportTab = () => {
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
  };
  const data = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
    datasets: [
      {
        data: [10, 30, 20, 40, 45, 35, 48, 50],
        color: (opacity = 1) => `black`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ['Mood Report'], // optional
  };
  return (
    <ScrollView style={MoodReportStyle.mainContainer}>
      <View style={MoodReportStyle.body}>
        <View style={MoodReportStyle.graph}>
          <TouchableOpacity>
            <LineChart
              data={data}
              width={sizes.width / 1.15}
              height={220}
              chartConfig={chartConfig}
              style={{backgroundColor: 'grey'}}
            />
          </TouchableOpacity>
        </View>

        <MoodHistory />
        <MoodHistory />
        <MoodHistory />
        <MoodHistory />
        <MoodHistory />
        <MoodHistory />
      </View>
    </ScrollView>
  );
};
const MoodHistory = () => {
  return (
    <View style={MoodReportStyle.MoodHistory}>
      <Text
        style={{
          ...MoodReportStyle.MoodHistoryText,
          ...MoodReportStyle.MoodHistoryNameText,
        }}>
        Happy
      </Text>
      <Text style={MoodReportStyle.MoodHistoryText}>28rd Feb </Text>
      <Text style={MoodReportStyle.MoodHistoryText}>12:01am </Text>
    </View>
  );
};
const MoodReportStyle = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 20,
  },
  body: {
    height: '100%',
    paddingBottom: 450,
    // backgroundColor: 'grey',
    overflow: 'hidden',
  },
  graph: {
    position: 'relative',
    right: 20,
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
    borderBottomWidth: 3,
    borderColor: colors.secondary,
    padding: 0,
  },
});

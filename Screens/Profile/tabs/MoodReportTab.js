import React, {useEffect, useState} from 'react';
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
import {getUserAuthToken} from '../../Auth/auth';
import axios from '../../Auth/axios';
import {useFocusEffect} from '@react-navigation/core';

export const MoodReportTab = ({navigation}) => {
  const [MoodhistoryData, setMoodhistoryData] = useState([]);
  const [loginToken, setLoginToken] = useState('');
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
  const setTriggerMoodUpdateFromMainFun = async () => {
    // format date
    function formatDate(date) {
      let day = date.getDate();
      if (day === 1) {
        day = day + 'st';
      } else if (day === 2) {
        day = day + 'nd';
      } else if (day === 3) {
        day = day + 'rd';
      } else {
        day = day + 'th';
      }
      var month_names_short = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];

      const options = {month: 'short'};

      let month = month_names_short[date.getMonth()];
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      var strTime = hours + ':' + minutes + ampm;
      return day + ' ' + month + ' ' + strTime;
    }
    await axios({
      method: 'get',
      url: 'api/mood/all',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': loginToken,
      },
    }).then(({data}) => {
      var moodDateAndTime = new Array();
      try {
        // add only last two mood history
        for (let i = 1; i < 10; i++) {
          var dateObject = new Date(data[data.length - i].date);
          // format date according
          let dateAndTime = formatDate(dateObject);
          // date object
          let moodDateAndTimeObject = {
            id: data[data.length - i]._id,
            moodType: data[data.length - i].mood.toUpperCase(),
            rating: data[data.length - i].rating,
            dateAndTime: dateAndTime,
            date: data[data.length - i].date,
          };
          moodDateAndTime.push(moodDateAndTimeObject);
          console.log('moodDateAndTimeObject', moodDateAndTime);
        }
      } catch (error) {
        console.log('error', error);
      }
      setMoodhistoryData(moodDateAndTime);
      console.log('MoodhistoryData', moodDateAndTime);
    });
  };
  useFocusEffect(
    React.useCallback(() => {
      console.log('object', navigation);
      getUserAuthToken().then((token) => {
        setLoginToken(token);
        console.log('Profile Mood', loginToken);
        setTriggerMoodUpdateFromMainFun();
      });
    }, [loginToken]),
  );
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
        {MoodhistoryData.map((mood) => (
          <MoodHistory
            key={mood.id}
            name={mood.moodType}
            dateAndTime={mood.dateAndTime}
          />
        ))}
      </View>
    </ScrollView>
  );
};
const MoodHistory = ({name, dateAndTime}) => {
  return (
    <View style={MoodReportStyle.MoodHistory}>
      <Text
        style={{
          ...MoodReportStyle.MoodHistoryText,
          ...MoodReportStyle.MoodHistoryNameText,
        }}>
        {name}
      </Text>
      <Text style={MoodReportStyle.MoodHistoryText}>{dateAndTime}</Text>
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

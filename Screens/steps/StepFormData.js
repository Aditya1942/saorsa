import {useFocusEffect} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
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
import {colors, sizes} from '../../Constants';
import {getUserAuthToken} from '../Auth/auth';
import axios, {CancelToken} from '../Auth/axios';
const StepFormDataDetails = ({id, Fdata}) => {
  const loop = ['1', '2', '3', '4', '5', '6', '7'];
  console.log(id, Fdata);
  return (
    <View>
      {loop.map((e, i) => (
        <View key={e} style={{marginVertical: 20}}>
          <View>
            <Text
              style={{
                width: sizes.width * 0.75,
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
                color: 'white',
                backgroundColor: colors.secondary,
                paddingHorizontal: 20,
                fontSize: 18,
              }}>
              {Fdata[id].questions[i]}
            </Text>
          </View>
          <Text style={{paddingHorizontal: 20, color: 'white', fontSize: 16}}>
            {Fdata[id].answers[i].ans}
          </Text>
        </View>
      ))}
      <View style={{marginTop: 100}} />
    </View>
  );
};

const StepFormData = ({navigation, route}) => {
  const stepName = route.params?.stepName;
  const description = route.params?.description;
  const image = route.params?.image;
  const [Detailpage, setDetailpage] = useState(false);
  const [DetailpageId, setDetailpageId] = useState(0);
  const [data, setdata] = useState([]);

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
    return day + ' ' + month;
  }
  useEffect(() => {
    getUserAuthToken().then((token) => {
      console.log(token);
      axios({
        url: '/api/formsubmit/4d',
        method: 'get',
        headers: {'Content-Type': 'application/json', 'x-auth-token': token},
      })
        .then((res) => {
          console.log(res.data);
          setdata(res.data.qnaResponses);
        })
        .catch((err) => {
          console.error(err);
        });
    });
    return () => {};
  }, []);
  const viewDetailPage = (id) => {
    console.log(id);
    setDetailpageId(id);
    setDetailpage(true);
  };
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // if (navigation.canGoBack()) {
        if (Detailpage) {
          setDetailpage(false);
        } else {
          navigation.goBack();
        }
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [Detailpage, navigation]),
  );
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}>
      <ImageBackground source={{uri: image}} style={StepCourseStyles.headerImg}>
        <View style={StepCourseStyles.header}>
          <Header navigation={navigation} />
        </View>
        <View style={StepCourseStyles.headerText}>
          <Text style={StepCourseStyles.title}>{stepName}</Text>
          <Text style={StepCourseStyles.titleDescription}>{description}</Text>
        </View>
      </ImageBackground>
      <ScrollView style={StepCourseStyles.body}>
        <View style={{marginTop: 30}} />
        {Detailpage ? (
          <StepFormDataDetails id={DetailpageId} Fdata={data} />
        ) : (
          <View style={{paddingHorizontal: 10}}>
            {data.length > 0 &&
              data.map((e, index) => {
                var dateObject = new Date(e.date);

                let date = formatDate(dateObject);
                return (
                  <TouchableOpacity
                    onPress={() => {
                      viewDetailPage(index);
                    }}
                    key={e._id}
                    style={{
                      height: 40,
                      paddingHorizontal: 10,
                      backgroundColor: colors.secondary,
                      marginVertical: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        alignSelf: 'center',
                        fontSize: 18,
                      }}>
                      {date.toUpperCase()}
                      {': Action Plan'}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
const StepCourseStyles = StyleSheet.create({
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
    justifyContent: 'center',
    color: 'black',
    backgroundColor: 'rgba(0, 0, 0,0.3)',
    alignContent: 'flex-end',
  },
  title: {
    // color: 'black',
    color: '#fff',
    fontFamily: 'AvenirLTStd-Black',
    fontSize: 30,
    fontWeight: 'bold',
  },
  titleDescription: {
    color: '#fff',
    padding: 10,
    paddingHorizontal: 20,
    fontFamily: sizes.fontFamily,
    fontSize: sizes.title,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default StepFormData;

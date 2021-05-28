import {useFocusEffect} from '@react-navigation/core';
import React, {useState} from 'react';
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

const StepFormDataDetails = ({id}) => {
  const Data = [
    {
      id: 1,
      title: 'Title 1 ',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic quia ipsam nisi quam nihil veniam sed explicabo in? Consequuntur, aperiam?',
    },
    {
      id: 2,
      title: 'Title 2',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic quia ipsam nisi quam nihil veniam sed explicabo in? Consequuntur, aperiam?',
    },
    {
      id: 3,
      title: 'Title 3',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic quia ipsam nisi quam nihil veniam sed explicabo in? Consequuntur, aperiam?',
    },
  ];
  console.log(Data[0].title.length);
  return (
    <View>
      {Data.map((data, i) => (
        <View key={i} style={{marginVertical: 20}}>
          <View style={{}}>
            <Text
              style={{
                width: sizes.width * 0.7,
                color: 'white',
                backgroundColor: colors.secondary,
                paddingHorizontal: 20,
                fontSize: 18,
              }}>
              {data.title}
            </Text>
          </View>
          <Text style={{paddingHorizontal: 20, color: 'white', fontSize: 16}}>
            {data.description}
          </Text>
        </View>
      ))}
    </View>
  );
};

const StepFormData = ({navigation, route}) => {
  const stepName = route.params?.stepName;
  const description = route.params?.description;
  const image = route.params?.image;
  const [Detailpage, setDetailpage] = useState(false);
  const [DetailpageId, setDetailpageId] = useState(0);
  const data = [
    {id: 1, date: '20th may'},
    {id: 2, date: '11th may'},
    {id: 3, date: '10th may'},
  ];
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
          <StepFormDataDetails id={DetailpageId} />
        ) : (
          <View style={{paddingHorizontal: 10}}>
            {data.map((e) => (
              <TouchableOpacity
                onPress={() => {
                  viewDetailPage(e.id);
                }}
                key={e.id}
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
                  style={{color: 'white', alignSelf: 'center', fontSize: 18}}>
                  {e.date.toUpperCase()}
                  {': Action Plan'}
                </Text>
              </TouchableOpacity>
            ))}
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

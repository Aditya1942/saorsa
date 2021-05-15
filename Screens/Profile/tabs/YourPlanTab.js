import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../Constants';
import headingImg from '../../../assets/yourPlaneHeadingPic.png';
import FastImage from 'react-native-fast-image';
const SmallBox = ({title, body, footer}) => {
  return (
    <View style={YourPlanTabStyle.smallBox}>
      <Text style={YourPlanTabStyle.smallBoxTitle}>{title}</Text>
      <Text style={YourPlanTabStyle.smallBoxbody}>{body}</Text>
      {/* <Text style={YourPlanTabStyle.smallBoxFooter}>{footer}</Text> */}
    </View>
  );
};
const BigBox = ({title, body, footer}) => {
  return (
    <View style={YourPlanTabStyle.bigBox}>
      <Text style={YourPlanTabStyle.bigBoxTitle}>{title}</Text>
      <Text style={YourPlanTabStyle.bigBoxbody}>{body}</Text>
      {/* <Text style={YourPlanTabStyle.bigBoxFooter}>{footer}</Text> */}
    </View>
  );
};

export const YourPlanTab = () => {
  const [boxData, setBoxData] = useState([
    {
      id: 1,
      title: 'Self Care',
      body:
        'In this section think about the interventions you have learned during the emotional regulation course. Refer back to the Behavioural Change section and choose what activates you would like to do that would ensure you are caring for yourself',
      footer: 'Some footer text',
    },
    {
      id: 2,
      title: 'Interventions to help me cope',
      body:
        'List down some of the interventions you have learned throughout the course with Saorsa. These include: Acknowledge emotions / Managing Uncertainty and Worry / self Soothe / changing Unhealthy bahaviour / Meditation and Relaxation',
      footer: 'Some footer text',
    },
    {
      id: 3,
      title: 'When things feet too much',
      body:
        '112 in the EU emergency number Whick works in all EU countries (alongside any pre-existing country-specific emergency number) \n911 is the US emergency number Which works accross North Anmerica and many US territories. \n999 is the UK emergency number Which also Works and in Former British colones and British overseas territories',
      footer: 'Some footer text',
    },
  ]);
  const [smallBoxData, setSmallBoxData] = useState([
    {
      id: 1,
      title: 'External trigger',
      body:
        'A trigger can be defined as a place, a person, an object or a situation. Take a movement and note down your own.',
      footer: 'Some footer text',
    },
    {
      id: 2,
      title: 'Internal trigger',
      body:
        'This is when we might start to be aware of our unhealthy thoughts, emotions and behaviours. Are you starting to lable yourself? note down what is comming for you.',
      footer: 'Some footer text',
    },
  ]);
  return (
    <ScrollView
      style={YourPlanTabStyle.mainContainer}
      contentContainerStyle={{flexGrow: 1}}>
      <View>
        <View style={YourPlanTabStyle.header}>
          <Image
            style={YourPlanTabStyle.headerImg}
            source={require('../../../assets/yourPlaneHeadingPic.png')}
          />
          <Text style={YourPlanTabStyle.headerText}>
            Create your own mental health plan
          </Text>
        </View>
        <View style={YourPlanTabStyle.body}>
          <View style={YourPlanTabStyle.smallBoxContainer}>
            {smallBoxData.map((data) => (
              <SmallBox
                key={data.id}
                title={data.title}
                body={data.body}
                footer={data.footer}
              />
            ))}
          </View>
          <View style={YourPlanTabStyle.bigBoxContainer}>
            {boxData.map((data) => (
              <BigBox
                key={data.id}
                title={data.title}
                body={data.body}
                footer={data.footer}
              />
            ))}
          </View>
          <View style={{paddingBottom: 400}}></View>
        </View>
      </View>
    </ScrollView>
  );
};
const YourPlanTabStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.secondary,
    borderRadius: 25,
  },
  // title
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 90,
    padding: 20,
  },
  headerImg: {width: 70, height: 60},
  headerText: {
    color: '#fff',
    fontSize: 13,
    marginTop: 5,
    textTransform: 'uppercase',
    fontFamily: 'AvenirLTStd-Book',
  },
  // body
  body: {
    marginVertical: 20,
    height: '100%',
  },

  // content small box
  smallBoxContainer: {
    // height: 165,
    flexDirection: 'row',
  },
  smallBox: {
    flex: 0.5,
    flexDirection: 'column',
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
    margin: 3,
    padding: 10,
    paddingTop: 15,
    borderRadius: 40,
  },
  smallBoxTitle: {
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontFamily: 'AvenirLTStd-Book',
  },
  smallBoxbody: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 12,
    color: 'black',
    flex: 1,
    lineHeight: 13,
    // fontFamily: 'AvenirLTStd-Book',
  },
  smallBoxFooter: {
    paddingHorizontal: 5,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '80%',
    alignSelf: 'center',
    textAlign: 'center',
    backgroundColor: 'rgb(170,170,170)',
    borderRadius: 10,
    marginTop: 10,
    color: '#fff',
    fontFamily: 'AvenirLTStd-Book',
  },
  // content big box
  bigBoxContainer: {marginTop: 15, height: '100%'},
  bigBox: {
    backgroundColor: '#fff',
    margin: 3,
    paddingVertical: 10,
    paddingTop: 15,
    paddingHorizontal: 20,
    borderRadius: 40,
  },
  bigBoxTitle: {
    alignSelf: 'flex-start',
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontFamily: 'AvenirLTStd-Book',
  },
  bigBoxbody: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 12,
    color: 'black',
    lineHeight: 17,
    // fontFamily: 'AvenirLTStd-Book',
  },
  bigBoxFooter: {
    paddingHorizontal: 5,
    width: '80%',
    alignSelf: 'center',
    textAlign: 'center',
    backgroundColor: 'rgb(170,170,170)',
    borderRadius: 10,
    marginTop: 20,
    color: '#fff',
    fontFamily: 'AvenirLTStd-Book',
  },
});

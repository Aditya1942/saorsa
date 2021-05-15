import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Header from '../../Components/Header';
import {colors, sizes} from '../../Constants';

const About = ({navigation}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 20,
      }}>
      <Header navigation={navigation} />
      <Text
        style={{
          fontSize: sizes.h1,
          color: '#fff',
          paddingTop: 10,
          fontFamily: 'AvenirLTStd-Black',
        }}>
        About Us
      </Text>
      <View style={styles.description}>
        <Text
          style={{
            fontSize: sizes.body,
            color: 'white',
            fontWeight: 'bold',
            fontFamily: 'AvenirLTStd-Black',
          }}>
          What is Emotional Regulation ?
        </Text>
        <Text
          style={{
            fontSize: sizes.caption + 1,
            color: 'white',
            fontFamily: 'AvenirLTStd-black',
            marginTop: 10,
          }}>
          Emotional Regulation is the ability to sit with and manage pleasant
          and unpleasant emotions. Emotional Regulation is a coping strategy
          which allows us to confront intentse emotions and difficult
          situations. When we can’t regulate our emotions (also known as
          Emotional dysregulation) we use unhelpful coping strategies to manage
          emotions. Dysregulation results in difficulties coping and processing
          the emotion. Which can resulting in us using unhelpful coping
          strategies (such as taking substances, binge eating, saying things we
          regret, self criticising or self harming).
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default About;
const styles = StyleSheet.create({
  description: {
    marginTop: 10,
    backgroundColor: colors.secondary,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
});

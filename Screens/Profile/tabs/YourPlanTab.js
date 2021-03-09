import React from 'react';
import {ScrollView, Text, View} from 'react-native';

export const YourPlanTab = () => {
  return (
    <ScrollView
      style={{
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 25,
      }}>
      <Text>Your Plan</Text>
      <View
        style={{
          marginBottom: 1000,
        }}></View>
    </ScrollView>
  );
};

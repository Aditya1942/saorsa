import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import {PieChart} from 'react-native-svg-charts';
import {Text as SvgText} from 'react-native-svg';
import {colors} from '../../../Constants';

export const ProgressTab = () => {
  const Labels = ({slices, height, width}) => {
    return slices.map((slice, index) => {
      const {labelCentroid, pieCentroid, data} = slice;
      return (
        <View key={index}>
          <SvgText
            fill={'black'}
            y={-15}
            textAnchor={'middle'}
            alignmentBaseline={'middle'}
            fontSize={24}
            stroke={'black'}
            strokeWidth={0.2}>
            {data.step}
          </SvgText>
          <SvgText
            y={10}
            fill={'black'}
            textAnchor={'middle'}
            alignmentBaseline={'middle'}
            fontSize={14}
            stroke={'black'}
            strokeWidth={0.2}>
            {data.name}
          </SvgText>
        </View>
      );
    });
  };
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
      step: 'Step 1',
      name: 'Emotinal Awareness',
    },
    {
      key: 3,
      amount: 1,
      svg: {fill: colors.primary},
      step: 'Step 1',
      name: 'Emotinal Awareness',
    },
    {
      key: 4,
      amount: 1,
      svg: {fill: colors.primary},
      step: 'Step 1',
      name: 'Emotinal Awareness',
    },
    {
      key: 5,
      amount: 1,
      svg: {fill: colors.primary},
      step: 'Step 1',
      name: 'Emotinal Awareness',
    },
    {
      key: 6,
      amount: 1,
      svg: {fill: colors.primary},
      step: 'Step 1',
      name: 'Emotinal Awareness',
    },
  ];
  return (
    <ScrollView
      style={{
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 25,
      }}>
      <Text style={{position: 'absolute', top: 0}}>Progress Report</Text>
      <PieChart
        style={{height: 300}}
        valueAccessor={({item}) => item.amount}
        data={data}
        spacing={0}
        innerRadius={'75%'}
        outerRadius={'65%'}>
        <Labels />
      </PieChart>
    </ScrollView>
  );
};

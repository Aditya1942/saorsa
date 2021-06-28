import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {colors} from '../Constants';

const SubmitBtn = ({onPress}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
      style={{
        backgroundColor: colors.secondary,
        width: 200,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginBottom: 10,
      }}>
      <Text style={{color: '#fff', fontSize: 16}}>SUBMIT</Text>
    </TouchableOpacity>
  );
};

export default SubmitBtn;

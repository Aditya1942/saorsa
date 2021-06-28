import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {colors} from '../Constants';

const Loader = ({Loading, setLoading}) => {
  return (
    <View
      style={{
        position: 'absolute',
        top: '50%',
        left: '45%',
        zIndex: 2,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator
        animating={Loading}
        color={colors.secondary}
        size="large"
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: 80,
        }}
      />
    </View>
  );
};

export default Loader;

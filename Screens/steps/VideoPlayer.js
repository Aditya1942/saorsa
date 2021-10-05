import React, {useEffect, useRef} from 'react';
import VideoPlayer from 'react-native-video-controls';
import {useFocusEffect} from '@react-navigation/core';
import {BackHandler} from 'react-native';

const VideoPlayerView = ({navigation, route}) => {
  const video = route.params.video;
  const player = useRef();
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        player.current.methods.togglePlayPause();
        // navigation.goBack();
        return false;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const whenGoBack = () => {
    console.log('BACK');
    player.current.methods.togglePlayPause();
    navigation.goBack();
  };
  return (
    <VideoPlayer
      source={{uri: video}}
      ref={player}
      navigator={navigation}
      fullscreenAutorotate
      onBack={whenGoBack}
    />
  );
};

// Later on in your styles..

export default VideoPlayerView;

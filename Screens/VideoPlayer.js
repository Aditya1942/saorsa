import React, {useState, useCallback, useRef, useEffect} from 'react';
import {Button, View, Alert} from 'react-native';
// import YoutubePlayer from 'react-native-youtube-iframe';

const VideoPlayer = () => {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);
  useEffect(() => {
    console.log(playerRef);
  }, []);
  const playerRef = useRef();
  const ScreenRotate = (isFullscreen) => {};
  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black',
      }}>
      {/* <YoutubePlayer
        height={300}
        ref={playerRef}
        play={playing}
        videoId={'z9bZufPHFLU'}
        initialPlayerParams={{
          vq: 'tiny',
        }}
        onChangeState={onStateChange}
        onFullScreenChange={(f) => console.log('fullscreen', f)}
      /> */}
      {/* <Button title={playing ? 'pause' : 'play'} onPress={togglePlaying} /> */}
    </View>
  );
};

export default VideoPlayer;

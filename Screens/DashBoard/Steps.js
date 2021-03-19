import React from 'react';
import {TouchableOpacity} from 'react-native';
import {TouchableHighlight} from 'react-native';
import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {colors, sizes, coursesImages} from '../../Constants';

const Steps = ({navigation}) => {
  console.log('navigation');
  return (
    <FlatList
      data={coursesImages}
      keyExtractor={(item) => item.id.toString()}
      initialNumToRender={6}
      horizontal
      style={{paddingTop: 10}}
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      snapToInterval={sizes.ITEM_WIDTH}
      contentContainerStyle={{paddingRight: sizes.SPACING * 2}}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Step', {
                id: index + 1,
                step: item.id,
                title: item.title,
              });
            }}>
            <View style={styles.courseItems}>
              <FastImage
                source={item.img}
                style={styles.courseImg}
                resizeMode={'cover'}
              />
              <View style={styles.courseTitle}>
                <Text
                  style={{
                    fontSize: sizes.body,
                    color: '#fff',
                    fontWeight: 'bold',
                    fontFamily: 'AvenirLTStd-Black',
                  }}>
                  {item.id}
                </Text>
                <Text
                  style={{
                    fontSize: sizes.caption,
                    color: '#fff',
                    fontFamily: 'AvenirLTStd-Book',
                  }}>
                  {item.title}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default Steps;

const styles = StyleSheet.create({
  courseItems: {
    width: sizes.ITEM_WIDTH,
    height: sizes.ITEM_HEIGHT,
    backgroundColor: colors.primary,
    marginRight: sizes.SPACING,
    borderRadius: 10,
    overflow: 'hidden',
  },
  courseImg: {
    width: '100%',
    height: '100%',
  },
  courseTitle: {
    position: 'absolute',
    bottom: 10,
    paddingHorizontal: 10,
  },
});

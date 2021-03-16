import React, {useState, useEffect} from 'react';

import {BottomMenuItem} from './BottomMenuItem';

import {
  View,
  TouchableOpacity,
  Dimensions,
  Animated,
  StyleSheet,
  Text,
} from 'react-native';

const MyTabBar = ({state, descriptors, navigation}) => {
  const [translateValue] = useState(new Animated.Value(0));
  const totalWidth = Dimensions.get('window').width;
  const tabWidth = totalWidth / state.routes.length;
  const animateSlider = (index) => {
    Animated.spring(translateValue, {
      toValue: index * tabWidth,
      velocity: 10,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    animateSlider(state.index);
  }, [state.index]);
  return (
    <View style={[styles.tabContainer, {width: totalWidth}]}>
      <View style={{flexDirection: 'row'}}>
        <Animated.View
          style={[
            styles.slider,
            {
              transform: [{translateX: translateValue}],
              width: tabWidth - 20,
            },
          ]}
        />
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const image = route.params.image ? route.params.image : null;
          const styless = route.params.style ? route.params.style : null;
          const middle = route.params.middle ? route.params.middle : null;

          //console.log(route.params)
          //console.log(options.tabBarIcon)

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }

            animateSlider(index);
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              key={index}>
              <BottomMenuItem
                isCurrent={isFocused}
                label={label}
                style={styless}
                image={image}
                middle={middle}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default MyTabBar;

const styles = StyleSheet.create({
  slider: {
    height: 3,
    position: 'absolute',
    bottom: 0,
    left: 10,
    backgroundColor: '#496AD1',
    borderRadius: 10,
  },
  tabContainer: {
    alignItems: 'center',
    height: Dimensions.get('window').height * 0.1,
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.0,
    backgroundColor: 'white',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    elevation: 10,
    position: 'absolute',
    bottom: 0,
  },
});

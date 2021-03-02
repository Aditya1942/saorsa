import {Dimensions} from 'react-native';
import {Component} from 'react/cjs/react.production.min';

export const colors = {
  primary: '#09386E',
  secondary: '#496AD1',
};

const {width, height} = Dimensions.get('window');

export const sizes = {
  // global sizes
  base: 16,
  font: 14,
  radius: 6,
  padding: 25,

  // font sizes
  h1: 26,
  h2: 20,
  h3: 18,
  title: 18,
  header: 16,
  body: 14,
  caption: 12,

  ITEM_WIDTH: width * 0.3,
  ITEM_HEIGHT: height * 0.2,
  SPACING: 5,
  height,
  width,
};

export const MoodImgs = [
  [
    {
      id: 1,
      name: 'happy',
      img: require('./assets/Moods/happy.png'),
    },
    {
      id: 2,
      name: 'excited',
      img: require('./assets/Moods/excited.png'),
    },
    {
      id: 3,
      name: 'grateful',
      img: require('./assets/Moods/grateful.png'),
    },
  ],
  [
    {
      id: 4,
      name: 'relaxed',
      img: require('./assets/Moods/relaxed.png'),
    },
    {
      id: 5,
      name: 'content',
      img: require('./assets/Moods/content.png'),
    },
    {
      id: 6,
      name: 'tired',
      img: require('./assets/Moods/tired.png'),
    },
  ],
  [
    {
      id: 7,
      name: 'unsure',
      img: require('./assets/Moods/unsure.png'),
    },
    {
      id: 8,
      name: 'bored',
      img: require('./assets/Moods/bored.png'),
    },
    {
      id: 9,
      name: 'anxious',
      img: require('./assets/Moods/anxious.png'),
    },
  ],
  [
    {
      id: 10,
      name: 'angry',
      img: require('./assets/Moods/angry.png'),
    },
    {
      id: 11,
      name: 'stressed',
      img: require('./assets/Moods/stressed.png'),
    },
    {
      id: 12,
      name: 'sad',
      img: require('./assets/Moods/sad.png'),
    },
  ],
];

export const coursesImages = [
  {
    id: 'Step 1',
    title: 'Emotional Awareness',
    img: require('./assets/New/s1.jpg'),
  },
  {
    id: 'Step 2',
    title: 'Managing Uncertainty,Worry & Anxiety',
    img: require('./assets/New/s2.jpg'),
  },
  {
    id: 'Step 3',
    title: 'Learning to Self Soothe',
    img: require('./assets/New/s3.jpg'),
  },
  {
    id: 'Step 4',
    title: 'Changing Unhealthy Behaviour',
    img: require('./assets/New/s4.jpg'),
  },
  {
    id: 'Step 5',
    title: 'Sleep Better',
    img: require('./assets/New/s5.jpg'),
  },
  {
    id: 'Step 6',
    title: 'Create your own emotional Wellbeing Plan',
    img: require('./assets/New/s6.jpg'),
  },
];

export const courses = [
  {
    id: '1',
    title: 'RELAXATION',
    img: require('./assets/Relax.png'),
    Component: 'Relaxation',
  },
  {
    id: '2',
    title: 'MINDFULLNESS',
    img: require('./assets/Mindfull.png'),
    Component: 'Mindfullness',
  },
  {
    id: '3',
    title: 'SLEEP',
    img: require('./assets/Sleep.png'),
    Component: 'Sleep',
  },
  {
    id: '4',
    title: 'DEPRESSION',
    img: require('./assets/Depression.png'),
    Component: 'Depression',
  },
  {
    id: '5',
    title: 'ANXIETY & STRESS',
    img: require('./assets/Stress.png'),
    Component: 'Anxiety',
  },
];

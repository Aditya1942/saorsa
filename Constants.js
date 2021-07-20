import {Dimensions} from 'react-native';
import {Component} from 'react/cjs/react.production.min';

// app colors
export const colors = {
  primary: '#09386E',
  secondary: '#496AD1',
};
// constant screen heightand width
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
  fontFamily: 'AvenirLTStd-Book',

  ITEM_WIDTH: width * 0.3,
  ITEM_HEIGHT: height * 0.2,
  SPACING: 5,
  height,
  width,
};
// imgs/icons for moodTracker
export const MoodImgs = [
  [
    {
      id: 1,
      name: 'happy',
      img: require('./assets/Moods/happy.png'),
      score: 16,
    },
    {
      id: 2,
      name: 'excited',
      img: require('./assets/Moods/excited.png'),
      score: 15,
    },
    {
      id: 3,
      name: 'grateful',
      img: require('./assets/Moods/grateful.png'),
      score: 14,
    },
  ],
  [
    {
      id: 4,
      name: 'relaxed',
      img: require('./assets/Moods/relaxed.png'),
      score: 13,
    },
    {
      id: 5,
      name: 'content',
      img: require('./assets/Moods/content.png'),
      score: 12,
    },
    {
      id: 6,
      name: 'tired',
      img: require('./assets/Moods/tired.png'),
      score: 11,
    },
  ],
  [
    {
      id: 7,
      name: 'unsure',
      img: require('./assets/Moods/unsure.png'),
      score: 10,
    },
    {
      id: 8,
      name: 'bored',
      img: require('./assets/Moods/bored.png'),
      score: 9,
    },
    {
      id: 9,
      name: 'anxious',
      img: require('./assets/Moods/anxious.png'),
      score: 8,
    },
  ],
  [
    {
      id: 10,
      name: 'angry',
      img: require('./assets/Moods/angry.png'),
      score: 7,
    },
    {
      id: 11,
      name: 'stressed',
      img: require('./assets/Moods/stressed.png'),
      score: 6,
    },
    {
      id: 12,
      name: 'sad',
      img: require('./assets/Moods/sad.png'),
      score: 5,
    },
  ],
];

// six steps course
export const coursesImages = [
  {
    id: 'Step 1',
    name: 'Step 1',
    title: 'Emotional Awareness',
    img: require('./assets/New/s1.jpg'),
  },
  {
    id: 'Step 2',
    name: 'Step 2',
    title: 'Managing Uncertainty,Worry & Anxiety',
    img: require('./assets/New/s2.jpg'),
  },
  {
    id: 'Step 3',
    name: 'Step 3',
    title: 'Learning to Self Soothe',
    img: require('./assets/New/s3.jpg'),
  },
  {
    id: 'Step 4',
    name: 'Step 4',
    title: 'Changing Unhealthy Behaviour',
    img: require('./assets/New/s4.jpg'),
  },
  {
    id: 'Step 5',
    name: 'Step 5',
    title: 'Sleep Better',
    img: require('./assets/New/s5.jpg'),
  },
  {
    id: 'Step 6',
    name: 'Step 6',
    title: 'Create your own emotional Wellbeing Plan',
    img: require('./assets/New/s6.jpg'),
  },
];

// courses
export const courses = [
  {
    id: '1',
    title: 'RELAXATION',
    img: require('./assets/Relax.png'),
    Component: 'RELAXATION',
    onPress: true,
  },
  {
    id: '2',
    title: 'MINDFULLNESS',
    img: require('./assets/Mindfull.png'),
    Component: 'Mindfullness',
    onPress: true,
  },
  {
    id: '3',
    title: 'SLEEP',
    img: require('./assets/Sleep.png'),
    Component: 'Sleep',
    onPress: true,
  },
  {
    id: '4',
    title: 'DEPRESSION',
    img: require('./assets/Depression.png'),
    Component: 'Depression',
    onPress: true,
  },
  {
    id: '5',
    title: 'ANXIETY & STRESS',
    img: require('./assets/Stress.png'),
    Component: 'ANXIETY & STRESS',
    onPress: true,
  },
];
export const paidCourse = [
  {
    id: 1,
    name: 'PATIENT HEALTH QUESTIONNAIRE',
    courseimage:
      'http://res.cloudinary.com/adarshsingh/image/upload/v1618010966/a7pelrhwgu3ij1dta2ov.png',
    locked: false,
    courses: {
      image:
        'http://res.cloudinary.com/adarshsingh/image/upload/v1618010966/a7pelrhwgu3ij1dta2ov.png',

      CourseTitle: 'PATIENT HEALTH QUESTIONNAIRE',
      data: [
        {question: 'Feeling Despairing or Hopeless?', id: 1},
        {question: 'Feeling Tired or having Little Energy?', id: 2},
        {question: ' Feeling Unhappy?', id: 3},
        {
          question: 'Experienced Little interest or Pleasure in doing things?',
          id: 4,
        },
        {
          question:
            'Experienced difficulty getting to Sleep or Staying Asleep?',
          id: 5,
        },
        {
          question:
            'I have felt I have someone to turn to for support when needed?',
          id: 6,
        },
      ],
    },
  },
  {
    id: 2,
    name: 'PATIENT HEALTH QUESTIONNAIRE',
    courseimage:
      'http://res.cloudinary.com/adarshsingh/image/upload/v1618010966/a7pelrhwgu3ij1dta2ov.png',
    locked: false,
    courses: {},
  },
  {
    id: 3,
    name: 'PATIENT HEALTH QUESTIONNAIRE',
    courseimage:
      'http://res.cloudinary.com/adarshsingh/image/upload/v1618010966/a7pelrhwgu3ij1dta2ov.png',
    locked: true,
    courses: {},
  },
];
// login
// http://localhost:4000/api/auth/ {email:"email",password:"password"}

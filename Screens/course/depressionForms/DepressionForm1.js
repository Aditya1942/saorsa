import React, {useEffect, useRef, useState} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../../Components/Header';
import SubmitBtn from '../../../Components/SubmitBtn';
import {colors, sizes} from '../../../Constants';
import {getUserAuthToken} from '../../Auth/auth';
import axios from '../../Auth/axios';
import DropdownAlert from 'react-native-dropdownalert';
import Loader from '../../../Components/Loader';

const DepressionForm1 = ({navigation, route}) => {
  var FormInput = [];
  const dropDownAlertRef = useRef();
  const [Loading, setLoading] = React.useState(true);

  const CourseTitle = route.params.CourseTitle;
  const image = route.params.image;
  const CourseData = route.params.data;
  const [Error, setError] = useState(false);
  useEffect(() => {
    setLoading(false);
  }, []);
  const convertPostArrayy = (arr) => {
    let questions = [];
    let answers = [];
    arr.forEach((element) => {
      questions.push(element[0]);
      answers.push({ans: element[1]});
    });
    let result = {
      questions,
      answers,
      name: CourseData[0].name,
    };
    return result;
  };

  const handleSubmit = () => {
    setLoading(true);

    let data = Object.entries(FormInput);

    if (data.length === CourseData[0].questions.length) {
      let PostData = convertPostArrayy(data);
      console.log(PostData);
      getUserAuthToken().then((token) => {
        setLoading(false);

        axios({
          url: '/api/formsubmit/',
          method: 'post',
          data: PostData,
          headers: {'Content-Type': 'application/json', 'x-auth-token': token},
        })
          .then((res) => {
            setLoading(false);

            console.log(res);
            if (res.status === 200) {
              dropDownAlertRef.current.alertWithType(
                'success',
                'Success',
                'Thought added successfully',
              );
            } else {
              dropDownAlertRef.current.alertWithType(
                'error',
                'Error',
                'Something Went wrong Try Again',
              );
            }
          })
          .catch((err) => {
            setLoading(false);

            console.log(err);
            dropDownAlertRef.current.alertWithType(
              'error',
              'Error',
              'Something Went wrong Try Again',
            );
          });
      });
      setError(false);
    } else {
      setError(true);
    }
  };
  const FormInputFeild = ({title, placeholder}) => {
    const handleChange = (e) => {
      FormInput[title] = e;
      if (e === '') {
        delete FormInput[title];
      }
    };
    return (
      <View style={Styles.bigBox}>
        <Text style={Styles.bigBoxTitle}>{title}</Text>
        <View
          style={{
            backgroundColor: 'rgb(230,230,230)',
            borderRadius: 20,
            paddingBottom: 80,
          }}>
          <TextInput
            placeholder={placeholder}
            placeholderTextColor="grey"
            onChangeText={handleChange}
            style={{
              backgroundColor: 'rgb(230,230,230)',
              borderRadius: 20,
              padding: 7,
            }}
            multiline={true}
          />
        </View>
        {/* <Text style={YourPlanTabStyle.bigBoxFooter}>{footer}</Text> */}
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}>
      <DropdownAlert ref={dropDownAlertRef} />
      <Loader Loading={Loading} setLoading={setLoading} />

      <ImageBackground source={{uri: image}} style={Styles.headerImg}>
        <View style={Styles.header}>
          <Header navigation={navigation} />
        </View>
        <View style={Styles.headerText}>
          <Text style={Styles.title}>{CourseTitle}</Text>
        </View>
      </ImageBackground>
      <ScrollView style={Styles.body}>
        {CourseData[0].questions.map((c, i) => (
          <FormInputFeild key={i} placeholder={c.placeholder} title={c.label} />
        ))}
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 25,
          }}>
          {Error && (
            <Text
              style={{
                fontSize: 18,
                // marginTop: 10,
                color: 'red',
                alignSelf: 'center',
              }}>
              Please fill all fields
            </Text>
          )}
          <SubmitBtn onPress={handleSubmit} />

          <TouchableOpacity
            onPress={() => {}}
            style={{
              backgroundColor: '#fff',
              width: 200,
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
            }}>
            <Text style={{color: colors.secondary, fontSize: 16}}>
              VIEW THOUGHT DIARY
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{height: 200}} />
      </ScrollView>
    </SafeAreaView>
  );
};
const Styles = StyleSheet.create({
  headerImg: {
    height: sizes.ITEM_HEIGHT * 1.3,
    justifyContent: 'flex-start',
  },
  header: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0,0.3)',
  },
  headerText: {
    paddingHorizontal: 10,
    paddingBottom: 15,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0,0.3)',
    alignContent: 'flex-end',
  },
  title: {
    color: '#fff',
    fontFamily: 'AvenirLTStd-Black',
    fontSize: 30,
    fontWeight: 'bold',
  },
  body: {
    marginTop: 10,
    height: sizes.height * 0.7,
  },
  bodyTitles: {
    padding: 10,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'AvenirLTStd-Book',
    marginBottom: 10,
  },

  bigBox: {
    flex: 1,
    width: sizes.width * 0.9,
    backgroundColor: '#fff',
    marginVertical: 5,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingTop: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  bigBoxTitle: {
    alignSelf: 'flex-start',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontFamily: 'AvenirLTStd-Book',
    color: colors.primary,
    marginLeft: 10,
  },
  bigBoxbody: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 12,
    color: 'black',
    lineHeight: 17,
    // fontFamily: 'AvenirLTStd-Book',
  },
});

export default DepressionForm1;

import React, {useState} from 'react';
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
import {Button} from 'react-native-elements';
import Header from '../../../Components/Header';
import SubmitBtn from '../../../Components/SubmitBtn';
import {colors, sizes} from '../../../Constants';

const DepressionForm1 = ({navigation, route}) => {
  var FormInput = [];
  const CourseTitle = route.params.CourseTitle;
  const image = route.params.image;
  const CourseData = route.params.data;
  const [Error, setError] = useState(false);
  const handleSubmit = () => {
    let data = Object.entries(FormInput);

    if (data.length === CourseData[0].questions.length) {
      setError(false);
      console.log(data);
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
          <FormInputFeild placeholder={c.placeholder} title={c.label} />
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
  textAreaContainer: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 5,
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: 'white',
  },
  textAreaContainerTitle: {
    marginTop: 5,
    marginLeft: 10,
  },
  textArea: {
    height: 150,
    borderRadius: 10,
    marginTop: 10,
    justifyContent: 'flex-start',
    backgroundColor: 'rgb(230,230,230)',
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

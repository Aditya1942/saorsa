import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, Text, View, BackHandler} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../Components/Header';
import {colors, sizes, MoodImgs} from '../../Constants';
import {Avatar} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ProfileStyle} from './ProfileStyle';
import EditProfile from './EditProfile';

const Profile = ({navigation}) => {
  const [Tab1, setTab1] = useState(ProfileStyle.profileTab);
  const [Tab2, setTab2] = useState(ProfileStyle.profileTab);
  const [Tab3, setTab3] = useState(ProfileStyle.profileTab);
  const [ProfileIsOpen, setProfileIsOpen] = useState(false);
  const [ProfileTabIsOpen, setProfileTabIsOpen] = useState(false);

  const handleTabChange = (e) => {
    if (e === 'about') {
      if (Tab1 === ProfileStyle.profileTab)
        setTab1(ProfileStyle.profileTabActive);
      else setTab1(ProfileStyle.profileTab);
      setTab2(ProfileStyle.profileTab);
      setTab3(ProfileStyle.profileTab);
    } else if (e === 'post') {
      if (Tab2 === ProfileStyle.profileTab)
        setTab2(ProfileStyle.profileTabActive);
      else setTab2(ProfileStyle.profileTab);
      setTab1(ProfileStyle.profileTab);
      setTab3(ProfileStyle.profileTab);
    } else if (e === 'comments') {
      if (Tab3 === ProfileStyle.profileTab)
        setTab3(ProfileStyle.profileTabActive);
      else setTab3(ProfileStyle.profileTab);
      setTab1(ProfileStyle.profileTab);
      setTab2(ProfileStyle.profileTab);
    }
    console.log(e);
  };
  const backActionHandler = () => {
    if (ProfileIsOpen) {
      setProfileIsOpen(false);
    }
    if (ProfileTabIsOpen) {
      setProfileTabIsOpen(false);
    } else {
      BackHandler.removeEventListener('hardwareBackPress', backActionHandler);
      navigation.goBack();
    }
    return true;
  };

  // hook which handles event listeners under the hood
  useEffect(() => {
    // Add event listener for hardware back button press on Android
    BackHandler.addEventListener('hardwareBackPress', backActionHandler);

    return () => {
      // clear/remove event listener
      BackHandler.removeEventListener('hardwareBackPress', backActionHandler);
      setProfileTabIsOpen(false);
    };
  }, [ProfileIsOpen]);
  const getDataFromEditProfile = (val) => {
    setProfileIsOpen(val);
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'grey',
      }}>
      <View style={ProfileStyle.header}>
        <Header navigation={navigation} />
      </View>
      <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
        <Text>+</Text>
      </View>
      <View showsVerticalScrollIndicator={false} style={ProfileStyle.body}>
        <View style={ProfileStyle.AvatarView}>
          <Avatar
            size="xlarge"
            overlayContainerStyle={ProfileStyle.AvatarBody}
            containerStyle={ProfileStyle.AvatarImg}
            rounded
            icon={{name: 'user', type: 'font-awesome'}}
          />
        </View>
        <View style={ProfileStyle.profileBodyHeading}>
          <Text style={ProfileStyle.PrifileName}>Name LastName</Text>
          <TouchableOpacity
            onPress={() => {
              setProfileIsOpen(true);
            }}>
            <Text style={ProfileStyle.editProfile}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        {ProfileIsOpen ? (
          <EditProfile isOpen={getDataFromEditProfile} />
        ) : (
          <View>
            <View style={ProfileStyle.profileBody}>
              <TouchableOpacity
                onPress={() => {
                  handleTabChange('about');
                  setProfileTabIsOpen(true);
                }}
                style={Tab1}>
                <Text style={ProfileStyle.profileTabText}>PROGRESS</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleTabChange('post');
                  setProfileTabIsOpen(true);
                }}
                style={Tab2}>
                <Text style={ProfileStyle.profileTabText}>MOOD REPORT</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleTabChange('comments');
                  setProfileTabIsOpen(true);
                }}
                style={Tab3}>
                <Text style={ProfileStyle.profileTabText}>YOUR PLAN</Text>
              </TouchableOpacity>
            </View>
            {ProfileTabIsOpen ? (
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  padding: 10,
                }}>
                <ScrollView
                  style={{
                    backgroundColor: '#fff',
                    padding: 10,
                    borderRadius: 25,
                  }}>
                  <Text>
                    {Tab1 === ProfileStyle.profileTabActive
                      ? 'tab1'
                      : Tab2 === ProfileStyle.profileTabActive
                      ? 'tab2'
                      : 'tab3'}
                  </Text>
                  <View
                    style={{
                      marginBottom: 1000,
                    }}></View>
                </ScrollView>
              </View>
            ) : (
              <View></View>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Profile;

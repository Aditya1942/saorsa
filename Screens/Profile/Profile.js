import React, {useEffect, useRef, useState} from 'react';
import {Text, View, BackHandler} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../Components/Header';
import {colors, sizes, MoodImgs} from '../../Constants';
import {Avatar} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ProfileStyle} from './ProfileStyle';
import EditProfile from './EditProfile';
import {ProgressTab} from './tabs/ProgressTab';
import {MoodReportTab} from './tabs/MoodReportTab';
import {YourPlanTab} from './tabs/YourPlanTab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserProfileData} from '../Auth/auth';

const Profile = ({navigation}) => {
  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@userInfo');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  const [UserData, setUserData] = useState({});
  const [Tab1, setTab1] = useState(ProfileStyle.profileTab);
  const [Tab2, setTab2] = useState(ProfileStyle.profileTabActive);
  const [Tab3, setTab3] = useState(ProfileStyle.profileTab);
  const [editProfileIsOpen, seteditProfileIsOpen] = useState(false);
  const [ProfileTabIsOpen, setProfileTabIsOpen] = useState(true);
  const [activeProfileTab, setactiveProfileTab] = useState('tab2');
  const closeAllTab = () => {
    // class all tabs
    setTab1(ProfileStyle.profileTab);
    setTab2(ProfileStyle.profileTab);
    setTab3(ProfileStyle.profileTab);
    seteditProfileIsOpen(false);
    setProfileTabIsOpen(false);
    setactiveProfileTab(null);
  };
  const handleTabChange = (e) => {
    // to open, close or navigate in different tabs
    closeAllTab();
    if (e === 'tab1') {
      if (activeProfileTab === 'tab1') {
        setTab1(ProfileStyle.profileTab);
        setactiveProfileTab(null);
      } else {
        setTab1(ProfileStyle.profileTabActive);
        setactiveProfileTab('tab1');
        setProfileTabIsOpen(true);
      }
      return null;
    } else if (e === 'tab2') {
      if (activeProfileTab === 'tab2') {
        setTab2(ProfileStyle.profileTab);
        setactiveProfileTab(null);
      } else {
        setTab2(ProfileStyle.profileTabActive);
        setactiveProfileTab('tab2');
        setProfileTabIsOpen(true);
      }
      return null;
    } else if (e === 'tab3') {
      if (activeProfileTab === 'tab3') {
        setTab3(ProfileStyle.profileTab);
        setactiveProfileTab(null);
      } else {
        setTab3(ProfileStyle.profileTabActive);
        setactiveProfileTab('tab3');
        setProfileTabIsOpen(true);
      }
      return null;
    }
  };
  const backActionHandler = () => {
    // to handle back press if tab is open
    if (editProfileIsOpen || ProfileTabIsOpen) {
      closeAllTab();
    } else {
      navigation.goBack();
    }
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backActionHandler);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backActionHandler);
    };
  }, [editProfileIsOpen, ProfileTabIsOpen]);
  useEffect(() => {
    getUserProfileData().then((data) => {
      console.log(data);
      setUserData(data);
    });
  }, []);
  const getDataFromEditProfile = (val) => {
    seteditProfileIsOpen(val);
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
            // source={{uri: UserData.user.avatar}}
            icon={{name: 'user', type: 'font-awesome'}}
          />
        </View>
        <View style={ProfileStyle.profileBodyHeading}>
          <Text style={ProfileStyle.PrifileName}>{UserData.user.name}</Text>
          <TouchableOpacity
            onPress={() => {
              seteditProfileIsOpen(true);
            }}>
            <Text style={ProfileStyle.editProfile}>Edit&nbsp;Profile</Text>
          </TouchableOpacity>
        </View>
        {editProfileIsOpen ? (
          <EditProfile isOpen={getDataFromEditProfile} />
        ) : (
          <View>
            <View style={ProfileStyle.profileBody}>
              <TouchableOpacity
                onPress={() => {
                  handleTabChange('tab1');
                }}
                style={Tab1}>
                <Text
                  accessibilityRole="tab"
                  style={ProfileStyle.profileTabText}>
                  PROGRESS
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleTabChange('tab2');
                }}
                style={Tab2}>
                <Text
                  accessibilityRole="tab"
                  style={ProfileStyle.profileTabText}>
                  MOOD&nbsp;REPORT
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleTabChange('tab3');
                }}
                style={Tab3}>
                <Text
                  accessibilityRole="tab"
                  adjustsFontSizeToFit={true}
                  style={ProfileStyle.profileTabText}>
                  YOUR&nbsp;PLAN
                </Text>
              </TouchableOpacity>
            </View>
            {ProfileTabIsOpen ? (
              <View
                style={{
                  width: '95%',
                  height: '90%',
                  margin: 10,
                  overflow: 'hidden',
                }}>
                {activeProfileTab === 'tab1' ? <ProgressTab /> : <View></View>}
                {activeProfileTab === 'tab2' ? (
                  <MoodReportTab />
                ) : (
                  <View></View>
                )}
                {activeProfileTab === 'tab3' ? <YourPlanTab /> : <View></View>}
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

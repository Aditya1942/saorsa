import React, {useEffect, useRef, useState} from 'react';
import {Text, View, BackHandler, Alert, Platform} from 'react-native';
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
import {
  getUserAuthToken,
  getUserProfileData,
  userSocialLoginInfo,
} from '../Auth/auth';
import {useFocusEffect} from '@react-navigation/core';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from '../Auth/axios';

const Profile = ({navigation, route}) => {
  const [UserData, setUserData] = useState({});
  const [Tab1, setTab1] = useState(ProfileStyle.profileTab);
  const [Tab2, setTab2] = useState(ProfileStyle.profileTabActive);
  const [Tab3, setTab3] = useState(ProfileStyle.profileTab);
  const [editProfileIsOpen, seteditProfileIsOpen] = useState(false);
  const [ProfileTabIsOpen, setProfileTabIsOpen] = useState(true);
  const [activeProfileTab, setactiveProfileTab] = useState('tab2');
  const [ProfilePic, setProfilePic] = useState(null);
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
  useFocusEffect(
    React.useCallback(() => {
      console.log('Profile navigation', route);
      const handleTabChange2 = (e) => {
        // to open, close or navigate in different tabs
        closeAllTab();
        if (e === 'tab1') {
          setTab1(ProfileStyle.profileTabActive);
          setactiveProfileTab('tab1');
          setProfileTabIsOpen(true);
          return null;
        } else if (e === 'tab2') {
          setTab2(ProfileStyle.profileTabActive);
          setactiveProfileTab('tab2');
          setProfileTabIsOpen(true);
          return null;
        } else if (e === 'tab3') {
          setTab3(ProfileStyle.profileTabActive);
          setactiveProfileTab('tab3');
          setProfileTabIsOpen(true);
          return null;
        }
      };
      if (route.params.activeTab) {
        handleTabChange2(route.params.activeTab);
      }
    }, [route]),
  );

  useFocusEffect(
    React.useCallback(() => {
      console.log('Profile navigation', navigation);

      const onBackPress = () => {
        if (editProfileIsOpen || ProfileTabIsOpen) {
          closeAllTab();
        } else if (navigation.canGoBack()) {
          navigation.goBack();
        } else {
          navigation.reset({
            routes: [{name: 'Home'}],
          });
        }
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [editProfileIsOpen, ProfileTabIsOpen, navigation]),
  );

  useEffect(() => {
    getUserProfileData().then((data) => {
      setUserData(data);
      console.log('ÚSER DATA', data);
      setProfilePic(data?.coverImage);
    });
  }, []);
  const getDataFromEditProfile = (val) => {
    seteditProfileIsOpen(val);
  };
  const updateProfilePicture = () => {
    let options = {
      // rest of the properties remain same
      mediaType: 'photo', // other values 'video', 'mixed'
    };
    launchImageLibrary(options, (response) => {
      console.log({response});
      if (response.didCancel) {
        console.log('User cancelled photo picker');
        Alert.alert('You did not select any image');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = {uri: response.uri};
        console.log(response);
        setProfilePic('');

        getUserAuthToken().then((token) => {
          console.log('token', token);
          const formData = new FormData();
          if (response != null) {
            formData.append('image', {
              uri: response.uri,
              name: response.fileName,
              type: response.type,
            });
          }
          formData.append('bio', 'bio');
          console.log('token', token);

          axios
            .post('/api/profile', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                'x-auth-token': token,
              },
            })
            .then((e) => {
              console.log('POST PHOTO', e);
              setProfilePic(e.data.coverImage);
            });
        });
      }
      console.log('CHANGE DP');
    });
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
      <TouchableOpacity
        style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}
        onPress={updateProfilePicture}>
        <Text style={{fontSize: 30, fontWeight: 'bold', paddingHorizontal: 10}}>
          +
        </Text>
      </TouchableOpacity>
      <View showsVerticalScrollIndicator={false} style={ProfileStyle.body}>
        <View style={ProfileStyle.AvatarView}>
          {ProfilePic ? (
            <Avatar
              size="xlarge"
              overlayContainerStyle={ProfileStyle.AvatarBody}
              containerStyle={ProfileStyle.AvatarImg}
              rounded
              // source={{uri: profilePic || null}}
              source={{uri: ProfilePic || null}}
            />
          ) : (
            <Avatar
              size="xlarge"
              overlayContainerStyle={ProfileStyle.AvatarBody}
              containerStyle={ProfileStyle.AvatarImg}
              rounded
              // source={{uri: UserData.user.avatar}}
              icon={{name: 'user', type: 'font-awesome'}}
            />
          )}
        </View>
        <View style={ProfileStyle.profileBodyHeading}>
          <Text style={ProfileStyle.PrifileName}>{UserData?.user?.name}</Text>
          <TouchableOpacity
            onPress={() => {
              seteditProfileIsOpen(true);
            }}>
            {/* {!isSocialLogin && (
              <Text style={ProfileStyle.editProfile}>Edit&nbsp;Profile</Text>
            )} */}
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
                {activeProfileTab === 'tab1' ? <ProgressTab /> : <View />}
                {activeProfileTab === 'tab2' ? <MoodReportTab /> : <View />}
                {activeProfileTab === 'tab3' ? <YourPlanTab /> : <View />}
              </View>
            ) : (
              <View />
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
export default Profile;

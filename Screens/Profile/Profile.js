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
  const [editProfileIsOpen, seteditProfileIsOpen] = useState(false);
  const [ProfileTabIsOpen, setProfileTabIsOpen] = useState(false);
  const [activeProfileTab, setactiveProfileTab] = useState(null);
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
            icon={{name: 'user', type: 'font-awesome'}}
          />
        </View>
        <View style={ProfileStyle.profileBodyHeading}>
          <Text style={ProfileStyle.PrifileName}>Name LastName</Text>
          <TouchableOpacity
            onPress={() => {
              seteditProfileIsOpen(true);
            }}>
            <Text style={ProfileStyle.editProfile}>Edit Profile</Text>
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
                <Text style={ProfileStyle.profileTabText}>PROGRESS</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleTabChange('tab2');
                }}
                style={Tab2}>
                <Text style={ProfileStyle.profileTabText}>MOOD REPORT</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleTabChange('tab3');
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
                  <Text>{activeProfileTab}</Text>
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

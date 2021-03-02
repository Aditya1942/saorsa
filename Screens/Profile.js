import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, Text, View, BackHandler} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../Components/Header';
import {colors, sizes, MoodImgs} from '../Constants';
import {Avatar} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ProfileStyle} from './ProfileStyle';

const Profile = ({navigation}) => {
  const [TabAbout, setTabAbout] = useState(ProfileStyle.profileTab);
  const [TabPost, setTabPost] = useState(ProfileStyle.profileTab);
  const [TabComments, setTabComments] = useState(ProfileStyle.profileTab);
  const [ProfileIsOpen, setProfileIsOpen] = useState(false);

  const handleTabChange = (e) => {
    if (e === 'about') {
      if (TabAbout === ProfileStyle.profileTab)
        setTabAbout(ProfileStyle.profileTabActive);
      else setTabAbout(ProfileStyle.profileTab);
      setTabPost(ProfileStyle.profileTab);
      setTabComments(ProfileStyle.profileTab);
    } else if (e === 'post') {
      if (TabPost === ProfileStyle.profileTab)
        setTabPost(ProfileStyle.profileTabActive);
      else setTabPost(ProfileStyle.profileTab);
      setTabAbout(ProfileStyle.profileTab);
      setTabComments(ProfileStyle.profileTab);
    } else if (e === 'comments') {
      if (TabComments === ProfileStyle.profileTab)
        setTabComments(ProfileStyle.profileTabActive);
      else setTabComments(ProfileStyle.profileTab);
      setTabAbout(ProfileStyle.profileTab);
      setTabPost(ProfileStyle.profileTab);
    }
    console.log(e);
  };
  const backActionHandler = () => {
    if (!ProfileIsOpen) {
      BackHandler.exitApp();
    } else {
      setProfileIsOpen(false);
    }
    return true;
  };

  // hook which handles event listeners under the hood
  useEffect(() => {
    // Add event listener for hardware back button press on Android
    BackHandler.addEventListener('hardwareBackPress', backActionHandler);

    return () =>
      // clear/remove event listener
      BackHandler.removeEventListener('hardwareBackPress', backActionHandler);
  }, [ProfileIsOpen]);
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
          <View style={ProfileStyle.profileBody}>
            <TouchableOpacity
              onPress={() => {
                handleTabChange('about');
              }}
              style={TabAbout}>
              <Text style={ProfileStyle.profileTabText}>About</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleTabChange('post');
              }}
              style={TabPost}>
              <Text style={ProfileStyle.profileTabText}>Post</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleTabChange('comments');
              }}
              style={TabComments}>
              <Text style={ProfileStyle.profileTabText}>Comments</Text>
            </TouchableOpacity>
          </View>
        </View>
        {ProfileIsOpen ? (
          <View style={ProfileStyle.profileTabBody}>
            <TouchableOpacity
              style={ProfileStyle.editProfileInTab}
              onPress={() => {
                setProfileIsOpen(false);
              }}>
              <Text style={ProfileStyle.editProfileInTabText}>
                Edit Profile
              </Text>
            </TouchableOpacity>
            <ScrollView>
              <EditProfileDetails text="Accounts Details" icon="user" />
              <EditProfileDetails text="Privacy" icon="lock" />
              <EditProfileDetails text="Change Password" icon="key" />
            </ScrollView>
          </View>
        ) : (
          <View></View>
        )}
      </View>
    </SafeAreaView>
  );
};
const EditProfileDetails = ({text, icon}) => {
  return (
    <View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{margin: 10}}>
          <Avatar
            rounded
            icon={{name: icon, type: 'font-awesome'}}
            onPress={() => console.log('Works!')}
            activeOpacity={0.7}
            containerStyle={{
              backgroundColor: colors.secondary,
            }}
          />
        </View>
        <View>
          <Text>{text}</Text>
        </View>
      </View>
      <View style={{marginLeft: 50}}>
        <Text style={{backgroundColor: 'grey'}}></Text>
        <Text style={{backgroundColor: 'grey'}}></Text>
      </View>
    </View>
  );
};
export default Profile;

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
      BackHandler.removeEventListener('hardwareBackPress', backActionHandler);
      navigation.goBack();
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
          <EditProfile isOpen={getDataFromEditProfile} />
        ) : (
          <View></View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Profile;

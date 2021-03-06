import React from 'react';
import {
  ScrollView,
  Text,
  View,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {ProfileStyle} from './ProfileStyle';
import {colors, sizes, MoodImgs} from '../../Constants';

const EditProfile = ({isOpen}) => {
  const demoMethod = () => {
    isOpen(false);
  };
  return (
    <View style={ProfileStyle.editprofileTabBody}>
      <TouchableOpacity
        onPress={demoMethod}
        style={ProfileStyle.editProfileInTab}>
        <Text style={ProfileStyle.editProfileInTabText}>Edit Profile</Text>
      </TouchableOpacity>
      <ScrollView>
        <EditProfileDetails text="Accounts Details" icon="user" />
        <EditProfileDetails text="Privacy" icon="lock" />
        <EditProfileDetails text="Change Password" icon="key" />
      </ScrollView>
    </View>
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
export default EditProfile;

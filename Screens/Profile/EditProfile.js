import React from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {colors, sizes} from '../../Constants';
const EditProfile = ({isOpen}) => {
  const demoMethod = () => {
    isOpen(false);
  };
  return (
    <View style={editProfileStyle.editprofileTabBody}>
      <TouchableOpacity
        onPress={demoMethod}
        style={editProfileStyle.editProfileInTab}>
        <Text style={editProfileStyle.editProfileInTabText}>Edit Profile</Text>
      </TouchableOpacity>
      <ScrollView>
        <EditProfileDetails text="Accounts Details" icon="user" />
        <EditProfileDetails text="Privacy" icon="lock" />
        <EditProfileDetails text="Change Password" icon="key" />
        <View style={{height: 500, marginBottom: 100}}></View>
        <Text>LOL</Text>
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
const editProfileStyle = StyleSheet.create({
  //edit profile tabs body
  editprofileTabBody: {
    minHeight: sizes.height,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    marginTop: -40,
    zIndex: 2,
    // width: '100%',
    paddingHorizontal: 5,
    borderRadius: 50,
  },
  editProfileInTab: {
    padding: 3,
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  editProfileInTabText: {
    color: 'black',
    fontSize: 8,
    fontWeight: 'bold',
    marginTop: 5,
    textTransform: 'uppercase',
    padding: 3,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },
  //edit profile tabs body
});

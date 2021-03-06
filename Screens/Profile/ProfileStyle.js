import {StyleSheet} from 'react-native';
import {colors, sizes, MoodImgs} from '../../Constants';

export const ProfileStyle = StyleSheet.create({
  header: {
    backgroundColor: 'grey',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 50,
  },
  body: {
    height: sizes.height,
    backgroundColor: colors.primary,
    marginTop: 5,
    marginBottom: 50,
    overflow: 'visible',
  },
  // Avatar
  AvatarBody: {
    backgroundColor: colors.secondary,
    position: 'relative',
    // top: -70,
  },
  AvatarImg: {
    backgroundColor: '#fff',
    position: 'relative',
    top: -70,
  },
  AvatarView: {
    justifyContent: 'center',
    alignSelf: 'center',
    zIndex: 2,
  },
  // profile heading
  profileBodyHeading: {
    position: 'absolute',
    top: 85,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  PrifileName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  // edit profile button
  editProfile: {
    color: '#fff',
    fontSize: 8,
    fontWeight: 'bold',
    marginTop: 5,
    textTransform: 'uppercase',
    padding: 3,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
  },
  // profile Body
  profileBody: {
    flex: 1,
    flexDirection: 'row',
    width: sizes.width,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 5,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  // profile tabs
  profileTabText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  profileTab: {
    padding: 5,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  profileTabActive: {
    backgroundColor: colors.secondary,
    padding: 5,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  // profile tabs
  //edit profile tabs body
  editprofileTabBody: {
    minHeight: sizes.height,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    marginTop: -40,
    paddingHorizontal: 5,
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
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

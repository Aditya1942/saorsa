import {StyleSheet} from 'react-native';
import {colors, sizes} from '../../Constants';

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
    width: '100%',
    zIndex: 2,
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: 10,
  },
  // profile tabs
  profileTabText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    width: '100%',
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
});

import AsyncStorage from '@react-native-async-storage/async-storage';
export const storeUserAuthToken = async (value) => {
  try {
    await AsyncStorage.setItem('@loginToken', value);
    return value;
  } catch (e) {
    // saving error
    console.log(e);
    throw e;
  }
};
export const getUserAuthToken = async () => {
  try {
    const value = await AsyncStorage.getItem('@loginToken');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // error reading value
    console.log(e);
    throw e;
  }
};
export const storetUserProfileData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@userInfo', jsonValue);
  } catch (e) {
    // saving error
    throw e;
  }
};
export const getUserProfileData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@userInfo');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    throw e;
  }
};
export const storetuserSocialLoginInfo = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@userSocialLoginInfo', jsonValue);
  } catch (e) {
    // saving error
    throw e;
  }
};
export const userSocialLoginInfo = async () => {
  try {
    const value = await AsyncStorage.getItem('@userSocialLoginInfo');
    return value != null ? JSON.parse(value) : null;
  } catch (e) {
    // error reading value
    console.log(e);
    throw e;
  }
};

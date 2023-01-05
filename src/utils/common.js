import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager} from 'react-native-fbsdk-next';

export const revokeSocialAccount = async () => {
  try {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {}
    LoginManager.logOut();
  } catch (error) {}
};

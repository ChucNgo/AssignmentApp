import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AccessToken, LoginManager, Profile} from 'react-native-fbsdk-next';
import {revokeSocialAccount} from '../../utils/common';

export default function SignIn({navigation}) {
  const signinWithGoogle = async () => {
    try {
      const {idToken, ...rest} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      navigation.reset({
        index: 0,
        routes: [{name: 'News'}],
      });
    } catch (e) {}
  };

  const signInWithFacebook = async () => {
    revokeSocialAccount();
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      const currentProfile = await Profile.getCurrentProfile();
      if (result.isCancelled) {
        return;
      }
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw 'Something went wrong obtaining access token';
      }
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );
      await auth().signInWithCredential(facebookCredential);
      navigation.reset({
        index: 0,
        routes: [{name: 'News'}],
      });
    } catch (e) {}
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.topContent}>
          <Text style={styles.mainText}>Assignment</Text>
        </View>
        <View style={styles.bottomContent}>
          <TouchableOpacity
            style={styles.googleButton}
            onPress={signinWithGoogle}>
            <Image
              style={styles.googleIcon}
              source={{
                uri: 'https://i.ibb.co/j82DCcR/search.png',
              }}
            />
            <Text style={styles.googleButtonText}>Sign in with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.googleButton}
            onPress={signInWithFacebook}>
            <Image
              style={styles.fbIcon}
              source={{
                uri: 'https://www.giochiunitiinternational.com/wp-content/uploads/2020/10/facebook-logo-vector-images-icon-sign-and-symbols-facebook-vector-png-600_600.png',
              }}
            />
            <Text style={styles.googleButtonText}>Sign in with Facebook</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#262b2f',
  },
  container: {
    height: Dimensions.get('window').height,
    backgroundColor: '#262b2f',
  },
  topContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainText: {
    fontSize: 54,
    color: 'white',
  },
  googleButton: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 4,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  googleButtonText: {
    marginLeft: 16,
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  googleIcon: {
    height: 24,
    width: 24,
  },
  fbIcon: {
    height: 24,
    width: 24,
  },
});

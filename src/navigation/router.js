import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider, useDispatch} from 'react-redux';
import store from '../../store';
import {Button, SafeAreaView, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../screens/SignIn';
import NewsScreen from '../screens/News';
import auth from '@react-native-firebase/auth';
import NewsDetail from '../screens/NewsDetail';
import {revokeSocialAccount} from '../utils/common';
import authSlice from '../reducers/authSlice';

const Stack = createStackNavigator();
export default function Router() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const authSubscriber = auth().onAuthStateChanged(result => {
      setUser(result);
      if (initializing) setInitializing(false);

      if (result) {
        dispatch(
          authSlice.actions.signIn({
            name: result.displayName,
            email: result.email,
            avatar: result.photoURL,
          }),
        );
      }
    });

    // unsubscribe on unmount
    return authSubscriber;
  }, []);

  const logOut = navigation => {
    revokeSocialAccount();
    navigation.reset({
      index: 0,
      routes: [{name: 'SignIn'}],
    });
  };

  if (initializing) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? 'News' : 'SignIn'}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen
          name="News"
          component={NewsScreen}
          options={({navigation}) => ({
            headerRight: () => (
              <View style={{marginRight: 4}}>
                <Button title="Log out" onPress={() => logOut(navigation)} />
              </View>
            ),
          })}
        />
        <Stack.Screen name="NewsDetail" component={NewsDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

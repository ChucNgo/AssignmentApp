import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import store from './store';
import {Button, SafeAreaView, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from './src/screens/SignIn';
import NewsScreen from './src/screens/News';
import auth from '@react-native-firebase/auth';
import NewsDetail from './src/screens/NewsDetail';
import {revokeSocialAccount} from './src/utils/common';

GoogleSignin.configure({
  webClientId:
    '638435823425-dvo745p1siee64cho3cqtb5luseuhbun.apps.googleusercontent.com',
  offlineAccess: true,
});

const Stack = createStackNavigator();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  const onAuthStateChanged = result => {
    setUser(result);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const authSubscriber = auth().onAuthStateChanged(onAuthStateChanged);

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
    <Provider store={store}>
      <SafeAreaView style={{flex: 0, backgroundColor: 'white'}} />
      <SafeAreaProvider style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={user ? 'News' : 'SignIn'}>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen
              name="News"
              component={NewsScreen}
              options={({navigation}) => ({
                headerRight: () => (
                  <View style={{marginRight: 4}}>
                    <Button
                      title="Log out"
                      onPress={() => logOut(navigation)}
                    />
                  </View>
                ),
              })}
            />
            <Stack.Screen name="NewsDetail" component={NewsDetail} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;

import React, {useCallback, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import store from './store';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from './src/screens/SignIn';
import NewsScreen from './src/screens/News';

GoogleSignin.configure({
  webClientId:
    '638435823425-dvo745p1siee64cho3cqtb5luseuhbun.apps.googleusercontent.com',
  offlineAccess: true,
});

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 0, backgroundColor: 'white'}} />
      <SafeAreaProvider style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SignIn">
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="News" component={NewsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;

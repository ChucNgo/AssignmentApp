import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import store from './store';
import {SafeAreaView} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import Router from './src/navigation/router';

GoogleSignin.configure({
  webClientId:
    '638435823425-dvo745p1siee64cho3cqtb5luseuhbun.apps.googleusercontent.com',
  offlineAccess: true,
});

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 0, backgroundColor: 'white'}} />
      <SafeAreaProvider style={{flex: 1}}>
        <Router />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;

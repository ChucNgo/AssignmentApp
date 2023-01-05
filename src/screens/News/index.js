import {View, Text, Button} from 'react-native';
import React from 'react';
import {revokeSocialAccount} from '../../utils/common';

export default function NewsScreen({navigation}) {
  const logOut = () => {
    revokeSocialAccount();
    navigation.goBack();
  };

  return (
    <View>
      <Text>NewsScreen</Text>

      <Button title="Log out" onPress={logOut} />
    </View>
  );
}

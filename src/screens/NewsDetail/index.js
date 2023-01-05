import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const NewsDetail = ({route}) => {
  const {title, author, url} = route?.params?.info;

  return (
    <View style={styles.container}>
      <Text>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});

export default NewsDetail;

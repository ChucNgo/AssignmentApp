import {View, Text, StyleSheet, Linking, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const NewsItem = ({title, author, url, ...props}) => {
  const navigation = useNavigation();

  const openDetail = () => {
    navigation.navigate('NewsDetail', {info: props});
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openDetail}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
      <Text style={styles.author}>{author ?? 'Anonymous'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 20,
    borderWidth: 0.1,
    overflow: 'hidden',
    elevation: 2,
  },
  title: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 8,
  },
  author: {
    fontSize: 12,
    color: 'orange',
  },
});

export default NewsItem;

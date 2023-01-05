import {
  View,
  Text,
  Button,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import useRequest from '../../apis/hook';
import {getLastestNews} from '../../apis/news';
import NewsItem from '../../components/NewsItem';
import {useSelector} from 'react-redux';

export default function NewsScreen({navigation}) {
  const authData = useSelector(s => s.auth);
  const {name} = authData.info;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchNews.run();
  }, []);

  const fetchNews = useRequest(getLastestNews, {
    manual: true,
    onSuccess: async result => {
      if (result?.status === 'ok') {
        const formatedArticles =
          result?.articles.map((item, index) => ({
            id: index,
            ...item,
          })) ?? [];
        setData(formatedArticles);
      }
      setLoading(false);
    },
    onError: e => {
      setLoading(false);
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.topContent}>
        <Text style={styles.title}>Hi {name}</Text>
      </View>

      {loading ? (
        <View style={styles.loadingView}>
          <ActivityIndicator color={'black'} />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.flatList}
          renderItem={({item}) => <NewsItem {...item} />}
          data={data}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    color: 'tomato',
    fontWeight: 'bold',
  },
  topContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingLeft: 16,
  },
  loadingView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatList: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});

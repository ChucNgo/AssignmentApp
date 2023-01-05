import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Button,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';

const NewsDetail = ({route}) => {
  const authData = useSelector(s => s.auth);
  const {name, email, avatar} = authData.info;
  const {title, id, author, url} = route?.params?.info;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const messagesListener = firestore()
      .collection('COMMENTS')
      .doc(id)
      .collection('MESSAGES')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const messages = querySnapshot?.docs?.map(doc => {
          const firebaseData = doc?.data();

          const data = {
            _id: doc.id,
            text: '',
            createdAt: new Date().getTime(),
            ...firebaseData,
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
            };
          }
          return data;
        });

        setMessages(messages);
      });

    // Stop listening for updates whenever the component unmounts
    return () => messagesListener();
  }, []);

  const sendComment = async () => {
    firestore().collection('COMMENTS').doc(id).collection('MESSAGES').add({
      text,
      createdAt: new Date().getTime(),
      user: {
        email,
        name,
        avatar,
      },
    });
    setText('');
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.viewComment}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {avatar ? (
            <Image
              source={{uri: avatar}}
              style={{
                borderRadius: 40,
                width: 40,
                height: 40,
                backgroundColor: 'gray',
                marginRight: 16,
              }}
            />
          ) : (
            <View
              style={{
                borderRadius: 40,
                width: 40,
                height: 40,
                backgroundColor: 'gray',
                marginRight: 16,
              }}
            />
          )}

          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            {item?.user?.name}
          </Text>
        </View>
        <Text style={{marginLeft: 56, fontSize: 18}}>{item.text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <FlatList
        data={messages}
        renderItem={renderItem}
        contentContainerStyle={{flexGrow: 1, paddingHorizontal: 16}}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderTopWidth: 0.5,
        }}>
        <TextInput
          style={{
            height: 40,
            color: 'black',
            backgroundColor: 'smoke',
            flex: 1,
          }}
          placeholder="Type message here..."
          placeholderTextColor="gray"
          value={text}
          onChangeText={val => setText(val)}
        />
        <Button title="Send" onPress={sendComment} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 12,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 26,
    marginBottom: 8,
    marginHorizontal: 16,
  },
  viewComment: {
    flex: 1,
    marginBottom: 16,
    backgroundColor: '#B6B6B6',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

export default NewsDetail;

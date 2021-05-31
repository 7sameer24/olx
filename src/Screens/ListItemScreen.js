import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform,
  Linking,
  ActivityIndicator
} from 'react-native';
import {Button, Card, Title, Paragraph} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
const ListItemScreen = () => {
  const [items, setitems] = useState([]);
  const[loading,setloading] = useState(false)
  const getDetails = async () => {
    const querySnap = await firestore().collection('ads').get();
    const result = querySnap.docs.map(docSnap => docSnap.data());
    console.log(result);
    setitems(result);
  };
  const openDial = phone => {
    if (Platform.OS === 'android') {
      Linking.openURL(`tel:${phone}`);
    } else {
      Linking.openURL(`telprompt:${phone}`);
    }
  };
  useEffect(() => {
    getDetails();
    return () => {
      console.log('cleanup');
    };
  }, []);
  const renderItem = item => {
     return (
      <Card style={styles.card}>
        <Card.Title title={item.name} />
        <Card.Content>
          <Paragraph>{item.desc}</Paragraph>
          <Paragraph>{item.year}</Paragraph>
        </Card.Content>
        <Card.Cover source={{uri: item.image}} />
        <Card.Actions>
          <Button>{item.price}</Button>
          <Button onPress={() => openDial()}>Call seller</Button>
        </Card.Actions>
      </Card>
    );
  };
  return (
    <View>
      <FlatList
        data={items.reverse()}
        keyExtractor={item => item.phone}
        renderItem={({item}) => renderItem(item)}
        onRefresh={()=>{
          setloading(true)
          getDetails()
          setloading(false)
        }}
        refreshing={loading}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    margin: 10,
    elevation: 2,
  },
});
export default ListItemScreen;

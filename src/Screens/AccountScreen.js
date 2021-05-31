import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import auth from "@react-native-firebase/auth";
import {Button, Card, Title, Paragraph} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const accountScreen = () => {
  const [items, setitems] = useState([]);
  const [loading,setloading] = useState(false)
  const getDetails = async () => {
    const querySnap = await firestore().collection("ads")
    .where('uid',"==",auth().currentUser.uid)
    .get();
    const result = querySnap.docs.map((docSnap) => docSnap.data());
    console.log(result);
    setitems(result);
  };
  useEffect(() => {
    getDetails();
    return () => {
      console.log("cleanup");
    };
  }, []);
  const renderItem = (item) => {
    return (
      <Card style={styles.card}>
        <Card.Title title={item.name} />
        <Card.Content>
          <Paragraph>{item.desc}</Paragraph>
          <Paragraph>{item.year}</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: item.image }} />
        <Card.Actions>
          <Button>{item.price}</Button>
          <Button onPress={() => openDial()}>Call seller</Button>
        </Card.Actions>
      </Card>
    );
  };

  return (
    <View style={{flex:1}}>
      <View style={styles.container}>
      <Text style={styles.text}>{auth().currentUser.email}</Text>
      <Button mode="contained" onPress={() => auth().signOut()}>
        Logout
      </Button>
      <Text style={styles.text}>Your ads!</Text>
      </View>
      <FlatList
        data={items.reverse()}
        keyExtractor={(item) => item.phone}
        renderItem={({ item }) => renderItem(item)}
      onRefresh={()=>
        {setloading(true)
        getDetails()
        setloading(false)
      }}
      refreshing={loading}
/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-evenly",
    alignItems: "center",
    height:'30%'
  },
  text: {
    fontSize: 22,
  },
  card: {
      margin: 10,
      elevation: 2,
    },
});

export default accountScreen;

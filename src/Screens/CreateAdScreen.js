import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
const CreateAdScreen = () => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState('');
  const postData = async () => {
    if (!name || !desc || !year || !price || !phone || !image) {
      Alert.alert('Please all the fields');
      return;
    }
    try {
      await firestore().collection('ads').add({
        name,
        desc,
        year,
        price,
        phone,
        image,
        uid: auth().currentUser.uid,
      });
      Alert.alert('Posted You ad!');  
    } catch (err) {
      Alert.alert('Something went wrong please try again later!');
    }
  };

  const openCamera = () => {
    launchImageLibrary({quality: 0.5}, fileobj => {
      //console.log(fileobj);
      const uploadTask = storage()
        .ref()
        .child(`/items/${Date.now()}`)
        .putFile(fileobj.uri);
      uploadTask.on(
        'state_changed',
        snapshot => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if ((progress==100)) {
            Alert.alert('uploaded');
          }
        },
        error => {
          Alert.alert('something went wrong try again later!');
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            setImage(downloadURL);
          });
        },
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create Ad!</Text>
      <TextInput
        label="Ad title"
        mode="outlined"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        label="Describe what you are selling "
        mode="outlined"
        value={desc}
        numberOfLines={3}
        multiline={true}
        onChangeText={text => setDesc(text)}
      />
      <TextInput
        label="Year of purchase"
        mode="outlined"
        value={year}
        keyboardType="numeric"
        onChangeText={text => setYear(text)}
      />
      <TextInput
        label="Price in INR"
        mode="outlined"
        value={price}
        keyboardType="numeric"
        onChangeText={text => setPrice(text)}
      />
      <TextInput
        label="Your contact number"
        mode="outlined"
        value={phone}
        keyboardType="phone-pad"
        onChangeText={text => setPhone(text)}
      />
      <Button icon="camera" mode="contained" onPress={() => openCamera()}>
        Upload Image
      </Button>
      <Button
        disabled={image && name && year && desc && price && phone ? false : true}
        mode="contained"
        onPress={() => postData()}>
        Post
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
    justifyContent: 'space-evenly',
  },
  text: {
    fontSize: 22,
    textAlign: 'center',
  },
});

export default CreateAdScreen;

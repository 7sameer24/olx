import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userSignup = async () => {
    if (!email || !password) {
      Alert.alert('Please all the fields');
      return;
    }
    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (err) {
      Alert.alert('Something Went Wrong Please try different password');
    }
  };
  return (
    <KeyboardAvoidingView behavior="position">
      <View style={styles.Box1}>
        <Image
          style={{width: 200, height: 200,marginTop:30}}
          source={require('../assets/bird2.png')}
        />
        {/* <Text style={styles.text}> Signup!</Text> */}
      </View>
      <View style={styles.box2}>
        <TextInput
          label="Email"
          mode="outlined"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          label="Password"
          mode="outlined"
          value={password}
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />
        <Button
          disabled={email && password ? false : true}
          mode="contained"
          onPress={() => userSignup()}>
          Sign in
        </Button>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{textAlign: 'center',color:'#8a3ab9'}}>Login?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  Box1: {
    alignItems: 'center',
  },
  box2: {
    paddingHorizontal: 40,
    height: '48%',
    justifyContent: 'space-evenly',
  },
  text: {
    fontSize: 22,
  },
});
export default SignupScreen;

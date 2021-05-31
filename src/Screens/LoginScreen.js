import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userLogin = async () => {
    if (!email || !password) {
      Alert.alert('Please all the fields');
      return;
    }
    try {
      const result = await auth().signInWithEmailAndPassword(email, password);
      console.log(result.user);
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
        <Text style={styles.text}> Please login to continue!</Text>
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
          onPress={() => userLogin()}>
          login
        </Button>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={{textAlign: 'center'}}>
            Dont't have an account?
            <Text style={{color: '#8a3ab9'}}>Sign up.</Text>
          </Text>
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
export default LoginScreen;

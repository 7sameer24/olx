/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  NavigationContainer,
  DefaultTheme as DefaultThemeNav,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';

import LoginScreen from './Screens/LoginScreen';
import SignupScreen from './Screens/SignupScreen';
import CreateAdScreen from './Screens/CreateAdScreen';
import ListItemScreen from './Screens/ListItemScreen';
import AccountScreen from './Screens/AccountScreen';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#8a3ab9',
  },
};
const MyTheme = {
  ...DefaultThemeNav,
  colors: {
    ...DefaultThemeNav.colors,
    background: 'white',
  },
};
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Create') {
            iconName = 'plus-square-o';
          } else if (route.name === 'Account') {
            iconName = 'user';
          }

          // You can return any component that you like here!
          return <FontAwesome name={iconName} size={30} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#8a3ab9',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="Home"
        component={ListItemScreen}
        options={{title: ''}}
      />
      <Tab.Screen
        name="Create"
        component={CreateAdScreen}
        options={{title: ''}}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{title: ''}}
      />
    </Tab.Navigator>
  );
};
const Navigation = () => {
  const [user, setUser] = useState('');
  useEffect(() => {
    const unsubcribe = auth().onAuthStateChanged(userExist => {
      if (userExist) {
        setUser(userExist);
      } else {
        setUser('');
      }
    });
    return unsubcribe;
  }, []);
  return (
    <NavigationContainer theme={MyTheme}>
      {user ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
const App = () => {
  return (
    <>
      <PaperProvider theme={theme}>
        <StatusBar barStyle="dark-content" backgroundColor="#8a3ab9" />
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <Navigation />
          </View>
        </SafeAreaView>
      </PaperProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;

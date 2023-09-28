import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import AuthScreen from './src/screens/AuthScreen';
import HomeScreen from './src/screens/Home';
import linking from './linking.js';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        screenOptions={{headerBackVisible: false, headerShown: false}}
        initialRouteName={'auth'}>
        <Stack.Screen name="auth" component={AuthScreen} />
        <Stack.Screen name="home" component={HomeScreen} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

export default App;

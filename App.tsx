/* eslint-disable prettier/prettier */
import React from 'react';
import MainScreen from './App/MainScreen';
import ScoreScreen from './App/ScoreScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { Store } from './App/redux/store';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={MainScreen} />
          <Stack.Screen name="Result" component={ScoreScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider >
  );
};

export default App;

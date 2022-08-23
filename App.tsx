/* eslint-disable prettier/prettier */
import React from 'react';
import Iconio from 'react-native-vector-icons/Ionicons';
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
        <Stack.Navigator>
          <Stack.Screen name="Home" component={MainScreen} />
          <Stack.Screen name="Result" component={ScoreScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider >
  );
};

export default App;

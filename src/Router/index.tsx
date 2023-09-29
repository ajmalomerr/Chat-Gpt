// ChatGpt/navigators/StackNavigator.js

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatPage from '../Screens/ChatPage/inedex';
import ChatView from '../Screens/ChatPage/ChatView';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={ChatPage} options={{ headerShown: false, }} />
      <Stack.Screen name="ChatView" component={ChatView} options={{ headerShown: false, }} />
      {/* Add more screens here */}
    </Stack.Navigator>
  );
};


export default StackNavigator


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './Router';

const index = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default index

// const styles = StyleSheet.create({})
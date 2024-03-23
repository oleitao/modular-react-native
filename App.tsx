import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { MainNavigator } from './src/screens/MainNavigation/MainNavigation';

const App = () => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>

  );
}

export default App;

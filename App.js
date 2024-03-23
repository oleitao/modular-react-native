import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { MainNavigator } from "./src/Screens/MainNavigation/MainNavigation";

const App = () => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>

  );
}

export default App;

import React from 'react';
import LoginScreen from '../Login/LoginScreen';
import SplashScreen from '../Splash/SplashScreen';

export function Navigator() {
  return (
    <Navigator>
      <Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }} />
      <Screen
        name="QrCodeScreen"
        component={QrCodeScreen} 
        options={{headerShown:false}}      
      />
      <Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }} />
    </Navigator>
  );

}
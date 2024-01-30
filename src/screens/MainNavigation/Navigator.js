import React from 'react';
import LoginScreen from '../Login/LoginScreen';
import SplashScreen from '../Splash/SplashScreen';
import ModeSelector from '../QrCode/ModeSelector';
import QrCodeScreen from '../Splash/QrCodeScreen';

export function Navigator() {
  return (
    <Navigator>
      <Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }} />
      <Screen
        name="ModeSelector"
        component={ModeSelector} 
        options={{headerShown:false}}      
      />        
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
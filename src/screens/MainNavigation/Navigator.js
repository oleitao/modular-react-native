import React from 'react';
import LoginScreen from '../LoginScreen/LoginScreen';
import SplashScreen from '../Splash/SplashScreen';
import ShotViewScreen from "../ShotViewScreen/ShotViewScreen";

export function Navigator() {
  return (
    <Navigator>
      <Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }} />
      <Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }} />
      <Screen
        name="ShotViewScreen"
        component={ShotViewScreen} 
        options={{headerShown:false}}      
      />
    </Navigator>
  );

}
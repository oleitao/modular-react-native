import React from 'react';
import LoginScreen from '../LoginScreen/LoginScreen';
import SplashScreen from '../Splash/SplashScreen';
import ShotViewScreen from "../ShotViewScreen/ShotViewScreen";
import MenuScreen from "../MenuScreen/MenuScreen";
import QrCodeScreen from "../QrCodeScreen/QrCodeScreen";
import PaginationScreen from "../PaginationScreen/PaginationScreen";

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
      <Screen
        name="MenuScreen"
        component={MenuScreen} 
        options={{headerShown:false}}      
      />

      <Screen
        name="QrCodeScreen"
        component={QrCodeScreen} 
        options={{headerShown:false}}      
      />
      <Screen
        name="PaginationScreen"
        component={PaginationScreen} 
        options={{headerShown:false}}      
      />
    </Navigator>
  );

}
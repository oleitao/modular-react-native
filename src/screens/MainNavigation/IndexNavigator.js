import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigator } from './MainNavigation';

export function IndexNavigation (){
    return(
     <NavigationContainer>
        <MainNavigator/>
     </NavigationContainer>
    )
} 
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../LoginScreen/LoginScreen";
import SplashScreen from "../SplashScreen/SplashScreen";
import ShotViewScreen from "../ShotViewScreen/ShotViewScreen";
import MenuScreen from "../MenuScreen/MenuScreen";
import QrCodeScreen from "../QrCodeScreen/QrCodeScreen";
import PaginationScreen from "../PaginationScreen/PaginationScreen";
import UserScreen from "../ApiScreen/UserScreen";

const {Screen, Navigator} = createNativeStackNavigator();

export function MainNavigator(){

    return (
        <Navigator  screenOptions={{
          headerShown: false
        }}>
           <Screen
              name="SplashScreen"
              component={SplashScreen} 
              options={{headerShown:false}}      
            />
           <Screen
              name="LoginScreen"
              component={LoginScreen} 
              options={{headerShown:false}}      
            />
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
            <Screen
              name="UserScreen"
              component={UserScreen} 
              options={{headerShown:false}}      
            />
        </Navigator>
    )
}
    
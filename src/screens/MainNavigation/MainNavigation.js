import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../Login/LoginScreen";
import SplashScreen from "../Splash/SplashScreen";
import QrCodeScreen from "../QrCode/QrCodeScreen";

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
              name="QrCodeScreen"
              component={QrCodeScreen} 
              options={{headerShown:false}}      
            />
           <Screen
              name="LoginScreen"
              component={LoginScreen} 
              options={{headerShown:false}}      
            />
        </Navigator>
    )
}
    
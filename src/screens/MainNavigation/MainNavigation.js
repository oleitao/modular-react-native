import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../LoginScreen/LoginScreen";
import SplashScreen from "../Splash/SplashScreen";
import ShotViewScreen from "../ShotViewScreen/ShotViewScreen";

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
        </Navigator>
    )
}
    
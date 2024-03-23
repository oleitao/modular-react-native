import React, { useState, useEffect } from "react";
import { View, Dimensions, Text, TouchableOpacity, useColorScheme, Alert, StyleSheet } from 'react-native';
import AnimatedSplash from "../../../lib/AnimatedSplash";
import { useNavigation } from '@react-navigation/native';
import NetInfo from "@react-native-community/netinfo";

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const NetworkCheck = ({status, type}) => {
 
  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>
        Connection Status : {status ? 'Connected' : 'Disconnected'}
      </Text>
      <Text style={styles.statusText}>
        Connection Type : {type}
      </Text>
    </View>
  );
};

const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = ({ status, type }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    
    const navigation = useNavigation();
    const { width, height } = Dimensions.get('screen');

    const [connectionStatus, setConnectionStatus] = useState(false);
    const [connectionType, setConnectionType] = useState(null);
  
  
    const isDarkMode = useColorScheme() === 'dark';
  
    const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
  
  
    const handleNetworkChange = (state) => {
      setConnectionStatus(state.isConnected);
      setConnectionType(state.type);
    };

    useEffect(() => {
      setTimeout(() => {
        setIsLoaded(true);
      }, 1000);

      const netInfoSubscription = NetInfo.addEventListener(handleNetworkChange);
      return () => {
        netInfoSubscription && netInfoSubscription();
      };

    }, []);

    return (
      <>
        <AnimatedSplash
          logoWidht={150}
          logoHeight={150}
          isLoaded={isLoaded}
          backgroundColor={"#262626"}
          logoImage={require("../../../assets/logo.png")}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#262626",
            }}
          >            
            <Section title={"Connection Status : " + connectionStatus ? 'Connected' : 'Disconnected'}>
            </Section>
            <Section title={"You are connected by " + connectionType}>
            </Section>
          
            <TouchableOpacity onPress={() => navigation.navigate('MenuScreen')}>
                <Text style={{ color: "#fdfdfd", fontSize: 30 }}>Click Here</Text>
            </TouchableOpacity>
          </View>
        </AnimatedSplash>
      </>
    );
  };

  const styles = StyleSheet.create({
    sectionContainer: {
      marginTop: 32,  
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      textAlign: 'center'
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },  
    container: {
      flex: 1,
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ff0000',
    },
    statusText: {
      fontSize: 18,
      textAlign: 'center',
      margin: 10,
      color: '#ffffff',
    },
  });

  export default App;
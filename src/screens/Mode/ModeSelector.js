import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Button
} from 'react-native';
import SwitchSelector from "react-native-switch-selector";
import { useNavigation } from '@react-navigation/native';

const App = () => {
  const [state, setState] = useState(false);
  const navigation = useNavigation();
  
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <SwitchSelector
            initial={0}
            onPress={() => setState(state)}
            textColor={colors.blue}
            selectedColor={colors.white}
            buttonColor={colors.blue}
            borderColor={colors.blue}
            hasPadding
            options={[
              { label: "Side A", state: "a" },
              { label: "Side B", state: "b" }
            ]}
            testID="component-switch-selector"
            accessibilityLabel="gender-switch-selector"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => navigation.navigate('LoginScreen')}
            title="Next"
            accessibilityLabel="Learn more about this blue button"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const colors = StyleSheet.create({
  white: '#FFFFFF',
  blue: '#0096FF'
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20
  }
});

export default App;


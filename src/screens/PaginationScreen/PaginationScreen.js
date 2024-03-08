import React, { useState } from 'react';
import { View, Text, StatusBar, ScrollView, StyleSheet } from 'react-native';
import Swiper from "react-native-web-swiper";

const styles = StyleSheet.create({
  container: {
      flex: 1
  },
  slideContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
  },
  slide1: {
      backgroundColor: "rgba(20,20,200,0.3)"
  },
  slide2: {
      backgroundColor: "rgba(20,200,20,0.3)"
  },
  slide3: {
      backgroundColor: "rgba(200,20,20,0.3)"
  },
});

const App = () => {
  return (    
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />
        <Text
              style={{
                fontSize: 24,
                fontWeight: '600',
                color: 'black',
              }}
            >
              Pagination Slider
        </Text>

        <View style={styles.container}>
            <Swiper
              controlsProps={{
                prevTitle: '',
                nextTitle: ''
              }}>
                <View style={[styles.slideContainer,styles.slide1]}>
                    <Text>Slide 1</Text>
                </View>
                <View style={[styles.slideContainer,styles.slide2]}>
                    <Text>Slide 2</Text>
                </View>
                <View style={[styles.slideContainer,styles.slide3]}>
                    <Text>Slide 3</Text>
                </View>
            </Swiper>
        </View>

      </View>
  );
};

export default App;
import React from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MenuScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={{marginVertical: 10}}>            
                <Text style={styles.titleStyle}>Select Features</Text>

                <Pressable style={styles.button} onPress={() => navigation.navigate('QrCodeScreen')}>
                  <Text style={styles.text}>QR Code</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => navigation.navigate('PaginationScreen')}>
                  <Text style={styles.text}>Pagination</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => navigation.navigate('ShotViewScreen')}>
                  <Text style={styles.text}>Multi-Touch</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => navigation.navigate('UserScreen')}>
                  <Text style={styles.text}>REST</Text>
                </Pressable>
        </View>
    );
};
export default MenuScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: "center",
      flexDirection: "row"
    },
    titleStyle: {
      margin: 10,
      fontSize: 25,
      fontWeight: "bold",
      color: "#161616",
      letterSpacing: 0.36,
      textAlign: "center",
      alignSelf: "stretch",
    },
    FlatListContainer: {
      width:"100%",
      height: 500,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    listContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    button: {
      alignItems:'center',
      justifyContent:'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      margin: 5,
      elevation:3,
      backgroundColor:'black'      
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight:'bold',
      letterSpacing: 0.25,
      color:'white'
    }
  });

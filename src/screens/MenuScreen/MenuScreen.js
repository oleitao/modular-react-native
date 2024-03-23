import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const MenuScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.listContainer}>
                <Text style={styles.titleStyle}>Select Features</Text>
                
                    <Button title="QR Code" onPress={() => navigation.navigate('QrCodeScreen')}
                    />
                    <Button title="Pagination" onPress={() => navigation.navigate('PaginationScreen')}
                    />
                    <Button title="Multi-Touch" onPress={() => navigation.navigate('ShotViewScreen')}
                    />
                    <Button title="REST" onPress={() => navigation.navigate('UserScreen')}
                    />                
            </View>
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
  });
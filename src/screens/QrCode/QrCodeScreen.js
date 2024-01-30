import React, { useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Button
} from 'react-native';
import DeviceInfo from 'react-native-device-info';

const App = () => {
  const [shouldShow, setShouldShow] = useState(false);

function GenerateQR()
{
    DeviceInfo.getUniqueId().then((uniqueId) => {
        qrvalue=uniqueId;
        setShouldShow(true);

        console.log(qrvalue);
      });
}

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {/*Here we will return the view when state is true and will return false if state is false*/}
        {shouldShow && (
            <QRCode
                value={qrvalue ? qrvalue : 'NA'}
                size={250}
                color="black"
                backgroundColor="white"
                logoSize={30}
                logoMargin={2}
                logoBorderRadius={15}
            />
        )}

        {!shouldShow && (
            <Button
                title="GENERATE QRCODE"
                onPress={() => GenerateQR()}
            />
        )}

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 10,
  },
});

export default App;


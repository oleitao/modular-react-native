import { useRef, useState } from "react";
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import ViewShot from "react-native-view-shot";
import {
    DocumentDirectoryPath,
    writeFile,
    readFile,
    unlink
} from 'react-native-fs';
import Realm from 'realm';

const ScreenCapture = () => {
    const viewShot = useRef(null);
    const [uri, setUri] = useState("");

    const captureScreen = () => {
      viewShot.current.capture().then((uri) => {

          /*
            // Store a file
            const filePath = `${DocumentDirectoryPath}/myFile.txt`;
            writeFile(filePath, 'Hello world!', 'utf8')
            .then(() => console.log({filePath}))
            .catch(err => console.log('Error saving file', err));

            // Retrieve a file
            readFile(filePath, 'utf8')
            .then(contents => console.log('File contents', contents))
            .catch(err => console.log('Error reading file', err));

            // Delete a file
            unlink(filePath)
            .then(() => console.log('File deleted successfully'))
            .catch(err => console.log('Error deleting file', err));
          */

            const PersonSchema = {
              name: 'Person',
              primaryKey: 'id',
              properties: {
                id: 'int',
                name: 'string'
              }
            };
        
            // Open a Realm
            let realm = new Realm({schema: [PersonSchema]});

          // Insert an object
          realm.write(() => {
            realm.create('Person', {
              id: 1,
              name: 'John Doe'
            });
          });



          // Retrieve an object
          let person = realm.objects('Person').filtered('id = 1');
          console.log(person); // logs 'John Doe'          

          setUri(uri);
      });
    };



    // Delete a file
    /*
    unlink(filePath)
    .then(() => console.log('File deleted successfully'))
    .catch(err => console.log('Error deleting file', err));
    */
   
    return (
    <View style={styles.container}>
        <ViewShot ref={viewShot} style={styles.viewShot}>
        <View style={{ width: 200, height: 200, backgroundColor: "red" }} />
        </ViewShot>

        <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={captureScreen} style={styles.btn}>
            <Text style={styles.btnTxt}>CAPTURE</Text>
        </TouchableOpacity>
        </View>

        {uri ? (
        <View style={styles.previewContainer}>
            <Text>Preview</Text>
            <Image
            source={{ uri: uri }}
            style={styles.previewImage}
            resizeMode="contain"
            />
        </View>
        ) : null}
    </View>
    );
};

const SCREEN_WIDTH = Dimensions.get("screen").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewShot: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
  },
  buttonContainer: {
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  btn: {
    padding: 8,
  },
  btnTxt: {
    fontSize: 20,
    fontWeight: "bold",
  },

  //   previewContainer
  previewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#000",
  },
  previewImage: { width: 200, height: 200, backgroundColor: "#fff" },
});

export default ScreenCapture;
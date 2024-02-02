import React, { Component, useRef, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  Dimensions,
} from "react-native";
import { MultiTouchView } from 'expo-multi-touch';
import ViewShot from "react-native-view-shot";
import Realm from 'realm';

const colors = ['red', 'blue', 'yellow', 'green', 'orange', 'cyan', 'plum', 'gray', 'purple'];

const JSONSchema = {
  name: 'Move',
  properties: {
    index: 'int',
    type: 'string',
    deltaX: 'float',
    deltaY: 'float',
    isTap: 'bool'
  }
};

let realm = new Realm({schema: [JSONSchema]});

export default class Move extends Component {
  state = {
    touches: {},
  }; 

  touchProps = {
    onTouchBegan: event => {
      const { identifier } = event;
      this.setState(previous => ({
        touches: {
          ...previous.touches,
          [identifier]: event,
        },
      }));
    },
    onTouchMoved: event => {
      const { identifier } = event;
      this.setState(previous => ({
        touches: {
          ...previous.touches,
          [identifier]: event,
        },
      }));
    },
    onTouchEnded: event => {
      const { identifier, deltaX, deltaY, isTap } = event;
      this.setState(previous => ({
        touches: {
          ...previous.touches,
          [identifier]: null,
        },
      }));

      realm.write(() => {
        realm.create('Move', {
          index:0,
          type: 'onTouchEnded',
          deltaX: 0,
          deltaY: 0,
          isTap: true
        });
      });

      console.log('onTouchEnded', identifier, deltaX, deltaY, isTap);
    },
    onTouchCancelled: event => {
      const { identifier, deltaX, deltaY, isTap } = event;
      this.setState(previous => ({
        touches: {
          ...previous.touches,
          [identifier]: null,
        },
      }));
    },
    onTouchesBegan: event => {
      const { identifier, deltaX, deltaY, isTap } = event;
      console.log('onTouchesBegan');

      realm.write(() => {
        realm.create('Move', {
          index:0,
          type: 'onTouchesBegan',
          deltaX: 0,
          deltaY: 0,
          isTap: true
        });
      });

    },
    onTouchesMoved: () => {},
    onTouchesEnded: () => {
      console.log('onTouchesEnded');

      realm.write(() => {        
        realm.create('Move', {
          index:0,
          type: 'onTouchEnded',
          deltaX: 0,
          deltaY: 0,
          isTap: true
        });
      });

    },
    onTouchesCancelled: () => {
      console.log('onTouchesCancelled');

      realm.write(() => {
        realm.create('Move', {
          index:0,
          type: 'onTouchesCancelled',
          deltaX: 0,
          deltaY: 0,
          isTap: isTap
        });
      });

    },
  };

  _renderUri = () => () => {
    const[uri, setUri] = useState("");
    return {uri}
  }

  _renderViewShot = () => () => {
    return useRef(null);
  }
 
  render() {
    const { touches } = this.state;
    const viewShot = this._renderViewShot();
    const uri = this._renderUri();

    const captureScreen = () => {
      viewShot.current.capture().then((uri) => {
          setUri(uri);
      });
    };

    return (
      <View style={{ flex: 1, backgroundColor: 'orange' }}>
        <MultiTouchView style={{ flex: 1 }} {...this.touchProps}>
          <View style={styles.container}>            

          <ViewShot ref={this.viewShot} style={styles.viewShot}>
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

            {Object.values(touches).map((item, index) => {
              if (!item) {
                return null;
              }

              realm.write(() => {
                realm.create('Move', {
                  index: index,
                  type: 'Moving',
                  deltaX: item.locationX,
                  deltaY: item.locationY,
                  isTap: false
                });
              });

              console.log(index, item.locationX, item.locationY);

              return (
                <View
                  key={index}
                  style={[
                    styles.touch,
                    {
                      transform: [
                        { translateX: -TOUCH_SIZE / 2 },
                        { translateY: -TOUCH_SIZE / 2 },
                        { scale: 1 + (item.force || 0) * 2 },
                      ],
                      backgroundColor: colors[index % colors.length],
                      top: item.pageY,
                      left: item.pageX,
                    },
                  ]}
                />
              );
            })}
          </View>
        </MultiTouchView>
      </View>
    );
  }
}

const TOUCH_SIZE = 56;
const SCREEN_WIDTH = Dimensions.get("screen").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  touch: {
    position: 'absolute',
    aspectRatio: 1,
    width: TOUCH_SIZE,
    borderRadius: TOUCH_SIZE / 2,
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
  previewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#000",
  },
  previewImage: { width: 200, height: 200, backgroundColor: "#fff" },
});
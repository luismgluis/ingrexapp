import React, {Component} from 'react';
import {View, Text, Pressable} from 'react-native';
class loginScreen extends Component {
  handlePress = () => {
    console.log('hola');
  };
  render() {
    return (
      <View>
        <Text>hla</Text>
        <Pressable onPress={this.handlePress}>
          <Text>Hola</Text>
        </Pressable>
      </View>
    );
  }
}
export default loginScreen;

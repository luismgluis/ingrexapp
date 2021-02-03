import React, { Component } from 'react';
import { Pressable, Text, View } from 'react-native';
class PerfilScreen extends Component {
    handlePress = () => {
        console.log('hola');
    };
    render() {
        return (
            <View>
                <Text>PerfilScreen</Text>
                <Pressable onPress={this.handlePress}>
                    <Text>Hola</Text>
                </Pressable>
            </View>
        );
    }
}
export default PerfilScreen;
import { Button, Divider, Layout, Text } from '@ui-kitten/components';
import React, { Component } from 'react';
class loginScreen extends Component {
  handlePress() {
    console.log('hola');
    this.props.navigation.navigate('CreateUser');
  };
  goToHome() {
    console.log('pepe');

  }
  render() {
    return (
      <Layout style={{ paddingTop: 20, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text category='h1'>Login</Text>
        <Divider />
        <Button onPress={this.handlePress}>Hola</Button>
      </Layout>
    );
  }
}
export default loginScreen;

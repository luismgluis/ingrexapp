import { Button, Divider, Layout, Text } from '@ui-kitten/components';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
class loginScreen extends Component {
  handlePress() {
    console.log('hola');
    this.props.navigation.navigate('CreateUser');
  };
  goToHome() {
    console.log('pepe');
    this.props.navigation.navigate('HomeStack', { screen: 'HomeScreen' });
  }
  render() {
    return (
      <Layout style={{ paddingTop: 20, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text category='h1'>Login</Text>
        <Divider style={styles.divider} />
        <Button onPress={this.handlePress.bind(this)}>Hola</Button>
        <Divider style={styles.divider} />
        <Button onPress={this.goToHome.bind(this)}>go to home</Button>
      </Layout>
    );
  }
}
const styles = StyleSheet.create({
  divider: {
    marginBottom: 10
  }
})
export default loginScreen;

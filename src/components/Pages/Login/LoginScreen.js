import { Button, Divider, Icon, Input, Layout, Spinner, Text } from '@ui-kitten/components';
import React, { Component } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
let mounted = false;
class loginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secureTextEntry: true,
      user: "",
      password: ""
    }
    if (!mounted) {
      mounted = true;

    }
  }
  handlePressss() {
    console.log('hola');
    this.props.navigation.navigate('CreateUser');
  };
  goToHome() {
    console.log('pepe');
    this.props.navigation.navigate('HomeStack', { screen: 'HomeScreen' });
  }
  setUser(value) {
    this.setState({
      ...this.state,
      user: value
    })
  }
  setPassword(value) {
    this.setState({
      password: value
    })
  }
  setSecureTextEntry(value) {
    this.setState({
      secureTextEntry: value
    })
  }
  toggleSecureEntry() {
    const context = this;
    console.log(this);
    const state = context.state;
    context.setSecureTextEntry(!state.secureTextEntry);
  }
  render() {
    const context = this;
    const state = context.state;
    const AlertIcon = (props) => (
      <Icon {...props} name='alert-circle-outline' />
    );
    const renderIcon = (props) => (
      <TouchableWithoutFeedback onPress={this.toggleSecureEntry.bind(context)}>
        <Icon {...props} name={state.secureTextEntry ? 'eye-off' : 'eye'} />
      </TouchableWithoutFeedback>
    );
    return (
      <Layout style={styles.container}>
        <Text category="h1">Bienvenido</Text>
        <Divider style={styles.divider} />
        <Text category="h6">Ingresa tus datos</Text>
        <Layout style={styles.panel} >
          <Input style={styles.input}
            value={state.user}
            label='User'
            placeholder='Example@email.com'
            onChangeText={nextValue => context.setUser.call(context, nextValue)}
          />
          <Input style={styles.input}
            value={state.password}
            label='Password'
            placeholder='Place your Text'
            caption='Should contain at least 8 symbols'
            accessoryRight={renderIcon}
            captionIcon={AlertIcon}
            secureTextEntry={state.secureTextEntry}
            onChangeText={nextValue => context.setPassword.call(context, nextValue)}
          />
        </Layout>
        <Button onPress={() => { }}>Login</Button>
        <Divider style={styles.divider} />
        <Spinner size='giant' status='info' />
        <Button
          appearance="ghost"
          onPress={context.goToHome.bind(context)}>
          Create Account
          </Button>
      </Layout>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  panel: {
    width: "80%"
  },
  input: {
    marginBottom: 30
  },
  divider: {
    paddingVertical: 20
  }
})
export default loginScreen;

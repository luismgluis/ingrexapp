import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionsCurrentSession from './../../../actions/actionsCurrentSession';
import CreateUser from './CreateUser/CreateUserScreen';
import LoginScreen from './LoginScreen';

const { Navigator, Screen } = createStackNavigator();
let mounted = false;
class LoginStack extends Component {
  constructor(props) {
    super(props)
    if (!mounted) {
      mounted = true;
      console.log(this.props);
      setTimeout(() => {
        this.props.traerTodos();
        setTimeout(() => {
          console.log(this.props);
        }, 100);
      }, 5000);
    }

  }
  render() {
    return (
      <Navigator
        headerMode='none'
        screenOptions={{
          headerShown: false
        }}>
        <Screen name="LoginScreen" component={LoginScreen} />
        <Screen name="CreateUser" component={CreateUser} />
      </Navigator>
    );
  }
}
const mapStateToProps = (reducers) => {
  return reducers.currentSession;
};
export default connect(
  mapStateToProps,
  actionsCurrentSession)(LoginStack);

//export default LoginStack;

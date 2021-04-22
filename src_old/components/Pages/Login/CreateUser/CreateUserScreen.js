import { Button, Divider, Layout, Text } from '@ui-kitten/components';
import React, { Component } from 'react';
class CreateUser extends Component {
    handlePress() {
        this.props.navigation.navigate('LoginScreen');
    };
    goToHome() {
    }
    render() {
        return (
            <Layout style={{ paddingTop: 20, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text category='h1'>Create user</Text>
                <Divider />
                <Button onPress={this.handlePress.bind(this)}>Hola</Button>
            </Layout>
        );
    }
}
export default CreateUser;

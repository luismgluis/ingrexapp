import LottieView from 'lottie-react-native';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
class SplashScreen extends Component {
    render() {
        const context = this;
        setTimeout(() => {
            context.props.navigation.navigate('LoginStack')
        }, 2000);
        return (
            <View style={styles.container}>
                <LottieView
                    source={require('../../../assets/splash/splash.json')}
                    autoPlay
                    loop
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
export default SplashScreen;
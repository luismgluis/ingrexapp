import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import SvgUri from 'react-native-svg-uri';

class CIcon extends Component {
    getPath() {
        let svgName = ""
        if (typeof this.props.path !== "undefined") {
            svgName = this.props.path;
        } else {
            svgName = "/perfil/defaultUser.svg"
        }
        console.log("pathhh", `../../../assets/svg/${svgName}`);

        return `../../../assets/svg/${svgName}`
    }
    getSize() {
        console.log('size');

        let size = {
            w: "50",
            h: "50"
        }
        if (typeof this.props.style.width !== "undefined") {
            size.w = this.props.style.width + "";
        }
        if (typeof this.props.style.height !== "undefined") {
            size.h = this.props.style.height + "";
        }
        return size;
    }
    render() {
        //{ uri: 'http://thenewcode.com/assets/images/thumbnails/homer-simpson.svg' }
        let size = this.getSize();
        let stylesContainer = Object.assign({}, styles.container);
        //stylesContainer.width = parseInt(size.w);
        //stylesContainer.height = parseInt(size.h);
        return (
            <View style={styles.container}>
                <SvgUri
                    width={size.w}
                    height={size.h}
                    source={require(`../../../assets/perfil/defaultUser.svg`)}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    panelLeft: {
        flex: 6
    },
    panelRight: {
        flex: 6
    }
})
export default CIcon;
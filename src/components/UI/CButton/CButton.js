import React, { useState } from "react";
import { Button, Icon } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

const CButton = ({ styles = {}, icon, type, type2, textButton = "", onPress = () => { } }) => {
    function MyIcon(icon) {
        return (props) => (
            <Icon {...props} name={icon} />//'star' />
        );
    }
    const context = this;
    let stylesv = StyleSheet.create({});
    if (Object.keys(styles).length > 0) {
        stylesv = { ...styles };
    }
    let appearance = "false";
    if (typeof type2 !== "undefined") {
        appearance = type2;
    }
    let thetype = "basic";
    if (typeof type !== "undefined") {
        thetype = type;
    }
    stylesv.paddingHorizontal = 4;
    /* appearance={(appearance !== "") ? appearance : ""}*/
    return (
        <View style={{ ...Ostyles.container, ...stylesv }}>
            <Button style={Ostyles.button}
                onPress={onPress}
                status={thetype}
                accessoryLeft={MyIcon(icon)}>
                {textButton}
            </Button>
        </View>
    );
}
const Ostyles = StyleSheet.create({
    container: {
        marginHorizontal: 2
    },
    button: {
        borderRadius: 12,
    },
})
export default CButton;


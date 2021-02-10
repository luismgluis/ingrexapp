import { Button, Icon } from '@ui-kitten/components';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
class CButton extends Component {
    /** constructor() {
            
        }super(props)
         this.icon = "star";
         if (typeof this.props.icon !== "undefined") {
             this.icon = this.props.icon;
         }
         this.type = "primary";
         if (typeof this.props.type !== "undefined") {
             this.type = this.props.type;
         }
         this.textButton = "";
         if (typeof this.props.textButton !== "undefined") {
             this.textButton = this.props.textButton;
         } */

    MyIcon(icon) {
        return (props) => (
            <Icon {...props} name={icon} />//'star' />
        );
    }
    /**
     * 
     * @param {String} icon Icon Name from https://akveo.github.io/eva-icons/#/
     * @param {*} type Button type between success, danger, primary, ghost, outline
     */
    render() {
        const context = this;
        let stylesv = StyleSheet.create({});
        if (typeof this.props.styles !== "undefined") {
            stylesv = this.props?.styles;
        }
        let appearance = "false";
        if (typeof this.props.type2 !== "undefined") {
            appearance = this.props.type2;
        }
        let thetype = "basic";
        if (typeof this.props.type !== "undefined") {
            thetype = this.props.type;
        }
        let textButton = "";
        if (typeof this.props.textButton !== "undefined") {
            textButton = this.props.textButton;
        }
        stylesv.paddingHorizontal = 5;
        /* appearance={(appearance !== "") ? appearance : ""}*/
        return (
            <View style={stylesv}>
                <Button style={styles.button}
                    status={thetype}
                    accessoryLeft={context.MyIcon(context.props.icon)}
                >
                    {textButton}
                </Button>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    button: {
        borderRadius: 12,
    },
})
export default CButton;
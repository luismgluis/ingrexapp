
import { Button, Icon, Layout, Popover, Text } from '@ui-kitten/components';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import CSearch from './../../UI/CSearch/CSearch';
class SelectPerfil extends Component {
    constructor(props) {
        super(props);
        this.selectedIndex = "1";
        this.state = {
            visible: false,
            title: "INGREXAPP"
        }
        this.searchEnabled = true;
        if (typeof props.searchEnabled !== "undefined") {
            this.searchEnabled = props.searchEnabled;
        }
    }
    setVisible(yesno) {
        this.setState({
            visible: yesno
        })
        console.log(yesno, this.state.visible);
    }

    renderOptionButton(icon, actionFn) {
        const context = this;
        const theIconLeft = (props) => {
            return (
                <Icon {...props} name={icon} />
            )
        }
        return (
            <Button
                style={styles.buttonToggle}
                status="basic"
                appearance='ghost'
                accessoryRight={theIconLeft}
                onPress={() => actionFn()}>
            </Button>
        )
    }
    renderToggleButton() {
        const context = this;

        const theIconLeft = (props) => {
            return (
                <Icon {...props} name="chevron-down-outline" />
            )
        }
        return (
            <Button
                style={styles.buttonToggle}
                status="basic"
                appearance="ghost"
                accessoryRight={theIconLeft}
                onPress={() => context.setVisible(true)}>
                {context.state.title}
            </Button>
        )
    }
    render() {
        const context = this;
        const state = this.state;
        return (
            <Layout style={styles.container}>
                <View style={styles.panelOne}>
                    <Popover
                        anchor={context.renderToggleButton.bind(context)}
                        visible={state.visible}
                        placement="bottom"
                        onBackdropPress={() => context.setVisible(false)}>
                        <Layout style={styles.content}>
                            <Icon style={styles.icon}
                                fill='#8F9BB3'
                                name='star' />
                            <Text>
                                Welcome to UI Kitten 😻
                            </Text>
                        </Layout>
                    </Popover>
                </View>
                <Layout style={styles.panelTwo} >
                    {this.renderOptionButton("star", () => { })}
                    {this.searchEnabled &&
                        <CSearch />
                    }
                </Layout>
            </Layout>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 12,
        flexDirection: "row",
        maxHeight: 50
    },
    select: {
        flex: 10,
        //height:60
        fontSize: 20,
        borderRadius: 0,
        elevation: 0,
        //borderColor: "black"
    },
    icon: {
        width: 32,
        height: 32,
    },
    panelOne: {
        flex: 6,
        alignSelf: "stretch",
        alignItems: "flex-start"
    },
    panelTwo: {
        flex: 6,
        flexDirection: "row-reverse",
        alignSelf: "stretch",
        alignItems: "flex-end"
    },
    buttonToggle: {
    },
    buttonsOptions: {

    },
    conten: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 4,
        paddingVertical: 8,
    }

})
export default SelectPerfil;
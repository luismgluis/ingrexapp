'use strict'
import { Avatar, Divider, Layout, Text } from '@ui-kitten/components';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import CButton from '../CButton/CButton';
import CIcon from '../CIcon/CIcon';


class PerfilHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarVisible: false
        };
        /* */
    }
    getPerfilImage(withAvatar) {
        if (withAvatar) {
            return (
                <Avatar style={styles.avatar}
                    size='giant'
                    source={require('../../../assets/perfil/user.png')} />)
        } else {
            return (<CIcon style={styles.avatar} />)
        }
    };
    componentDidMount() {
        return
    }
    render() {
        const context = this;
        return (
            <Layout style={styles.container} level="1">
                <Layout style={styles.containerTop}>
                    <Layout style={styles.panelLeft} >
                        {this.state.avatarVisible == true &&
                            this.getPerfilImage(true)}
                        {this.state.avatarVisible == false &&
                            this.getPerfilImage(false)}
                    </Layout>
                    <Layout style={styles.panelRight}>
                        <Layout>
                            <Text category="h5" >Fulano suntano</Text>
                            <Text category="s2">Empresa Cocoa</Text>
                            <Divider />
                            <Text
                                style={styles.description}
                                category="s1">Esta es una super empresa</Text>
                        </Layout>
                    </Layout>
                </Layout>
                <Layout style={styles.containerBottom}>
                    <Layout style={styles.panelActions}>
                        <CButton icon={"activity-outline"}
                            type="primary" textButton="Hola" />
                        <CButton icon={"activity-outline"} />
                        <CButton icon={"activity-outline"} />
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerTop: {
        maxHeight: 120,
        flex: 12,
        flexDirection: "row",
    },
    containerBottom: {
        flex: 12,
        alignContent: "center",
        maxHeight: 60,
    },
    panelLeft: {
        width: "30%",
        padding: 10,
        alignSelf: "center",
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: 80,
        height: 80
    },
    panelRight: {
        width: "70%",
        paddingRight: 10
    },
    description: {
        marginTop: 10
    },
    panelActions: {
        flex: 12,
        flexDirection: "row",
        paddingVertical: 4,
        alignSelf: "stretch",
        maxHeight: 50,
        marginTop: 10
    },
    panelActionsLeft: {
        flex: 5,
        flexDirection: "row",
        paddingHorizontal: 5
    },
    panelActionsRight: {
        flex: 5,
        flexDirection: "row",
        justifyContent: "space-around"
    },

})
export default PerfilHeader;
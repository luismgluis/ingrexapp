import { Avatar, Divider, Layout, Text } from '@ui-kitten/components';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import CButton from '../CButton/CButton';
import CIcon from '../CIcon/CIcon';
import Api from "./../../../libs/api/api";

const PerfilHeader = ({ navigation, route, title = "", subtitle = "", description = "" }) => {
    console.log("perfilHeader", navigation);
    const [avatarVisible, setAvatarVisible] = useState(false);
    const getPerfilImage = (withAvatar) => {
        if (withAvatar) {
            return (
                <Avatar style={styles.avatar}
                    size='giant'
                    source={require('../../../assets/perfil/user.png')} />
            )
        } else {
            return (<CIcon style={styles.avatar} />)
        }
    };
    const primaryBtnClick = () => {
        const callBackToUploadPost = (data) => {
            console.log("PerfilHeader - backdata", data);
            navigation.navigate("CreatePost", { imageData: data });
        }
        navigation.navigate("GalleryCustom", { callBack: callBackToUploadPost });

    }
    return (
        <Layout style={styles.container} level="1">
            <Layout style={styles.containerTop}>
                <Layout style={styles.panelLeft} >
                    {avatarVisible &&
                        getPerfilImage(true)}
                    {!avatarVisible &&
                        getPerfilImage(false)}
                </Layout>
                <Layout style={styles.panelRight}>
                    <Layout>
                        <Text category="h5" >{title}</Text>
                        <Text category="s2">{subtitle}</Text>
                        <Divider />
                        <Text
                            style={styles.description}
                            category="s1">{description}</Text>
                    </Layout>
                </Layout>
            </Layout>
            <Layout style={styles.containerBottom}>
                <Layout style={styles.panelActions}>
                    <CButton icon={"plus-outline"}
                        onPress={primaryBtnClick}
                        type="primary" textButton="Product" />
                    <CButton icon={"plus-outline"} textButton="Product" />
                    <CButton icon={"activity-outline"} />
                </Layout>
            </Layout>
        </Layout>
    );
};

export default PerfilHeader;

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

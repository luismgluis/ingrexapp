import { StyleSheet } from "react-native";
import React, { useState } from "react";
import Panel from "../../../ui/Panel/Panel";
import { Divider } from "@ui-kitten/components";
import CTopBack from "../../../ui/CTopBack/CTopBack";

import PerfilAvatar from "../../../ui/Perfil/PerfilAvatar/PerfilAvatar";
import { useFocusEffect } from "@react-navigation/core";
import useCustomBackHandler from "../../../hooks/useCustomBackHandler";
import CButton from "../../../ui/CButton/CButton";
import { FeedImageType } from "../../../ui/FeedImages/FeedImages";
import LoginInputSecure from "../LoginInputSecure/LoginInputSecure";
import CInput from "../../../ui/CInput/CInput";

import api from "../../../../libs/api/api";
import utils from "../../../../libs/utils/utils";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: { padding: 50 },
  input: {},
  avatar: {
    width: 100,
    height: 100,
  },
  divider: { height: 10 },
});

const TAG = "LOGIN CREATE ACCOUNT";

const LoginCreateAccount: React.FC = (props) => {
  const navigation = useNavigation();
  useFocusEffect(
    useCustomBackHandler(() => {
      navigation.goBack();
      return false;
    }),
  );
  const [form, setForm] = useState({
    name: "",
    nickname: "",
    email: "",
    password1: "",
    password2: "",
  });

  const [profileImage, setProfileImage] = useState({
    dimensions: "",
    uri: "",
  });
  const onSelectProfileImage = (data: FeedImageType) => {
    setProfileImage({
      uri: data.uri,
      dimensions: data.dimensions!,
    });
  };
  const validateForm = () => {
    if (
      form.password1 == form.password2 &&
      utils.validateEmail(form.email) &&
      form.name !== "" &&
      form.nickname !== ""
    ) {
      return true;
    } else {
      return false;
    }
  };
  const create = () => {
    if (!validateForm()) {
      console.error(TAG, "reject form");
      return;
    }
    api
      .createUserWithEmail({
        ...form,
        profileImage: { ...profileImage },
      })
      .then(() => {
        navigation.navigate("Login");
      });
  };
  return (
    <Panel level="5" totalHeight={0}>
      <CTopBack
        title="Create Account"
        onBackPress={() => navigation.goBack()}
      />
      <Panel
        withScroll={true}
        totalHeight={30}
        paddingHorizontal={50}
        verticalCenter={true}
        horizontalCenter={true}
        style={styles.container}>
        <PerfilAvatar
          imageUri={profileImage.uri}
          changeButtonEnabled={true}
          onSelect={onSelectProfileImage}
        />
        <CInput
          style={styles.input}
          value={form.name}
          paddingVertical={10}
          label="Name"
          placeholder="Your name"
          onChangeText={(nextValue) =>
            setForm({
              ...form,
              name: nextValue,
            })
          }
        />
        <CInput
          style={styles.input}
          value={form.nickname}
          paddingVertical={10}
          label="NickName"
          placeholder="Name into app"
          onChangeText={(nextValue) =>
            setForm({
              ...form,
              nickname: nextValue,
            })
          }
        />
        <Divider style={styles.divider} />
        <CInput
          style={styles.input}
          value={form.email}
          paddingVertical={10}
          label="Email"
          placeholder="example@mail.com"
          onChangeText={(nextValue) =>
            setForm({
              ...form,
              email: nextValue,
            })
          }
        />
        <LoginInputSecure
          style={styles.input}
          password={form.password1}
          label="Password"
          placeholder="********"
          setPassword={(nextValue) =>
            setForm({
              ...form,
              password1: nextValue,
            })
          }
        />
        <LoginInputSecure
          style={styles.input}
          password={form.password2}
          label="Repeat passwordd"
          placeholder="********"
          setPassword={(nextValue) =>
            setForm({
              ...form,
              password2: nextValue,
            })
          }
        />
        <Divider style={styles.divider} />
        <CButton paddingVertical={20} text="Create" onPress={create} />
      </Panel>
    </Panel>
  );
};
export default LoginCreateAccount;

import { Input, Layout, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { Dimensions, StyleSheet, Image, Button } from "react-native";
import CTopBack from "../../UI/CTopBack/CTopBack";
import CButton from "../../UI/CButton/CButton";
import Api from "../../../libs/api/api";
import alert from "../../../libs/alert/alert";
import { Business, Product } from "../../../libs/api/interfaces";

const win = Dimensions.get("window");
const TAG = "CREATE POST";

const Post = ({
  navigation,
  route,
  imgUri = "file:///storage/emulated/0/Download/PHOTO_20200618_175433-01.jpg",
}) => {
  try {
    const imageData = route.params.imageData;
    if (typeof imageData.uri !== "undefined") {
      imgUri = imageData.uri;
    }
  } catch (error) {
    console.log(TAG, "CreatePost fail get route.params.imageData", error);
  }
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const onBackPress = () => {
    navigation.goBack();
  };
  const onSave = () => {
    console.log(TAG, "onpressss", navigation, route);

    const newBusiness = new Product();
    newBusiness.create(name, description);

    if (name == "") {
      alert.show("Need a name");
      return;
    }
    if (imgUri == "") {
      alert.show("Need an image");
      return;
    }
    Api.saveProduct(newBusiness, imgUri).then((res) => {
      if (res) {
        navigation.goBack();
      }
    });
  };

  return (
    <Layout style={styles.container}>
      <CTopBack onBackPress={onBackPress} title={"Upload post"} />
      <Layout style={styles.container}>
        <Layout level="2" style={styles.panelImg}>
          {imgUri !== "" && (
            <Image
              style={styles.theImg}
              source={{ uri: imgUri }}
              resizeMode="contain"></Image>
          )}
        </Layout>
        <Layout style={styles.panelBasics}>
          <Input
            style={styles.input}
            value={name}
            label="Name"
            placeholder="Product name"
            onChangeText={(nextValue) => setName(nextValue)}
          />
          <Input
            multiline={true}
            value={description}
            textStyle={{ minHeight: 64 }}
            label="Description"
            placeholder="Example@email.com"
            onChangeText={(nextValue) => setDescription(nextValue)}
          />
        </Layout>
        <Layout style={styles.panelButton}>
          <CButton
            onPress={onSave}
            type="primary"
            icon="checkmark-outline"
            textButton="SAVE"
          />
        </Layout>
      </Layout>
    </Layout>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  panelBasics: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  panelImg: {
    width: "100%",
    height: win.height / 2 - 100,
  },
  theImg: {
    width: win.width,
    height: win.height / 2 - 100,
  },
  input: {
    paddingBottom: 5,
  },
  panelButton: {
    paddingTop: 10,
    flex: 1,
    alignItems: "center",
  },
  button: {},
});

export default Post;

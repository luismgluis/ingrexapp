import { Input, Layout, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { Dimensions, StyleSheet, Image, Button } from "react-native";
import CTopBack from "../../UI/CTopBack/CTopBack";
import CButton from "../../UI/CButton/CButton";
import api from "../../../libs/api/api";
import alert from "../../../libs/alert/alert";
import { Business, Product } from "../../../libs/api/interfaces";
import ImageResizer from "react-native-image-resizer";
import { FeedImageType } from "../../UI/FeedImages/FeedImages";

const win = Dimensions.get("window");
const TAG = "CREATE POST";

const Post = ({
  navigation,
  route,
  imgUri = "file:///storage/emulated/0/Download/PHOTO_20200618_175433-01.jpg",
}) => {
  try {
    const imageData: FeedImageType = route.params.imageData;
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
    newBusiness.create(api.currentBusiness.id, name, description);

    if (name == "") {
      alert.show("Need a name");
      return;
    }
    if (imgUri == "") {
      alert.show("Need an image");
      return;
    }

    ImageResizer.createResizedImage(imgUri, 600, 600, "JPEG", 100, 0)
      .then((response) => {
        // response.uri is the URI of the new image that can now be displayed, uploaded...
        // response.path is the path of the new image
        // response.name is the name of the new image with the extension
        // response.size is the size of the new image
        const progressFn = (progress: number) => {
          console.log(TAG, progress);
        };

        api.saveProduct(newBusiness, response.uri, progressFn).then((res) => {
          if (res) {
            alert.show("Upload Success");
            navigation.goBack();
            return;
          }
          alert.show("Upload failed", "try again");
        });
      })
      .catch((err) => {
        // Oops, something went wrong. Check that the filename is correct and
        // inspect err to get more details.
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

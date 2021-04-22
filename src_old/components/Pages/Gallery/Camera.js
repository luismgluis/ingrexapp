import CameraRoll from "@react-native-community/cameraroll";
import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";

import FeedImages from "../../UI/FeedImages/FeedImages";

const Camera = () => {
  return (
    <Layout style={styles.container}>
      <Text category="h5">hola</Text>
      <FeedImages />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 12
  }
})
export default Camera;
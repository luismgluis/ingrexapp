import { Layout } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, View } from "react-native";

import FeedImages from "./../../UI/FeedImages/FeedImages";
import PerfilHeader from "./../../UI/PerfilHeader/PerfilHeader";
import SelectPerfil from "./../../UI/SelectPerfil/SelectPerfil";
const MySelectPerfil = () => {
  const action = (key) => {
    console.log(key);
  }
  const dropOptions = [
    {
      title: "EmpresaX",
      onPress: () => { action("option1") },
      iconName: "briefcase-outline"
    },
    {
      title: "Crear",
      onPress: () => { action("option2") },
      iconName: "plus-outline"
    }
  ]
  return (
    <SelectPerfil
      dropTitle={dropOptions[0].title}
      dropOptions={dropOptions}
      searchEnabled={false} />
  )
}
const PerfilScreen = () => {

  return (
    <View style={styles.father}>
      <Layout style={styles.panelOne}>
        <MySelectPerfil />
      </Layout>
      <View style={styles.view0}>
        <View style={styles.view1}>
          <PerfilHeader />
        </View>
        <View style={styles.view2}>
          <FeedImages />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  father: { flex: 12 },
  view0: { flex: 12 },
  view1: {
    flex: 2,
    backgroundColor: "#3366FF",
  },
  view2: {
    flex: 4,
    backgroundColor: "#7CD628",
  },
  container: {
    flex: 12,
    flexDirection: "column",
    alignItems: "stretch",
  },
  panelOne: {
    height: 50,
    backgroundColor: "red",
  },
  panelTwo: {
    flex: 4,
    flexDirection: "row",
  },
  panelThree: {
    flex: 8,
    flexDirection: "row",
  },
});

export default PerfilScreen;

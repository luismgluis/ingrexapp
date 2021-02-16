import { Layout } from "@ui-kitten/components";
import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, View } from "react-native";

import FeedImages from "./../../UI/FeedImages/FeedImages";
import PerfilHeader from "./../../UI/PerfilHeader/PerfilHeader";
import SelectPerfil from "./../../UI/SelectPerfil/SelectPerfil";
import Api from "./../../../libs/api/api";
import Alert from "./../../../libs/alert/alert";
import { useSelector, useDispatch } from "react-redux";
import * as actionsGeneral from "./../../../actions/actionsGeneral";

const MySelectPerfil = () => {
  const counter = useSelector(state => {
    console.log(state);
  })
  const dispatch = useDispatch()

  const action = (key) => {
    if (key == null) {
      return;
    }
    console.log(key);
    dispatch(actionsGeneral.setActualBusiness({ name: key }))
  }
  const dropOptionsDefault = [
    {
      title: "Crear",
      onPress: () => { action(null) },
      iconName: "plus-outline",
      systemOption: true
    }
  ];
  const [dropOptions, setDropOptions] = useState([]);
  const getOptions = useCallback(() => {
    Api.getMyBusiness().then((data) => {
      let replaceArray = [...dropOptionsDefault].slice();
      for (const key in data) {
        if (!Object.hasOwnProperty.call(data, key)) {
          continue;
        }
        const business = data[key];
        const newItem = {
          title: business.name.toUpperCase(),
          onPress: () => { action(business) },
          iconName: "briefcase-outline",
          systemOption: false
        }
        replaceArray.unshift(newItem);
      }
      setDropOptions(replaceArray);
    }).catch((error) => {
      console.log(error);
      Alert.show("Fail", "Can't get user business")
    })
  })
  useEffect(() => {
    getOptions();
  }, [])
  return (
    <SelectPerfil
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

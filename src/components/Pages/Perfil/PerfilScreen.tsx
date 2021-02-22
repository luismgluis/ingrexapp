import { Layout } from "@ui-kitten/components";
import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, View } from "react-native";

import FeedImages from "../../UI/FeedImages/FeedImages";
import PerfilHeader from "../../UI/PerfilHeader/PerfilHeader";
import SelectPerfil from "../../UI/SelectPerfil/SelectPerfil";
import api from "../../../libs/api/api";
import Alert from "../../../libs/alert/alert";
import { useSelector, useDispatch } from "react-redux";
import * as actionsGeneral from "../../../actions/actionsGeneral";
import { Business, Product } from "../../../libs/api/interfaces";
import { FeedImageType } from "./../../../components/UI/FeedImages/FeedImages";
import { call } from "react-native-reanimated";

const TAG = "PERFIL SCREEN";
const MySelectPerfil = () => {
  const dispatch = useDispatch();

  const action = (key: Business) => {
    if (!(key instanceof Business)) {
      console.log(TAG, "Key isn't a business instance");
      return;
    }
    console.log(TAG, key);
    dispatch(actionsGeneral.setCurrentBusiness(key));
  };
  const dropOptionsDefault = [
    {
      title: "Crear",
      onPress: () => {
        action(null);
      },
      iconName: "plus-outline",
      systemOption: true,
      active: false,
    },
  ];
  const [dropOptions, setDropOptions] = useState([]);
  const analizeAllBusiness = (data: Array<Business>) => {
    const currentBusiness = api.currentBusiness;
    let replaceArray = [...dropOptionsDefault].slice();
    for (const key in data) {
      if (!Object.hasOwnProperty.call(data, key)) {
        continue;
      }
      const business = data[key];
      const active = business.id == currentBusiness.id;
      const newItem = {
        title: business.name.toUpperCase(),
        onPress: () => {
          action(business);
        },
        iconName: "briefcase-outline",
        systemOption: false,
        active: active,
      };
      replaceArray.unshift(newItem);
    }
    setDropOptions(replaceArray);
  };
  const getOptions = useCallback(() => {
    console.log(TAG, "get options");
    api
      .getMyBusiness()
      .then((data) => {
        analizeAllBusiness(data);
      })
      .catch((error) => {
        console.log(TAG, error);
        Alert.show("Fail", "Can't get user business");
      });
  }, []);
  useEffect(() => {
    getOptions();
  }, []);
  return <SelectPerfil dropOptions={dropOptions} searchEnabledOrg={false} />;
};

const PerfilScreen = (props) => {
  console.log(TAG, "perfilScreen");
  const [imagesArray, setImagesArray] = useState<Array<FeedImageType>>([]);
  const currentBusiness: Business = useSelector((store) => {
    return store.generalApp.currentBusiness;
  });

  useEffect(() => {
    // mounted
    console.log(TAG, "mounted");
    const obprod = api.getProductsByBusinessEvent();
    obprod.onUpdate((products) => {
      let newImages = Array<FeedImageType>();

      function analizeProduct(prod: Product) {
        const newItem: FeedImageType = {
          key: `${newImages.length + 1}`,
          uri: "", //prod.urlImg,
          title: prod.name,
          timeStamp: prod.timeStamp,
          update: (callback: any) => {
            const newp = Object.assign({}, newItem);
            api
              .getProductImage(currentBusiness.id, prod.id)
              .then((uri) => {
                newp.uri = uri;
                //"file:///storage/emulated/0/Download/PHOTO_20200618_175433-01.jpg";
                callback(newp);
              })
              .catch((err) => {
                console.log(TAG, "Get Product Fail", err);
              });
          },
          onPress: () => {},
        };

        newImages.push(newItem);
      }

      for (const key in products) {
        if (!Object.prototype.hasOwnProperty.call(products, key)) {
          continue;
        }
        const element = products[key];
        analizeProduct(element);
      }

      setImagesArray(newImages);
    });
    return () => {
      obprod.unSubcriber();
    };
    //api.getProductsByBusiness().then((products) => {});
  }, []);
  const name = currentBusiness.name;
  const description = currentBusiness.description;
  const atsing = `@${currentBusiness.at}`;
  return (
    <Layout style={styles.father}>
      <Layout style={styles.panelOne}>
        <MySelectPerfil />
      </Layout>
      <Layout style={styles.view0}>
        <Layout style={styles.view1}>
          <PerfilHeader
            title={name}
            subtitle={atsing}
            description={description}
            {...props}
          />
        </Layout>
        <View style={styles.view2}>
          <FeedImages arrayImages={imagesArray} />
        </View>
      </Layout>
    </Layout>
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

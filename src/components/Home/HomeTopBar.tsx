import { Button, StyleSheet, View } from "react-native";
import React from "react";
import CButton from "../CButton/CButton";
import Panel from "../Panel/Panel";
import { Text, useTheme } from "@ui-kitten/components";
import ConfigIcon from "../Icons/Home/ConfigIcon";
import MapIcon from "../Icons/Home/MapIcon";
import ChatIcon from "../Icons/Home/ChatIcon";
import api from "../../libs/api/api";
import MenuIcon from "../Icons/Home/MenuIcon";
import GroupType from "../../libs/types/GroupType";

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    padding: 5,
  },
  panelRight: {
    flex: 1,
    alignItems: "flex-end",
    flexDirection: "row-reverse",
  },
  titleText: { textAlign: "center" },
  paper: {
    flex: 12,
    flexDirection: "column",
  },
});
const TAG = "HOME TOP BAR";
type HomeTopBarProps = {
  gropSelected: GroupType;
};
const HomeTopBar: React.FC<HomeTopBarProps> = ({ gropSelected }) => {
  const theme = useTheme();
  return (
    <Panel style={styles.titleContainer} level="6">
      <Text style={styles.titleText} category="h3">
        {"EnRed"}
        <Text category="h6">
          {gropSelected.name !== "" && " - " + gropSelected.name}
        </Text>
      </Text>

      <View style={styles.panelRight}>
        {/*<View>
          <CButton
            imageInsertComponent={() => (
              <>
                {pageSelected === 0 && (
                  <MapIcon
                    color={theme["color-primary-500"]}
                    width={35}
                    height={35}
                  />
                )}
                {pageSelected === 1 && (
                  <ChatIcon
                    color={theme["color-primary-500"]}
                    width={35}
                    height={35}
                  />
                )}
              </>
            )}
            onPress={() => null}
          />
        </View> */}
        <View>
          <CButton
            imageInsertComponent={() => (
              <MenuIcon
                color={theme["color-primary-500"]}
                width={20}
                height={20}
              />
            )}
            onPress={() => api.logOut()}
          />
        </View>
      </View>
    </Panel>
  );
};
export default HomeTopBar;

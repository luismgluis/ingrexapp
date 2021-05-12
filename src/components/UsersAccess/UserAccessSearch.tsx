import { StyleSheet, View, TextInput } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import { useTheme, Text } from "@ui-kitten/components";
import SearchIcon from "../Icons/UsersAccess/SearchIcon";
import { ResidentType } from "../../libs/types/ResidentType";
import { UserAccessModule } from "./UserAccessModule";
import CButton from "../CButton/CButton";
import {
  CAlertEmpty,
  CAlertInfo,
  CAlertLoading,
} from "../CAlert/CAlertNotification";
import CloseIcon from "../Icons/others/CloseIcon";
import UsersInfoListItem from "../UsersInfo/UsersInfoListItem";
import Panel from "../Panel/Panel";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  panelInput: {
    width: "100%",
    alignItems: "center",
  },
  panelInput2: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "white",
  },
  panelInputIcon: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
  },
  input: {
    width: "60%",
    fontSize: 28,
    textAlign: "center",
    color: "blue",
  },
  panelList: { width: "100%" },
});

const TAG = "USER ACCESS SEARCH";
const module = new UserAccessModule();
type UserAccessSearchProps = {
  onResult?: (data: ResidentType) => void;
  inputType: "idCard" | "sector";
};
const UserAccessSearch: React.FC<UserAccessSearchProps> = ({
  onResult,
  inputType,
}) => {
  const theme = useTheme();

  const inputInfoProps = useMemo<any>(() => {
    const info = {
      placeholder: "",
      keyboardType: "",
    };
    if (inputType === "idCard") {
      info.placeholder = "1223334444";
      info.keyboardType = "numeric";
    } else {
      info.placeholder = "A123";
      info.keyboardType = "default";
    }
    return info;
  }, [inputType]);

  const [valueToSearch, setValueToSearch] = useState("F204");
  const inputStyles = {
    ...styles.input,
    color: theme["color-primary-700"],
    borderBottomColor: theme["color-primary-400"],
  };
  const panelInput2Styles = {
    ...styles.panelInput2,
    borderBottomColor: theme["color-primary-400"],
  };

  const selectUserInSector = useCallback(
    (users: ResidentType[]) => {
      console.log(TAG, users);
      const onPress = (resi: ResidentType) => {
        alert.close();
        onResult(resi);
      };
      const elements = users.map((user) => (
        <UsersInfoListItem onPress={onPress} resident={user} />
      ));

      const alert = CAlertEmpty(
        <Panel style={styles.panelList} totalHeight="80%">
          <Panel horizontalCenter={true} paddingVertical={20}>
            <Text category="h4">Select an user</Text>
            <Text category="h6">
              These users are registered in sector {users[0].sector}
            </Text>
          </Panel>
          {elements}
        </Panel>,
        null,
        true,
      );
    },
    [onResult],
  );

  const search = useCallback(() => {
    const loadingAlert = CAlertLoading("Searching..");
    if (inputType === "idCard") {
      module
        .getUsersByIdCard(valueToSearch.toUpperCase())
        .then((res) => {
          console.log(TAG, res);
          onResult(res);
          loadingAlert.close();
        })
        .catch((err) => {
          console.log(TAG, err);
          loadingAlert.close();
          CAlertInfo("Search fail", "No results found");
        });
    } else if (inputType === "sector") {
      const onGetUsers = (users: ResidentType[]) => {
        loadingAlert.close();
        if (users.length > 0) {
          selectUserInSector(users);
          return;
        }
        CAlertInfo(
          "Search failed",
          users == null ? "search failed, try again" : "No results found",
        );
      };
      module
        .getUsersBySector(valueToSearch.toUpperCase())
        .then((users) => {
          setTimeout(() => {
            onGetUsers(users);
          }, 700);
        })
        .catch((err) => {
          console.log(TAG, err);
          setTimeout(() => {
            onGetUsers(err ? err : null);
          }, 700);
        });
    }
  }, [valueToSearch, onResult, inputType, selectUserInSector]);

  return (
    <View style={styles.container}>
      <View style={styles.panelInput}>
        <View style={panelInput2Styles}>
          <View style={styles.panelInputIcon}>
            {valueToSearch !== "" && (
              <CButton
                onPress={() => setValueToSearch("")}
                imageInsertComponent={() => (
                  <CloseIcon
                    width={25}
                    height={25}
                    color={theme["color-primary-400"]}
                  />
                )}
              />
            )}
          </View>
          <TextInput
            style={inputStyles}
            value={valueToSearch}
            placeholderTextColor={theme["color-basic-600"]}
            onChangeText={(t) => setValueToSearch(t)}
            onSubmitEditing={() => search()}
            {...inputInfoProps}
          />
          <View style={styles.panelInputIcon}>
            <CButton
              onPress={() => search()}
              imageInsertComponent={() => (
                <SearchIcon
                  width={30}
                  height={30}
                  color={theme["color-primary-400"]}
                  colorTwo={theme["color-primary-600"]}
                />
              )}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
export default UserAccessSearch;

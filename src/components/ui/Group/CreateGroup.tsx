import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import React, { useCallback, useState } from "react";
import Panel from "../Panel/Panel";
import { Text, Toggle } from "@ui-kitten/components";
import CInput from "../CInput/CInput";
import CButton from "../CButton/CButton";
import api from "../../../libs/api/api";
import LoadingPanel from "../LoadingPanel/LoadingPanel";
import GroupType from "../../../libs/types/GroupType";

const styles = StyleSheet.create({ container: {} });

const TAG = "CREATE GROUP";

type CreateGroupProps = {
  style?: StyleProp<ViewStyle>;
  callBack: (data: GroupType | null) => void;
};
const CreateGroup: React.FC<CreateGroupProps> = ({ style, callBack }) => {
  const [form, setForm] = useState({
    name: "",
    at: "",
    public: true,
  });
  const [loading, setLoading] = useState(false);
  const onCreate = useCallback(() => {
    setLoading(true);
    const newGroup = new GroupType("", null);
    api.group
      .createGroup(newGroup)
      .then((res) => {
        setLoading(false);
        callBack(res);
      })
      .catch((err) => {
        console.error(TAG, "err", err);
      });
  }, [form, callBack]);
  return (
    <Panel verticalCenter={true} horizontalCenter={true} paddingHorizontal={50}>
      <Panel paddingVertical={15}>
        <Text category="h3">Create new group</Text>
        <Text category="h6">Fill out the group information</Text>
      </Panel>
      <CInput
        value={form.name}
        onChangeText={(t) =>
          setForm({
            ...form,
            name: t,
          })
        }
        placeholder="The Best Business"
        label="Name :"
        paddingVertical={10}
        caption=""
      />
      <CInput
        value={form.at}
        onChangeText={(t) =>
          setForm({
            ...form,
            at: t,
          })
        }
        placeholder="mybusiness123"
        label="At :"
        paddingVertical={10}
        caption=" Only letters and numbers"
      />
      <Panel paddingVertical={20}>
        <Toggle
          checked={form.public}
          onChange={(checked) =>
            setForm({
              ...form,
              public: checked,
            })
          }>
          {`Group will be public? - ${form.public ? "Yes" : "No"}`}
        </Toggle>
      </Panel>
      {!loading && (
        <>
          <CButton text="Create" onPress={() => onCreate()} />
          <CButton
            text="Back"
            appeareance="ghost"
            paddingVertical={10}
            onPress={() => callBack(null)}
          />
        </>
      )}
      {loading && <LoadingPanel text="Creating group..." />}
    </Panel>
  );
};
export default CreateGroup;

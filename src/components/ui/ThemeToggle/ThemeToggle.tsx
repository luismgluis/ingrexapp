import { StyleSheet, View, Text, StyleProp, ViewStyle } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import { Toggle } from "@ui-kitten/components";
import { useDispatch } from "react-redux";
import * as generalActions from "./../../../reducers/actions/actionsGeneralValues";
import TransitionBlocksPortal from "../TransitionBlocksPortal/TransitionBlocksPortal";
import utils from "../../../libs/utils/utils";

const styles = StyleSheet.create({ container: {} });

const TAG = "THEME TOGGLE";
type ThemeToggleProps = {
  style?: StyleProp<ViewStyle>;
};
const ThemeToggle: React.FC<ThemeToggleProps> = ({ style }) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [keyTransition, setKeyTransition] = useState(
    utils.generateKey("TransitionBlocksPortal"),
  );
  const [tPanelVisible, setTPanelVisible] = useState(false);
  const [transitionVisible, setTransitionVisible] = useState(false);
  const anim = useCallback(async () => {
    setTPanelVisible(true);
    setTransitionVisible(true);
    await utils.timeOut(750);
    dispatch(generalActions.setTheme(checked ? 0 : 1));
    await utils.timeOut(100);
    setTransitionVisible(false);
    await utils.timeOut(650);
    setTPanelVisible(false);
  }, [setTPanelVisible, setTransitionVisible, dispatch, checked]);
  const onCheckedChange = (check: boolean) => {
    setChecked(check);
    anim().then(() => {
      /* */
    });
  };
  return (
    <>
      {tPanelVisible && (
        <TransitionBlocksPortal
          visible={transitionVisible}
          key={keyTransition}
          color="red"
        />
      )}
      <Toggle checked={checked} onChange={onCheckedChange}>
        {checked ? "Dark" : "Light"}
      </Toggle>
    </>
  );
};
export default ThemeToggle;

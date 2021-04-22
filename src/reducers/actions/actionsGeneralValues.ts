import { View } from "react-native";

export const setTotalHeight = (totalHeight: number) => (dispatch: any) => {
  dispatch({
    type: "setTotalHeight",
    payload: totalHeight,
  });
};

export const setTheme = (themeNum: 0 | 1) => (dispatch: any) => {
  dispatch({
    type: "setTheme",
    payload: themeNum,
  });
};

export const setAlertsViewRef = (viewRef: React.MutableRefObject<View>) => (
  dispatch: any,
) => {
  dispatch({
    type: "setAlertsViewRef",
    payload: viewRef,
  });
};

import { Layout, StyledComponentProps, useTheme } from "@ui-kitten/components";
import { Overwrite } from "@ui-kitten/components/devsupport";
import React from "react";
import { ScrollView, StyleSheet, ViewProps } from "react-native";
import { useSelector } from "react-redux";
import { useKeyboard } from "../../libs/usekeyBoard/useKeyBoard";
import utils from "../../libs/utils/utils";
const TAG = "PANEL";

declare type LayoutStyledProps = Overwrite<
  StyledComponentProps,
  {
    appearance?: "default" | string;
  }
>;

export interface LayoutProps extends ViewProps, LayoutStyledProps {
  children?: React.ReactNode;
  level?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
  totalHeight?: number | string;
  verticalCenter?: boolean;
  horizontalCenter?: boolean;
  withScroll?: boolean;
  paddingVertical?: number;
  paddingHorizontal?: number;
}

export declare type LayoutElement = React.ReactElement<LayoutProps>;

const Panel: React.FC<LayoutProps> = ({
  children,
  level = "5",
  style,
  paddingVertical = 0,
  paddingHorizontal = 0,
  totalHeight = -1,
  verticalCenter = false,
  horizontalCenter = false,

  withScroll = false,
}) => {
  const [keyboardHeight] = useKeyboard();
  const h: number = useSelector((store: any) => {
    const tHeight = store.generalValues.totalHeight;
    return tHeight;
  });
  const themeNumber = useSelector<number>((state: any) => {
    return Number(state.generalValues.theme);
  });
  const theme = useTheme();
  const levelNum = (() => {
    if (themeNumber === 0) {
      return level;
    }
    if (Number(level) < 7) {
      return Number(level) + 3;
    }
    return level;
  })();
  const customStyles = {
    backgroundColor: theme[`background-${levelNum}00`],
    //totalhe
    height: undefined,
    //vertial
    justifyContent: undefined,
    alignItems: undefined,
    flex: undefined,
    overflow: "hidden",
  };

  if (totalHeight !== -1) {
    if (!isNaN(Number(totalHeight))) {
      customStyles.height = h - Number(totalHeight);
      if (withScroll) {
        customStyles.height += keyboardHeight;
      }
    } else if (`${totalHeight}`.includes("%")) {
      const percent = Number(`${totalHeight}`.replace("%", "")) / 100;
      customStyles.height = h * percent;
      if (withScroll) {
        customStyles.height += keyboardHeight;
      }
    } else if (`${totalHeight}`.includes("px")) {
      const total = Number(`${totalHeight}`.replace("px", ""));
      customStyles.height = total;
    }
  }

  if (verticalCenter) customStyles.justifyContent = "center";
  if (horizontalCenter) customStyles.alignItems = "center";

  const nstyles = {
    ...customStyles,
    paddingVertical: paddingVertical,
    paddingHorizontal: paddingHorizontal,
    ...utils.objects.cloneObject(style),
  }; //StyleSheet.flatten([customStyles, style && style]);
  return (
    <>
      {withScroll && (
        <ScrollView>
          <Layout style={nstyles}>{children}</Layout>
        </ScrollView>
      )}
      {!withScroll && <Layout style={nstyles}>{children}</Layout>}
    </>
  );
};
export default Panel;

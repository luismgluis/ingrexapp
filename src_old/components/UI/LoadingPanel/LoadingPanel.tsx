import React from "react";
import { Layout, Spinner, Text } from "@ui-kitten/components";
interface Lprops {
  text: string;
}
const LoadingPanel = ({ text }: Lprops) => {
  return (
    <Layout style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Layout
        style={{ flex: 1, maxHeight: 100, flexDirection: "column-reverse" }}>
        <Layout style={{ alignItems: "center", margin: 20 }}>
          <Spinner size="giant" status="info" />
        </Layout>
        <Text category="h5">{text}</Text>
      </Layout>
    </Layout>
  );
};
export default LoadingPanel;

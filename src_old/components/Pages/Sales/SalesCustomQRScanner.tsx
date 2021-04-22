import React from "react";
import QRscanner from "../../UI/QRscanner/QRscanner";
const TAG = "";
const SalesCustomQRScanner = () => {
  function onRead(data) {
    console.log(TAG, data);
  }
  return <QRscanner callBack={onRead} />;
};
export default SalesCustomQRScanner;

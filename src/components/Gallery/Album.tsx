import CameraRoll from "@react-native-community/cameraroll";
import { Icon, TopNavigationAction } from "@ui-kitten/components";
import React, { useEffect, useState, useCallback } from "react";
import utils from "../../libs/utils/utils";
import CTopBack from "../CTopBack/CTopBack";
import FeedImages, { FeedImageType } from "../FeedImages/FeedImages";
import Panel from "../Panel/Panel";
const TAG = "ALBUM";
type AlbumProps = {
  navigation: any;
  route: any;
  callBack: (data: FeedImageType) => void;
};
const Album: React.FC<AlbumProps> = ({ navigation, route, callBack }) => {
  const [dataImages, setDataImages] = useState<Array<FeedImageType>>([]);
  const [mediaCounter, setMediaCounter] = useState(0);
  const [refreshing, setRefreshing] = useState(true);

  const refresh = useCallback(() => {
    utils.media
      .getMediaFiles(mediaCounter + 30, callBack)
      .then((arrImages) => {
        setRefreshing(false);
        setDataImages(arrImages);
        if (arrImages.length > 0) {
          setMediaCounter(mediaCounter + 10);
        }
      })
      .catch((err) => {
        setDataImages([]);
        setRefreshing(false);
      });
  }, [callBack, mediaCounter]);

  useEffect(() => {
    if (mediaCounter === 0) {
      refresh();
    }
  }, [callBack, refresh, mediaCounter]);

  const cameraButton = (
    <TopNavigationAction
      onPress={() => console.log(TAG, "opencam")}
      icon={(props) => <Icon {...props} name="camera-outline" />}
    />
  );
  return (
    <Panel level="5" totalHeight={0}>
      <CTopBack
        title="Gallery"
        onBackPress={() => navigation.goBack()}
        rightButton={cameraButton}
      />
      <FeedImages
        arrayImages={dataImages}
        isRefresh={refreshing}
        onRefresh={() => refresh()}
      />
    </Panel>
  );
};

export default Album;

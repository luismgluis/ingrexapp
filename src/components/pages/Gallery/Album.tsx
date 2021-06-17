import { Icon, TopNavigationAction } from "@ui-kitten/components";
import React, { useEffect, useState, useCallback } from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import utils from "../../../libs/utils/utils";
import CTopBack from "../../ui/CTopBack/CTopBack";
import Panel from "../../ui/Panel/Panel";
import { launchCamera } from "react-native-image-picker";
import { useNavigation } from "@react-navigation/core";
import FeedImages, { FeedImageType } from "../../ui/FeedImages/FeedImages";

const TAG = "ALBUM";
type AlbumProps = {
  callBack: (data: FeedImageType) => void;
};
const Album: React.FC<AlbumProps> = ({ callBack }) => {
  const navigation = useNavigation();

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
      .catch(() => {
        setDataImages([]);
        setRefreshing(false);
      });
  }, [callBack, mediaCounter]);

  useEffect(() => {
    if (mediaCounter === 0) {
      refresh();
    }
  }, [callBack, refresh, mediaCounter]);

  const startCamera = useCallback(() => {
    launchCamera(
      {
        mediaType: "photo",
        maxWidth: 520,
        saveToPhotos: false,
      },
      (data) => {
        if (data.didCancel) {
          return;
        }
        callBack({
          key: utils.generateKey("cameraimage"),
          uri: data.uri!,
          type: data.type!,
          timeStamp: utils.dates.dateNowUnix(),
          title: "Camera Picture",
          isVideo: false,
          imageFromCamera: true,
          update: (d: FeedImageType) => null,
          onPress: (d: FeedImageType) => null,
        });
      },
    );
  }, [callBack]);

  const cameraButton = (
    <TouchableWithoutFeedback onPress={() => startCamera()}>
      <TopNavigationAction
        icon={(props) => <Icon {...props} name="camera-outline" />}
      />
    </TouchableWithoutFeedback>
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

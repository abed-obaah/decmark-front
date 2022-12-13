import React, { useState, useEffect } from "react";
import { AppSafeAreaView } from "../../components/AppViews";
import { Text, View } from "react-native";
import PageHeader from "@src/components/PageHeader";
import { MediumText } from "@src/components/AppText";
import AppButton from "@src/components/AppButton";
import { Camera, CameraType } from "expo-camera";
import ScannerSvg from "../../assets/svg/ScannerSVG.js";
import { useIsFocused } from "@react-navigation/native";

export default UploadScreen = ({ navigation }) => {
  const [cameraRef, setCameraRef] = useState();
  const [startCamera, setStartCamera] = useState(false);
  const [type, setType] = useState(CameraType.front);
  const takeSnapshot = () => {
    setStartCamera(true);
  };

  const onCameraReady = () => {
    console.log("camera ready");
  };
  const isFocused = useIsFocused();
  const [hasCameraPermission, setHasCameraPermission] = useState(false);

  const getPermissionStatus = async () => {
    const cameraStatus = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(cameraStatus.status === "granted");
  };

  useEffect(() => {
    getPermissionStatus();
  }, []);

  if (!hasCameraPermission) {
    return (
      <View>
        <Text>Hello </Text>
      </View>
    );
  }

  return (
    <AppSafeAreaView>
      <PageHeader title={"Take Snapshot"} />

      {!startCamera ? (
        <>
          <MediumText style={{ textAlign: "center", marginTop: 20 }}>
            Take a selfie to proceed
          </MediumText>
          <View
            style={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ScannerSvg />
          </View>
          <View style={{ flex: 0.3, paddingHorizontal: 15 }}>
            <AppButton label="Next" onPress={takeSnapshot} />
          </View>
        </>
      ) : (
        isFocused && (
          <Camera
            ratio="16:9"
            type={type}
            ref={(ref) => setCameraRef(ref)}
            onCameraReady={onCameraReady}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 0,
            }}
          />
        )
      )}
    </AppSafeAreaView>
  );
};

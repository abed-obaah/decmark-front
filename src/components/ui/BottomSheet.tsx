import React, { FC, useRef, useMemo, useCallback, forwardRef } from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";

interface BottomSheetProps {
  sheetRef: any;
  snapPoints?: any[];
}

const AppBottomSheet: FC<BottomSheetProps> = ({
  sheetRef,
  snapPoints = ["50%", "100%"],
}) => {
  const { height, width } = useWindowDimensions();

  return (
    <View style={[styles.container, { height, width }]}>
      <BottomSheet
        ref={sheetRef}
        index={1}
        snapPoints={useMemo(() => [...snapPoints], [])}
        enablePanDownToClose
        backgroundStyle={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -13,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
          elevation: 6,
          borderRadius: 20,
        }}
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -13,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
          elevation: 6,
        }}
        // onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    position: "absolute",
    // backgroundColor: 'rgba(0,0,0,.25)'
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default AppBottomSheet;

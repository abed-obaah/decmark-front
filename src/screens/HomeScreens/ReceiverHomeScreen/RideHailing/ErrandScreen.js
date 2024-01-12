import React, { useState } from 'react';
import { View, StyleSheet } from "react-native";
import { AppSafeAreaView, AppScrollView } from "@src/components/AppViews";
import { LargeText, MediumText } from "@src/components/AppText";
import useTheme from "@src/hooks/useAppTheme";
import GroupTab from "@src/components/GroupTab";
import Offers from "./components/Offers";
import { useSelector } from "react-redux";

export default function ErrandScreen() {
  const { theme } = useTheme();
  const { userInfo } = useSelector((state) => state.auth);

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedHours, setSelectedHours] = useState(0);
  const [customHours, setCustomHours] = useState('');

  return (
    <AppSafeAreaView style={{ position: "relative" }}>
       <AppScrollView>
           <Offers />
       </AppScrollView>
        
     
    </AppSafeAreaView>
  );
}

const styles = StyleSheet.create({
  floatBtn: {
    position: "absolute",
    bottom: 20,
    right: 20,
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 50,
  },
});

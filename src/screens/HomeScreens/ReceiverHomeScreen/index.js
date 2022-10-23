import React from "react";
import { AppSafeAreaView, AppRareScrollView } from "@src/components/AppViews";
import CategorySection from "./components/CategorySection";
import PopularServices from "./components/PopularServices";
import RatedProviders from "./components/RatedProviders";
import SwitchModeInfo from "../components/SwitchModeInfo";
import useSwitchUserMode from "@src/hooks/useSwitchUserMode";

export default ReceiverHomeScreen = () => {
  const { isModeSwitch } = useSwitchUserMode();

  return (
    <>
      {isModeSwitch ? (
        <SwitchModeInfo />
      ) : (
        <AppSafeAreaView>
          <AppRareScrollView>
            <CategorySection />
            <PopularServices />
            <RatedProviders />
          </AppRareScrollView>
        </AppSafeAreaView>
      )}
    </>
  );
};

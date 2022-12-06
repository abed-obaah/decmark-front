import React from "react";
import { LargeText } from "@src/components/AppText";
import { AppSafeAreaView, AppScrollView } from "@src/components/AppViews";

const EditProfileScreen = () => {
  return (
    <AppSafeAreaView>
      <AppScrollView>
        <LargeText>EditProfileScreen</LargeText>
      </AppScrollView>
    </AppSafeAreaView>
  );
};

export default EditProfileScreen;

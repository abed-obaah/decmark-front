import React from "react";
import GroupTab from "../../components/GroupTab";
import { AppSafeAreaView, AppScrollView } from "../../components/AppViews";
import EmailAddress from "./components/EmailAddress";
import PhoneNumber from "./components/PhoneNumber";
import { View } from "react-native";
import PageHeader from "@src/components/PageHeader";
import { useTranslation } from 'react-i18next';
import { changeLanguage } from "i18next";



export default AccountVerification = ({ navigation }) => {
  const [activeTab, setActiveTab] = React.useState(1);
  const { t} = useTranslation();


  return (
    <AppSafeAreaView>
      <PageHeader title={"Account Verification"} />
      <View style={{ marginTop: 15, marginBottom: 5 }}>
        <GroupTab
          tabs={[`${t('EmailAddress')}`, `${t('phoneNumber')}`]}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </View>
      <AppScrollView>
        <View>{activeTab ? <PhoneNumber /> : <EmailAddress />}</View>
      </AppScrollView>
    </AppSafeAreaView>
  );
};

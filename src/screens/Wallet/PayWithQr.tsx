import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  Image,
 
} from 'react-native';
import PageHeader from "@src/components/PageHeader";
import { AppSafeAreaView, AppScrollView } from "@src/components/AppViews";
import { MediumText,LargeText } from "@src/components/AppText";
import QRCode from 'react-native-qrcode-svg';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from "i18next";

const PayWithQr = () => {
  // const data = 'Hello kiddo welcome!';
  const data = '';
  const { t} = useTranslation();
  return (
    <AppSafeAreaView>
        <AppScrollView>
        
        <View style={{ paddingHorizontal: 40, paddingVertical: 10 }}>
          <LargeText>{t('generateQr')}</LargeText>
        </View>
        
        <View style={styles.container}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                     <QRCode value={data} />
                </View>
        </View>

        </AppScrollView>
    </AppSafeAreaView>
   
  );
};

export default PayWithQr;

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      marginTop:50
    },
    image: {
      width: 40,
      height: 40,
        //   borderRadius: SIZES.radius,
        //   borderColor: "grey",
      borderWidth: 1,
      marginRight: 20,
    },
    textContainer: {
      flex: 1,
    },
  });
// export default PayWithCardScreen;

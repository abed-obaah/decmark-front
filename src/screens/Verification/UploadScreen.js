//verify.tsx
import React from 'react';
import { View, FlatList, TouchableOpacity, Keyboard,Button,Alert, StyleSheet } from "react-native";
import { QoreIdButton } from '@qore-id/react-native-qoreid-sdk';
import { useNavigation } from "@react-navigation/native";


export default UploadScreen = ({ navigation }) => {
 
    const customButton  = ({ onPress }) =>  <Button onPress={onPress} title="QoreId Button" />

    const onError = (data) => {
        console.error(data);
        Alert.alert('Error', data);
    };

    const onSumitted = (data) => {
        console.debug(data);
        Alert.alert('Sumitted', data);
    };

    const onClosed = (data) => {
        console.debug(data);
        Alert.alert('Closed', data);
    };

    return (
        <View>
            {/* Other components */}
            <Button  title="QoreId Buttons" styles={styles.btn} />
            <QoreIdButton
                title="Verify"
                flowId=""
                clientId="7Z8U62MN134IMG9FLQP5"
                productCode="ocr" 
                customerReference="123456"
                applicantData={{
                    firstName:"doris",
                    middleName:"omenogor",
                    lastName:"obaah",
                    gender:"female",
                    phoneNumber:"+2348102652793",
                    email:"chineduobaah@gmail.com",
                }}
                identityData={{ idType: "", idNumber:"" }}
                addressData={{
                    address: "",
                    city:"",
                    lga:"",
                }}
                ocrAcceptedDocuments="DRIVERS_LICENSE_NGA,VOTERS_CARD_NGA,NIN_SLIP_NGA,PASSPORT_NGA"
                onQoreIDSdkSubmitted={onSumitted}
                onQoreIDSdkError={onError}
                onQoreIDSdkClosed={onClosed}
                render={customButton}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    btn:{
        marginBottom:20
    }
})
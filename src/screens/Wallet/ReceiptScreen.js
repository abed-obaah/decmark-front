import React,{useState, useRef, useEffect} from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import decmark from '../../assets/images/adaptive-icon.png'
import { SIZES } from "@src/constants/theme";
import { useTranslation } from 'react-i18next';
import { changeLanguage } from "i18next";


const users = [
  'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
];

const ReceiptScreen = ({route}) => {
    const { responseData } = route.params;
    const { t} = useTranslation();
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerAction}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}>
                <FeatherIcon color="#0e0e0e" name="x" size={24} />
              </TouchableOpacity>
            </View>

            <Text style={styles.headerTitle}>{t('receipt')}</Text>

            <View style={[styles.headerAction, { alignItems: 'flex-end' }]} />
          </View>

          <ScrollView contentContainerStyle={styles.receipt} showsVerticalScrollIndicator={false}>
            <View style={styles.receiptLogo}>
              {/* <FeatherIcon color="#fff" name="codepen" size={32} /> */}

              <Image
                source={require("../../../assets/icon.png")}
                color="#fff" name="codepen" size={12}
                style={{
                    width: "100%",
                    height: "100%",
                    borderTopLeftRadius: SIZES.radius,
                    borderTopRightRadius: SIZES.radius,
                  }}
             />

            </View>

            <Text style={styles.receiptTitle}>Decmark.</Text>

            <Text style={styles.receiptSubtitle}>{t('Invoice')}{responseData.transaction.id}</Text>

            <View style={styles.receiptPrice}>
              <Text style={styles.receiptPriceText}>{responseData.transaction.amount.amount}</Text>

              <Text style={[styles.receiptPriceText, { fontSize: 20, lineHeight: 32 }]}>.00</Text>
            </View>

            <Text style={styles.receiptDescription}>{responseData.transaction.remarks}</Text>

            <View style={styles.avatarWrapper}>
              {users.map(user => (
                <Image
                  key={user}
                  alt=""
                  source={{
                    uri: user,
                  }}
                  style={[styles.avatar, { marginLeft: -(40 / 4) }]}
                />
              ))}
            </View>

            <View style={styles.divider}>
              <View style={styles.dividerInset} />
            </View>

            <View style={styles.details}>
              <Text style={styles.detailsTitle}>{t('Transactiondetails')}</Text>

              <View style={styles.detailsRow}>
                <Text style={styles.detailsField}>{t('date')}</Text>

                <Text style={styles.detailsValue}>{responseData.transaction.created_at}</Text>
              </View>

              <View style={styles.detailsRow}>
                <Text style={styles.detailsField}>{t('category')}</Text>

                <Text style={styles.detailsValue}>{responseData.transaction.type}</Text>
              </View>

              <View style={styles.detailsRow}>
                <Text style={styles.detailsField}>{t('category')}Payment method</Text>

                <Text style={styles.detailsValue}>{responseData.transaction.action}</Text>
              </View>

              <View style={styles.detailsRow}>
                <Text style={styles.detailsField}>{t('ReceiptNumber')}</Text>

                <Text style={styles.detailsValue}>{responseData.transaction.id}</Text>
              </View>

              <View style={styles.detailsRow}>
                <Text style={styles.detailsField}>{t('BillingName')}</Text>

                <Text style={styles.detailsValue}>{responseData.transaction.title}</Text>
              </View>

              <View style={styles.detailsRow}>
                <Text style={styles.detailsField}>{t('symbol')}</Text>

                <Text style={styles.detailsValue}>{responseData.transaction.balance.symbol}</Text>
              </View>

              <View style={styles.detailsRow}>
                <Text style={styles.detailsField}>{t('currency')}</Text>

                <Text style={styles.detailsValue}>{responseData.transaction.balance.currency}</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>

      <View style={styles.overlay}>
        <TouchableOpacity
          onPress={() => {
            // handle onPress
          }}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>{t('share')}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // handle onPress
          }}>
          <View style={styles.btnSecondary}>
            <Text style={styles.btnSecondaryText}>{t('save')}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    paddingHorizontal: 16,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'stretch',
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 48,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  receipt: {
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 140,
  },
  receiptLogo: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    marginBottom: 12,
    backgroundColor: '#0e0e0e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  receiptTitle: {
    fontSize: 21,
    fontWeight: '600',
    color: '#151515',
    marginBottom: 2,
  },
  receiptSubtitle: {
    fontSize: 13,
    lineHeight: 20,
    color: '#818181',
    marginBottom: 12,
  },
  receiptPrice: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 6,
  },
  receiptPriceText: {
    fontSize: 30,
    lineHeight: 38,
    fontWeight: 'bold',
    letterSpacing: 0.35,
    // color: '#8338ec',
    color: '#DEB253',
  },
  receiptDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: '#818181',
    textAlign: 'center',
    marginBottom: 12,
  },
  details: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  detailsTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 16,
  },
  detailsRow: {
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  detailsField: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '500',
    color: '#8c8c8c',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  detailsValue: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
    color: '#444',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    textAlign: 'right',
  },
  detailsActions: {
    marginTop: 24,
  },
  divider: {
    overflow: 'hidden',
    width: '100%',
    marginVertical: 24,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#DEB253',
    borderColor: '#DEB253',
    marginBottom: 12,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
  btnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderColor: '#DEB253',
  },
  btnSecondaryText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#DEB253',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop:30,
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    borderWidth: 3,
    borderColor: '#fff',
  },
  avatarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  dividerInset: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#e5e5e5',
    borderStyle: 'dashed',
    marginTop: -2,
  },
});

export default ReceiptScreen;
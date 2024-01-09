import React, { useState, useEffect } from 'react';
import { AppSafeAreaView } from "@src/components/AppViews";
import { LargeText, SmallText } from "@src/components/AppText";
import useAppTheme from "@src/hooks/useAppTheme";
import PageHeader from "@src/components/PageHeader";
// import { getNotificationInbox } from 'native-notify';
import { FlatList, StyleSheet, Text, View } from "react-native";

const NotificationScreen = () => {
  const { theme } = useAppTheme();
  const [data, setData] = useState([]);

  useEffect(async () => {
    let notifications = await getNotificationInbox(10360, 'bt5HPDNHpKOD4SdARVdthY');
    console.log("notifications: ", notifications);
    setData(notifications);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.notificationContainer}>
      <View style={styles.notificationItem}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
        
      </View>
    </View>
  );

  return (
    <AppSafeAreaView>
      <PageHeader title={"Notification"} />
      {data.length === 0 ? (
        <View style={styles.emptyContainer}>
          <LargeText style={styles.emptyText}>No Notification</LargeText>
          <SmallText style={styles.emptyText}>
            We send you notifications to update you on your schedule and service delivery.
          </SmallText>
        </View>
      ) : (
        <FlatList
        style={{ marginTop: 30 }}
        data={data}
        keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
        renderItem={renderItem}
      />

      )}
    </AppSafeAreaView>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
    paddingHorizontal: 25,
    marginTop: 10,
  },
  notificationContainer: {
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  notificationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  message: {
    marginTop: 5,
  },
});

export default NotificationScreen;

import { StatusBar } from 'expo-status-bar';
import { Text, View, SafeAreaView } from 'react-native';
import Onboarding from './screens/Onboarding';

export default function App() {
  return (
    <SafeAreaView>
      <StatusBar style="light" />
      <Onboarding />
    </SafeAreaView>
  );
}
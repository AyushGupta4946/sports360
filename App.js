import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import TabNavigation from './Apps/Navigations/TabNavigation';
import registerNNPushToken from 'native-notify';

export default function App() {
  registerNNPushToken(19832, '9ELUhQ8IMKpRpgMBsQiv1L');
  return (
    <View className="flex-1">

      <NavigationContainer>
        <TabNavigation />
      </NavigationContainer>
    </View>
  );
}



import { useFonts } from 'expo-font';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { Rajdhani_500Medium, Rajdhani_700Bold } from '@expo-google-fonts/rajdhani';

import Routes from './src/routes/routes';
import { AuthProvider } from './src/hooks/auth';

export default function App() {

  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Rajdhani_700Bold,
    Rajdhani_500Medium
  });

  if (!fontsLoaded) return;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </SafeAreaView>
  )
};


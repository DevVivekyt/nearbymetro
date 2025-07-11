import Header from "@/components/Header";
import { GlobalProvider } from '@/constants/context/GlobalContext';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';




export default function RootLayout() {


  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <GlobalProvider>
      <Header />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="(metro-info)" options={{ headerShown: false }} /> */}
        <Stack.Screen name="(metro-info)/index" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="dark" />
      <Toast />
    </GlobalProvider>

  );
}

import Header from "@/components/Header";
import { GlobalProvider } from '@/constants/context/GlobalContext';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';




export default function RootLayout() {

  const queryClient = new QueryClient()

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>
        <Header />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          {/* <Stack.Screen name="(metro-info)" options={{ headerShown: false }} /> */}
          <Stack.Screen name="(metro-info)/index" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>


        <StatusBar style="dark" />
      </GlobalProvider>

    </QueryClientProvider>
  );
}

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import "../global.css"

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, headerTitle: "" }} />
      <Stack.Screen name="pages/register" options={{ headerShown: true }} />
      <Stack.Screen name="pages/login" options={{ headerShown: true }} />
      <Stack.Screen name="+not-found" options={{ headerShown: true }} />
      <Stack.Screen name="pages/hostelPage" options={{ headerShown: true, headerTitle: "Hostels" }} />
      <Stack.Screen name="pages/studentProfilePage/[id]" options={{ headerShown: true , headerTitle: "Profile"}} />
      <Stack.Screen name="pages/hostelProfile/[id]" options={{ headerShown: true, headerTitle: "Hostel" }} />
      <Stack.Screen name="pages/addNewHostel" options={{ headerShown: true, headerTitle: "" }} />

    </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

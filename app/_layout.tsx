import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "@/types/route/RootStackParamList";
import { IconButton } from "react-native-paper";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

interface SectorParams {
  id: string;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="sector/[id]"
          options={({ route }) => {
            const { id } = route.params as SectorParams;
            return {
              title: `Setor ${id}`,
              headerRight: () => (
                <IconButton
                  icon="plus"
                  onPress={() => {
                    console.log("clicou");
                  }}
                />
              ),
            };
          }}
        />
        <Stack.Screen
          name="animal/[id]"
          options={({ route }) => {
            const { id } = route.params as SectorParams;
            return {
              title: `Buddy`,
              headerRight: () => (
                <IconButton
                  icon="pencil"
                  onPress={() => {
                    console.log("clicou");
                  }}
                />
              ),
            };
          }}
        />
        <Stack.Screen name="baia/[id]" options={{ title: "Baia" }} />
      </Stack>
    </ThemeProvider>
  );
}

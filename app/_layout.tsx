import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import { Icon, IconButton, Text } from "react-native-paper";
import CommonMenu from "@/components/Menu";
import { getBaiaById } from "@/repository/baia.repository";

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

interface SectorParams {
  id: string;
}

interface BaiaParams {
  id: string;
  numeroBaia: string;
  idSector: string;
}

interface AnimalParams {
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
                <CommonMenu
                  option1={
                    <Text
                      onPress={() => {
                        router.push({
                          pathname: "/baia/create",
                          params: { sector: id },
                        });
                      }}
                    >
                      <Icon source="plus" size={20} />
                      Cadastrar Baia
                    </Text>
                  }
                  option2={
                    <Text
                      onPress={() => {
                        router.push(`/sector/edit/${id}`);
                      }}
                    >
                      <Icon source="pencil" size={18} />
                      Editar Setor
                    </Text>
                  }
                />
              ),
            };
          }}
        />
        <Stack.Screen name="sector/create" options={{ title: "Criar Setor" }} />
        <Stack.Screen
          name="sector/edit/[id]"
          options={({ route }) => {
            const { id } = route.params as SectorParams;
            return { title: `Editar Setor ${id}` };
          }}
        />
        <Stack.Screen name="baia/create" options={{ title: "Criar Baia" }} />
        <Stack.Screen
          name="animal/[id]"
          options={({ route }) => {
            const { id } = route.params as AnimalParams;
            return {
              title: "",
              headerRight: () => (
                <IconButton
                  icon="pencil"
                  onPress={() => {
                    router.push(`/animal/edit/${id}`);
                  }}
                />
              ),
            };
          }}
        />
        <Stack.Screen
          name="baia/[id]"
          options={({ route }) => {
            const { id, numeroBaia, idSector } = route.params as BaiaParams;

            return {
              title: `Baia ${numeroBaia ?? id}`,
              headerRight: () => (
                <CommonMenu
                  option1={
                    <Text
                      onPress={() => {
                        router.push({
                          pathname: "/animal/create",
                          params: { idBaia: id },
                        });
                      }}
                    >
                      <Icon source="plus" size={20} />
                      Adicionar Animais
                    </Text>
                  }
                  option2={
                    <Text
                      onPress={() => {
                        router.push(`/baia/edit/${id}`);
                      }}
                    >
                      <Icon source="pencil" size={18} />
                      Editar Baia
                    </Text>
                  }
                />
              ),
            };
          }}
        />
        <Stack.Screen
          name="animal/create"
          options={{ title: "Cadastro de animal" }}
        />
        <Stack.Screen
          name="baia/edit/[id]"
          options={({ route }) => {
            const { id } = route.params as BaiaParams;
            return { title: `Editar Baia ${id}` };
          }}
        />
        <Stack.Screen
          name="animal/edit/[id]"
          options={({ route }) => {
            const { id } = route.params as BaiaParams;
            return { title: `Editar` };
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}

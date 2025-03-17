import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
  useFocusEffect,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import { Icon, IconButton, Text } from "react-native-paper";
import CommonMenu from "@/components/Menu";
import { getBaiaById } from "@/repository/baia.repository";
import { useCallback } from "react";
import { View } from "react-native";
import { getSectorByCode, getSectorById } from "@/repository/setor.repository";
import { AnimalParams, BaiaParams, SectorParams } from "@/types/params";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <NavigationContainer>
      <RootLayoutNav />
    </NavigationContainer>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useFocusEffect(
    useCallback(() => {
      if (error) throw error;
    }, [error]),
  );

  useFocusEffect(
    useCallback(() => {
      if (loaded) SplashScreen.hideAsync();
    }, [loaded]),
  );

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="sector/[id]"
          options={({ route }) => {
            const { id, name } = route.params as SectorParams;
            return {
              title: `Setor ${name}`,
              headerRight: () => (
                <CommonMenu
                  option1={
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Icon source="plus" size={20} />
                      <Text
                        style={{ fontSize: 18, marginLeft: 8 }}
                        onPress={() => {
                          router.push({
                            pathname: "/baia/create",
                            params: { sector: name, id },
                          });
                        }}
                      >
                        Cadastrar Baia
                      </Text>
                    </View>
                  }
                  option2={
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Icon source="pencil" size={18} />
                      <Text
                        onPress={() => {
                          router.push({
                            pathname: "/sector/edit/[id]",
                            params: { id, name },
                          });
                        }}
                        style={{ fontSize: 18, marginLeft: 8 }}
                      >
                        Editar Setor
                      </Text>
                    </View>
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
            const { id, name } = route.params as SectorParams;
            return { title: `Editar Setor ${name}` };
          }}
        />
        <Stack.Screen name="baia/create" options={{ title: "Criar Baia" }} />
        <Stack.Screen
          name="animal/[id]"
          options={({ route }) => {
            const { id } = route.params as AnimalParams;
            return {
              title: "",
              headerLeft: () => (
                <IconButton
                  icon="arrow-left"
                  onPress={() => {
                    router.back();
                  }}
                />
              ),
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
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Icon source="plus" size={20} />
                      <Text
                        style={{ fontSize: 18, marginLeft: 8 }}
                        onPress={() => {
                          router.push({
                            pathname: "/animal/create",
                            params: { idBaia: id },
                          });
                        }}
                      >
                        Adicionar Animais
                      </Text>
                    </View>
                  }
                  option2={
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Icon source="pencil" size={18} />
                      <Text
                        style={{ fontSize: 18, marginLeft: 8 }}
                        onPress={() => {
                          router.push(`/baia/edit/${id}`);
                        }}
                      >
                        Editar Baia
                      </Text>
                    </View>
                  }
                />
              ),
            };
          }}
        />
        <Stack.Screen
          name="animal/create"
          options={{
            title: "Cadastro de animal",
            headerLeft: () => (
              <IconButton
                icon="arrow-left"
                onPress={() => {
                  router.back();
                }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="baia/edit/[id]"
          options={({ route }) => {
            const { id } = route.params as BaiaParams;
            return { title: `Editar Baia` };
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

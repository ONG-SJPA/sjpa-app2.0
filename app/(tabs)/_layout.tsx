import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { IconButton } from "react-native-paper";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#5FC2BF",
        headerShown: useClientOnlyValue(false, true),
        tabBarInactiveTintColor: "#b0bec5",
        tabBarLabelStyle: { fontSize: 14 },
        tabBarStyle: {
          height: 70,
          padding: 10,
        },
      }}
      initialRouteName="cadastro/cadastro"
    >
      <Tabs.Screen
        name="cadastro/cadastro"
        options={{
          title: "Setores",
          headerRight: () => (
            <IconButton
              icon="plus"
              onPress={() => {
                console.log("clicou");
              }}
            />
          ),
          tabBarAccessibilityLabel: "sdasdasdsd",
          tabBarLabel: "Cadastro",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="archive" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="conference/conference"
        options={{
          tabBarItemStyle: { alignContent: "space-around" },
          title: "Conferência",
          headerRight: () => (
            <IconButton
              icon="plus"
              onPress={() => {
                console.log("clicou");
              }}
            />
          ),
          tabBarIcon: ({ color }) => <TabBarIcon name="check" color={color} />,
        }}
      />
    </Tabs>
  );
}

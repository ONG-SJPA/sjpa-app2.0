// app/detail/[id].tsx
import React from "react";
import { Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

const SectorPage = () => {
  const params = useLocalSearchParams<{ id: string }>(); // Usando useSearchParams com TypeScript
  const { id } = params;

  return (
    <View>
      <Text>ID do Item:{id}</Text>
    </View>
  );
};

export default SectorPage;

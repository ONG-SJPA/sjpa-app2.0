// app/detail/[id].tsx
import React from "react";
import { Image, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useBaiaPage } from "./hooks/useBaiaPage";
import * as S from "./index.styles";
import { Avatar, Card, IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";

const BaiaPage = () => {
  const params = useLocalSearchParams<{ id: string }>();
  const { id } = params;

  const { baia: baiaData } = useBaiaPage({
    baiaId: Number(id),
    sectorCode: "A",
  });

  if (!baiaData) {
    return (
      <View>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <S.TitleContainer>
        <S.Title>Baias {baiaData?.numeroBaia}</S.Title>
        <IconButton
          icon={() => <Icon name="add-box" size={45} color="#000000" />}
          size={30}
          onPress={() => console.log("Pressed")}
        />
      </S.TitleContainer>
      {baiaData ? (
        baiaData.animais.map((x, i) => {
          return (
            <View key={i}>
              <Text>{x.nome}</Text>
            </View>
          );
        })
      ) : (
        <View>
          <Text>Setor não encontrado</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default BaiaPage;

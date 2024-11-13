import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useBaiaPage } from "./hooks/useBaiaPage";
import * as S from "./index.styles";
import CardItem from "@/components/CardItem";
import CommonLayout from "@/components/Layout/CommonLayout";

const BaiaPage = () => {
  const params = useLocalSearchParams<{ id: string }>();
  const { id } = params;

  const { baia: baiaData, animais } = useBaiaPage({
    baiaId: id,
  });

  if (!baiaData) {
    return (
      <View>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <CommonLayout>
      <S.ViewList>
        {baiaData ? (
          animais.map((x, i) => {
            const animalFirstLetter = x.nome.charAt(0).toUpperCase();
            return (
              <S.ViewListSector key={i}>
                <TouchableOpacity
                  onPress={() => router.push(`/animal/${x.id}`)}
                >
                  <CardItem
                    rightComponent={
                      <S.AvatarText label={animalFirstLetter} size={40} />
                    }
                    title={x.nome}
                    subtitle="Test Info"
                  />
                </TouchableOpacity>
              </S.ViewListSector>
            );
          })
        ) : (
          <View>
            <Text>Setor não encontrado</Text>
          </View>
        )}
      </S.ViewList>
    </CommonLayout>
  );
};

export default BaiaPage;

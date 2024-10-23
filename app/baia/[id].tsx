// app/detail/[id].tsx
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { useBaiaPage } from "./hooks/useBaiaPage";
import * as S from "./index.styles";
import { Avatar, Card, IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import CardItem from "@/components/CardItem";

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
      <S.ViewList>
        {baiaData ? (
          baiaData.animais.map((x, i) => {
            return (
              <S.ViewListSector key={i}>
                <TouchableOpacity onPress={() => router.push(`/animal/1`)}>
                  <CardItem
                    rightComponent={
                      <Avatar.Text
                        label="T"
                        size={40}
                        color="#000000"
                        style={{
                          backgroundColor: "#5FC2BF",
                          borderWidth: 1,
                          borderColor: "#00000037",
                        }}
                      />
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
    </SafeAreaView>
  );
};

export default BaiaPage;

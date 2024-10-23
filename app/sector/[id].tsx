// app/detail/[id].tsx
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useSectorPage } from "./hooks/useSectorPage";
import * as S from "@/app/(tabs)/cadastro/index.styles";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AnimalType } from "@/types/enum/animal/AnimalTypeEnum";
import CardItemSector from "@/components/card";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Avatar } from "react-native-paper";

const SectorPage = () => {
  const params = useLocalSearchParams<{ id: string }>(); // Usando useSearchParams com TypeScript
  const { id } = params;

  const { sector } = useSectorPage({ sectorCode: id });

  return (
    <SafeAreaView
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <S.ViewList>
        {sector ? (
          sector.baias.map((x) => {
            const pathImage =
              x.tipo === AnimalType.Dog
                ? require("./../../assets/images/dog.jpg")
                : require("./../../assets/images/cat.jpg");
            return (
              <S.ViewListSector key={x.numeroBaia}>
                <TouchableOpacity
                  key={x.numeroBaia}
                  onPress={() => router.push(`/baia/${x.numeroBaia}`)}
                >
                  <CardItemSector
                    rightComponent={
                      <Avatar.Image
                        source={pathImage}
                        size={40}
                        style={{
                          backgroundColor: "#5FC2BF",
                          borderWidth: 1,
                          borderColor: "#00000037",
                        }}
                      />
                    }
                    title={`Baia: ${x.numeroBaia}`}
                    subtitle={`Qtd. de animais: ${x.animais.length}`}
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

export default SectorPage;

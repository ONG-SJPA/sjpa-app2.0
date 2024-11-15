import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useSectorPage } from "./hooks/useSectorPage";
import { router } from "expo-router";
import { AnimalType } from "@/types/enum/animal/AnimalTypeEnum";
import CardItem from "@/components/CardItem";
import CommonLayout from "@/components/Layout/CommonLayout";
import * as S from "./index.styles";

const SectorPage = () => {
  const { sector, baias } = useSectorPage();

  return (
    <CommonLayout>
      <S.ViewListBay>
        {sector ? (
          baias.map((x) => {
            const pathImage =
              x.tipo === AnimalType.Dog
                ? require("./../../assets/images/dog.jpg")
                : require("./../../assets/images/cat.jpg");
            return (
              <S.ViewListItem key={x.numeroBaia}>
                <TouchableOpacity
                  key={x.numeroBaia}
                  onPress={() =>
                    router.push({
                      pathname: `/baia/[id]`,
                      params: {
                        id: x.id,
                        sector: sector.nome,
                        numeroBaia: x.numeroBaia,
                      },
                    })
                  }
                >
                  <CardItem
                    rightComponent={
                      <S.AvatarImage source={pathImage} size={40} />
                    }
                    title={`Baia: ${x.numeroBaia}`}
                    subtitle={`Qtd. de animais: ${x.animais.length}`}
                  />
                </TouchableOpacity>
              </S.ViewListItem>
            );
          })
        ) : (
          <View>
            <Text>Setor não encontrado</Text>
          </View>
        )}
      </S.ViewListBay>
    </CommonLayout>
  );
};

export default SectorPage;

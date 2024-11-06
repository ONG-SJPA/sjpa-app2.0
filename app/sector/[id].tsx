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
  const params = useLocalSearchParams<{ id: string }>(); // Usando useSearchParams com TypeScript
  const { id } = params;

  const { sector } = useSectorPage({ sectorCode: id });

  return (
    <CommonLayout>
      <S.ViewListBay>
        {/* {sector ? (
          Object.values(sector.bays).map((x) => {
            const pathImage =
              x.type === AnimalType.Dog
                ? require("./../../assets/images/dog.jpg")
                : require("./../../assets/images/cat.jpg");
            return (
              <S.ViewListItem key={x.bayNumber}>
                <TouchableOpacity
                  key={x.bayNumber}
                  onPress={() => router.push(`/baia/${x.bayNumber}`)}
                >
                  <CardItem
                    rightComponent={
                      <S.AvatarImage source={pathImage} size={40} />
                    }
                    title={`Baia: ${x.bayNumber}`}
                    subtitle={`Qtd. de animais: ${x.animals.length}`}
                  />
                </TouchableOpacity>
              </S.ViewListItem>
            );
          })
        ) : (
          <View>
            <Text>Setor não encontrado</Text>
          </View>
        )} */}
      </S.ViewListBay>
    </CommonLayout>
  );
};

export default SectorPage;

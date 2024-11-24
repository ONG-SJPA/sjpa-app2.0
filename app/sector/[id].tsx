import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSectorPage } from "./hooks/useSectorPage";
import { router } from "expo-router";
import { AnimalType } from "@/types/enum/animal/AnimalTypeEnum";
import CardItem from "@/components/CardItem";
import CommonLayout from "@/components/Layout/CommonLayout";
import * as S from "./index.styles";
import { ActivityIndicator, Avatar } from "react-native-paper";

const SectorPage = () => {
  const { sector, baias } = useSectorPage();

  if (!sector || !baias || sector.baias.length == 0) {
    return (
      <CommonLayout>
        <S.ViewLoading>
          <ActivityIndicator animating={true} size="large" color="#FFFFFF" />
        </S.ViewLoading>
      </CommonLayout>
    );
  }

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
                        idSector: sector.id,
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
                    titleInfo2="Observação"
                    info2={x.observacao}
                    titleInfo3="Checagem"
                    info3={
                      <Avatar.Icon
                        size={32}
                        icon={x.missingCheck ? "minus-circle" : "check"}
                        color="#ffffff"
                        style={{
                          backgroundColor: x.missingCheck
                            ? "#ff0000"
                            : "#00ff00",
                        }}
                      />
                    }
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

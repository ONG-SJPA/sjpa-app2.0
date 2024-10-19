// app/detail/[id].tsx
import React from "react";
import { Image, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSectorPage } from "./hooks/useSectorPage";
import {
  StyledTitle,
  StyledTitleContainer,
} from "../(tabs)/cadastro/index.styles";
import { Avatar, Card, IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AnimalTypeEnum,
  AnimalTypeEnumLabel,
} from "@/types/enum/animal/AnimalTypeEnum";

const SectorPage = () => {
  const params = useLocalSearchParams<{ id: string }>(); // Usando useSearchParams com TypeScript
  const { id } = params;

  const { sector } = useSectorPage({ sectorCode: id });

  return (
    <SafeAreaView
      style={{
        height: "100%",
        width: "100%",
        padding: 10,
      }}
    >
      <StyledTitleContainer>
        <StyledTitle>Baias do setor {id}</StyledTitle>
        <IconButton
          icon={() => <Icon name="add-box" size={45} color="#000000" />}
          size={30}
          onPress={() => console.log("Pressed")}
        />
      </StyledTitleContainer>
      {sector ? (
        sector.baias.map((x) => {
          const pathImage =
            x.tipo === AnimalTypeEnum.Dog
              ? require("./../../assets/images/dog.jpg")
              : require("./../../assets/images/cat.jpg");
          return (
            <View key={x.numeroBaia}>
              <Card.Title
                title={`Baia ${x.numeroBaia}`}
                subtitle={`Quantidade de animais: ${x.animais.length} ${
                  AnimalTypeEnumLabel[x.tipo]
                }(s)`}
                left={(props) => <Avatar.Image {...props} source={pathImage} />}
                right={(props) => (
                  <IconButton
                    {...props}
                    icon="dots-vertical"
                    onPress={() => {}}
                  />
                )}
              />
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

export default SectorPage;

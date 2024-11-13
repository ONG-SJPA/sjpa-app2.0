import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import * as S from "./index.styles";
import { LinearGradient } from "expo-linear-gradient";
import { useAnimalPage } from "./hooks/useAnimalPage";
import { View } from "@/components/Themed";
import CommonLayout from "@/components/Layout/CommonLayout";

const AnimalPage = () => {
  const image = require("@/assets/images/dog.jpg");

  const { animal } = useAnimalPage();

  if (!animal) {
    return (
      <View>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <CommonLayout>
      <S.AnimalContainer>
        <S.AvatarTitle>
          <Avatar.Image source={image} size={250} />
          <Text variant="displayMedium">{animal.nome}</Text>
        </S.AvatarTitle>
        <S.ContentInfo>
          <S.CardContainer>
            <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
              Idade
            </Text>
            <Text variant="bodyMedium">{`${animal.idade.toString()} ano(s)`}</Text>
          </S.CardContainer>
          <S.CardContainer>
            <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
              Raça
            </Text>
            <Text variant="bodyMedium">{animal.raca}</Text>
          </S.CardContainer>
          <S.CardContainer>
            <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
              Observações
            </Text>
            <Text variant="bodyMedium">{animal.observacao}</Text>
          </S.CardContainer>
        </S.ContentInfo>
      </S.AnimalContainer>
    </CommonLayout>
  );
};

export default AnimalPage;

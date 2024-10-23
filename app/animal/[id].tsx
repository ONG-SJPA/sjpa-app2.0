import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import * as S from "./index.styles";
import { LinearGradient } from "expo-linear-gradient";

const AnimalPage = () => {
  const params = useLocalSearchParams<{ id: string }>(); // Usando useSearchParams com TypeScript
  const { id } = params;

  const image = require("@/assets/images/dog.jpg");
  const nome = "Buddy";
  const idade = 4;
  const raca = "Golden Retriever";
  const observacao = "Muito carinhoso e adora brincar com crianças";

  return (
    <SafeAreaView
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <LinearGradient
        colors={["#63C0C5", "#60C3B1", "#62C189", "#5FBF78", "#5ABC65"]}
        style={{
          height: "100%",
        }}
      >
        <S.AnimalContainer>
          <S.AvatarTitle>
            <Avatar.Image source={image} size={250} />
            <Text variant="displayMedium">{nome}</Text>
          </S.AvatarTitle>
          <S.ContentInfo>
            <S.CardContainer>
              <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
                Idade
              </Text>
              <Text variant="bodyMedium">{`${idade.toString()} ano(s)`}</Text>
            </S.CardContainer>
            <S.CardContainer>
              <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
                Raça
              </Text>
              <Text variant="bodyMedium">{raca} ano(s)</Text>
            </S.CardContainer>
            <S.CardContainer>
              <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
                Observações
              </Text>
              <Text variant="bodyMedium">{observacao}</Text>
            </S.CardContainer>
          </S.ContentInfo>
        </S.AnimalContainer>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default AnimalPage;

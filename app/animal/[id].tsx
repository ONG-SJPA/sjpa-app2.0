import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native";
import { Avatar, Card, Switch, Text } from "react-native-paper";
import * as S from "./index.styles";
import { LinearGradient } from "expo-linear-gradient";
import { useAnimalPage } from "./hooks/useAnimalPage";
import { View } from "@/components/Themed";
import CommonLayout from "@/components/Layout/CommonLayout";
import { checkAnimal } from "@/repository/animal.repository";
import { useEffect, useState } from "react";
import { getLastCheck } from "@/repository/check.repository";

const AnimalPage = () => {
  const image = require("@/assets/images/dog.jpg");

  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [lastCheck, setLastCheck] = useState("");

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const { animal } = useAnimalPage();

  useEffect(() => {
    if (animal) {
      checkAnimal(animal.id, isSwitchOn);
    }
  }, [isSwitchOn]);

  useEffect(() => {
    async function getLastCheckAndVerify() {
      const lastCheck = await getLastCheck();
      setIsSwitchOn(lastCheck ? animal?.lastCheck === lastCheck?.id : false);
      if (lastCheck) {
        setLastCheck(lastCheck.check.toDate().toLocaleDateString());
      }
    }
    getLastCheckAndVerify();
  }, [animal]);

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
          <S.CardContainer>
            <Text variant="bodyMedium" style={{ fontWeight: "bold", flex: 1 }}>
              <Switch
                value={isSwitchOn}
                onValueChange={onToggleSwitch}
                style={{
                  marginRight: 10,
                }}
              />
              {isSwitchOn ? `Checado em ${lastCheck}` : "Não Checado"}
            </Text>
          </S.CardContainer>
        </S.ContentInfo>
      </S.AnimalContainer>
    </CommonLayout>
  );
};

export default AnimalPage;

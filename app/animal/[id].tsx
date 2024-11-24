import { ActivityIndicator, Avatar, Switch, Text } from "react-native-paper";
import * as S from "./index.styles";
import { useAnimalPage } from "./hooks/useAnimalPage";
import CommonLayout from "@/components/Layout/CommonLayout";
import { checkAnimal, deleteAnimal } from "@/repository/animal.repository";
import { useCallback, useState } from "react";
import { getLastCheck } from "@/repository/check.repository";
import { AnimalType } from "@/types/enum/animal/AnimalTypeEnum";
import { getDogImage } from "@/repository/externalApi/theDog.repository";
import { getCatchImage } from "@/repository/externalApi/theCats.repository";
import { useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { router, useLocalSearchParams } from "expo-router";

const AnimalPage = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [lastCheck, setLastCheck] = useState("");
  const [image, setImage] = useState("");

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const { animal } = useAnimalPage();

  useFocusEffect(
    useCallback(() => {
      async function getImage() {
        if (animal?.tipo === AnimalType.Dog) {
          const dogImage = await getDogImage();
          setImage(dogImage);
        } else {
          const catImage = await getCatchImage();
          setImage(catImage);
        }
      }
      getImage();
    }, [animal]),
  );

  useFocusEffect(
    useCallback(() => {
      if (animal) {
        checkAnimal(animal.id, isSwitchOn);
      }
    }, [isSwitchOn]),
  );

  useFocusEffect(
    useCallback(() => {
      async function getLastCheckAndVerify() {
        const lastCheck = await getLastCheck();
        setIsSwitchOn(lastCheck ? animal?.lastCheck === lastCheck?.id : false);
        if (lastCheck) {
          setLastCheck(lastCheck.check.toDate().toLocaleDateString());
        }
      }
      getLastCheckAndVerify();
    }, [animal]),
  );

  if (!animal) {
    return (
      <CommonLayout>
        <S.ViewLoading>
          <ActivityIndicator animating={true} size="large" color="#FFFFFF" />
        </S.ViewLoading>
      </CommonLayout>
    );
  }

  const onSubmit = async () => {
    console.log("edsasdasd");
    await deleteAnimal({
      id: animal.id,
      idBaia: animal.idBaia,
      idSetor: animal.idSetor,
    });
    // router.push(`/animal/${id}`);
    router.back();
  };

  return (
    <CommonLayout>
      <S.AnimalContainer>
        <S.AvatarTitle>
          <Avatar.Image source={{ uri: image }} size={250} />
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
        <S.ViewButton
          labelStyle={{
            color: "#ff0000",
            fontSize: 16,
            fontWeight: "bold",
          }}
          icon={() => <Icon name="delete" size={22} color={"#ff0000"} />}
          onPress={onSubmit}
        >
          Deletar
        </S.ViewButton>
      </S.AnimalContainer>
    </CommonLayout>
  );
};

export default AnimalPage;

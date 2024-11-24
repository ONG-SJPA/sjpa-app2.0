import React, { useCallback, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useBaiaPage } from "./hooks/useBaiaPage";
import * as S from "./index.styles";
import CardItem from "@/components/CardItem";
import CommonLayout from "@/components/Layout/CommonLayout";
import { CheckDTO } from "@/types/dto/check/CheckDTO";
import { getLastCheck } from "@/repository/check.repository";
import { Avatar } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";

const BaiaPage = () => {
  const params = useLocalSearchParams<{ id: string }>();
  const { id } = params;

  const [lastCheck, setLastCheck] = useState<CheckDTO | null>();

  useFocusEffect(
    useCallback(() => {
      async function getLastCheckAndVerify() {
        const lastCheck = await getLastCheck();
        setLastCheck(lastCheck);
      }
      getLastCheckAndVerify();
    }, []),
  );

  const { baia: baiaData, animais } = useBaiaPage({
    baiaId: id,
  });

  if (!baiaData) {
    return (
      <View>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <CommonLayout>
      <S.ViewList>
        {baiaData ? (
          animais.map((x, i) => {
            const animalFirstLetter = x.nome.charAt(0).toUpperCase();
            return (
              <S.ViewListSector key={i}>
                <TouchableOpacity
                  onPress={() => router.push(`/animal/${x.id}`)}
                >
                  <CardItem
                    rightComponent={
                      <S.AvatarText label={animalFirstLetter} size={40} />
                    }
                    title={x.nome}
                    subtitle={x.raca}
                    titleInfo="Idade"
                    info={x.idade.toString()}
                    titleInfo2="Tipo"
                    info2={x.tipo === 1 ? "Cachorro" : "Gato"}
                    titleInfo3="Checagem"
                    info3={
                      <Avatar.Icon
                        size={32}
                        icon={
                          x.lastCheck !== lastCheck?.id
                            ? "minus-circle"
                            : "check"
                        }
                        color="#ffffff"
                        style={{
                          backgroundColor:
                            x.lastCheck !== lastCheck?.id
                              ? "#ff0000"
                              : "#00ff00",
                        }}
                      />
                    }
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
    </CommonLayout>
  );
};

export default BaiaPage;

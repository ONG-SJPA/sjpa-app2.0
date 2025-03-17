import React, { useCallback, useState } from "react";
import { Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useBaiaPage } from "./hooks/useBaiaPage";
import * as S from "./index.styles";
import CardItem from "@/components/CardItem";
import CommonLayout from "@/components/Layout/CommonLayout";
import { CheckDTO } from "@/types/dto/check/CheckDTO";
import { getLastCheck } from "@/repository/check.repository";
import { ActivityIndicator, Avatar } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import {
  TouchableOpacity,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

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

  if (!baiaData || !animais) {
    return (
      <CommonLayout>
        <S.ViewLoading>
          {/* <ActivityIndicator animating={true} size="large" color="#FFFFFF" /> */}
          <Text style={{ fontSize: 20, color: "#FFFFFF" }}>
            Animal não encontrado
          </Text>
        </S.ViewLoading>
      </CommonLayout>
    );
  }

  if (baiaData.animais.length == 0) {
    return (
      <CommonLayout>
        <S.ViewLoading>
          <Text style={{ fontSize: 20, color: "#FFFFFF" }}>
            Nenhum animal encontrado
          </Text>
        </S.ViewLoading>
      </CommonLayout>
    );
  }

  return (
    <GestureHandlerRootView>
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
    </GestureHandlerRootView>
  );
};

export default BaiaPage;

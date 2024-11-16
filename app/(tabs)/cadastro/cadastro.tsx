import { ScrollView } from "react-native";
import * as S from "@/app/(tabs)/cadastro/index.styles";
import { TouchableOpacity } from "react-native";
import { useCadastroPage } from "./hooks/useCadastroPage";
import CardItem from "../../../components/CardItem";
import { router } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CommonLayout from "@/components/Layout/CommonLayout";
import { Avatar } from "react-native-paper";

export default function Cadastro() {
  const { sectors } = useCadastroPage();

  return (
    <CommonLayout>
      <ScrollView
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <S.ViewList>
          {sectors.map((sector) => {
            return (
              <S.ViewListSector key={sector.nome}>
                <GestureHandlerRootView>
                  <TouchableOpacity
                    key={sector.nome}
                    onPress={() => router.push(`/sector/${sector.nome}`)}
                  >
                    <CardItem
                      rightComponent={
                        <S.AvatarTextSection label={sector.nome} size={40} />
                      }
                      title={`Setor: ${sector.nome}`}
                      subtitle={`Qtd. de baias: ${sector.baias.length}`}
                      titleInfo3="Checagem"
                      info3={
                        <Avatar.Icon
                          size={32}
                          icon={sector.missingCheck ? "minus-circle" : "check"}
                          color="#ffffff"
                          style={{
                            backgroundColor: sector.missingCheck
                              ? "#ff0000"
                              : "#00ff00",
                          }}
                        />
                      }
                    />
                  </TouchableOpacity>
                </GestureHandlerRootView>
              </S.ViewListSector>
            );
          })}
        </S.ViewList>
      </ScrollView>
    </CommonLayout>
  );
}

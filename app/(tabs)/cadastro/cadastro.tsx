import { ScrollView } from "react-native";
import * as S from "@/app/(tabs)/cadastro/index.styles";
import { TouchableOpacity } from "react-native";
import { useCadastroPage } from "./hooks/useCadastroPage";
import CardItem from "../../../components/CardItem";
import { router } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CommonLayout from "@/components/Layout/CommonLayout";

export default function Cadastro() {
  const { sectors } = useCadastroPage();

  return (
    <ScrollView
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <CommonLayout>
        <S.ViewList>
          {sectors.map((sector) => {
            return (
              <S.ViewListSector key={sector.setor}>
                <GestureHandlerRootView>
                  <TouchableOpacity
                    key={sector.setor}
                    onPress={() => router.push(`/sector/${sector.setor}`)}
                  >
                    <CardItem
                      rightComponent={
                        <S.AvatarTextSection label={sector.setor} size={40} />
                      }
                      title={`Setor: ${sector.setor}`}
                      subtitle={`Qtd. de baias: ${sector.baias.length}`}
                    />
                  </TouchableOpacity>
                </GestureHandlerRootView>
              </S.ViewListSector>
            );
          })}
        </S.ViewList>
      </CommonLayout>
    </ScrollView>
  );
}

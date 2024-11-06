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
              <S.ViewListSector key={sector.code}>
                <GestureHandlerRootView>
                  <TouchableOpacity
                    key={sector.code}
                    onPress={() => router.push(`/sector/${sector.code}`)}
                  >
                    <CardItem
                      rightComponent={
                        <S.AvatarTextSection label={sector.code} size={40} />
                      }
                      title={`Setor: ${sector.code}`}
                      subtitle={`Qtd. de baias: ${sector.numberOfBays}`}
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

import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as S from "@/app/(tabs)/cadastro/index.styles";
import { TouchableOpacity } from "react-native";
import { useCadastroPage } from "./hooks/useCadastroPage";
import CardItemSector from "../../../components/card";
import { router } from "expo-router";

export default function Cadastro() {
  const { sectors } = useCadastroPage();

  return (
    <ScrollView>
      <SafeAreaView>
        <S.ViewList>
          {sectors.map((sector) => {
            return (
              <S.ViewListSector key={sector.setor}>
                {/* Tornar um espaço clicavel assim todo o Card pode ser clicavel*/}
                <TouchableOpacity
                  key={sector.setor}
                  onPress={() => router.push(`/sector/${sector.setor}`)}
                >
                  <CardItemSector setor={sector} />
                </TouchableOpacity>
              </S.ViewListSector>
            );
          })}
        </S.ViewList>
      </SafeAreaView>
    </ScrollView>
  );
}

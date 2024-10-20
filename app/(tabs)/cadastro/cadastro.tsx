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

// Descartar ?
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: "80%",
//   },
// });

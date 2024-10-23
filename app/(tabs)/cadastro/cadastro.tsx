import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as S from "@/app/(tabs)/cadastro/index.styles";
import { TouchableOpacity } from "react-native";
import { useCadastroPage } from "./hooks/useCadastroPage";
import CardItem from "../../../components/CardItem";
import { router } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Avatar } from "react-native-paper";

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
                <GestureHandlerRootView>
                  <TouchableOpacity
                    key={sector.setor}
                    onPress={() => router.push(`/sector/${sector.setor}`)}
                  >
                    <CardItem
                      rightComponent={
                        <Avatar.Text
                          label={sector.setor}
                          size={40}
                          color="#000000"
                          style={{
                            backgroundColor: "#5FC2BF",
                            borderWidth: 1,
                            borderColor: "#00000037",
                          }}
                        />
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
      </SafeAreaView>
    </ScrollView>
  );
}

import { ScrollView } from "react-native";
import * as S from "@/app/(tabs)/cadastro/index.styles";
import { useCadastroPage } from "./hooks/useCadastroPage";
import CardItem from "../../../components/CardItem";
import { router } from "expo-router";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import CommonLayout from "@/components/Layout/CommonLayout";
import { Avatar } from "react-native-paper";

export default function Cadastro() {
  const { sectors } = useCadastroPage();

  return (
    <GestureHandlerRootView>
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
                  <TouchableOpacity
                    key={sector.nome}
                    onPress={() =>
                      router.push({
                        pathname: "/sector/[id]",
                        params: {
                          id: sector.id,
                          name: sector.nome,
                        },
                      })
                    }
                  >
                    <CardItem
                      rightComponent={
                        <S.AvatarTextSection label={sector.nome} size={40} />
                      }
                      title={`Setor: ${sector.nome}`}
                      subtitle={`Qtd. de baias: ${sector.baias.length}`}
                      titleInfo2="Observações"
                      info2={sector.observacao}
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
                </S.ViewListSector>
              );
            })}
          </S.ViewList>
        </ScrollView>
      </CommonLayout>
    </GestureHandlerRootView>
  );
}

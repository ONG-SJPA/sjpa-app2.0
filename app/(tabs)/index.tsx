import { StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyledMainContainer,
  StyledSectorButton,
  StyledTextButton,
  StyledTitle,
  StyledTitleContainer,
} from "@/styles/cadastro/index.styles";
import { IconButton } from "react-native-paper";
import { useCadastroPage } from "@/hooks/cadastro/useCadastroPage";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Link, useNavigation } from "expo-router";

export default function Cadastro() {
  const { sectors } = useCadastroPage();

  return (
    <SafeAreaView
      style={{
        height: "100%",
        width: "100%",
        padding: 10,
      }}
    >
      <StyledTitleContainer>
        <StyledTitle>Setores</StyledTitle>
        <IconButton
          icon={() => <Icon name="add-box" size={45} color="#000000" />}
          size={30}
          onPress={() => console.log("Pressed")}
        />
      </StyledTitleContainer>
      <StyledMainContainer>
        {sectors.map((sector) => {
          return (
            <Link href={`/sector/${sector.setor}`} asChild key={sector.setor}>
              <StyledSectorButton mode="contained">
                <StyledTextButton>{sector.setor}</StyledTextButton>
              </StyledSectorButton>
            </Link>
          );
        })}
      </StyledMainContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

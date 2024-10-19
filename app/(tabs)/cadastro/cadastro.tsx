import { StyleSheet, Text } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyledMainContainer,
  StyledSectorButton,
  StyledTextButton,
  StyledTitle,
  StyledTitleContainer,
} from "@/app/(tabs)/cadastro/index.styles";
import { Avatar, Card, IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Link } from "expo-router";
import { useCadastroPage } from "./hooks/useCadastroPage";
import { View } from "@/components/Themed";

export default function Cadastro() {
  const { sectors } = useCadastroPage();

  return (
    <SafeAreaView>
      <StyledTitleContainer>
        <StyledTitle>Setores</StyledTitle>
        <IconButton
          icon={() => <Icon name="add-box" size={45} color="#000000" />}
          size={30}
          onPress={() => console.log("Pressed")}
        />
      </StyledTitleContainer>
      {sectors.map((sector) => {
        return (
          <View key={sector.setor}>
            <Card.Title
              style={{
                backgroundColor: "#34a54c",
              }}
              title={
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                  }}
                >{`Setor ${sector.setor}`}</Text>
              }
              subtitle={
                <Text
                  style={{ color: "white" }}
                >{`Quantidade de baias: ${sector.baias.length}`}</Text>
              }
              left={(props) => <Avatar.Text {...props} label={sector.setor} />}
              right={(props) => (
                <Link
                  href={`/sector/${sector.setor}`}
                  asChild
                  key={sector.setor}
                >
                  <IconButton
                    {...props}
                    icon="dots-vertical"
                    onPress={() => {}}
                    style={{ backgroundColor: "#ffffff" }}
                  />
                </Link>
              )}
            />
          </View>
        );
      })}
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

import { Avatar, Card, Title, Paragraph } from "react-native-paper";
import { View } from "@/components/Themed";
import { Text } from "react-native";
import { SectorDTO } from "@/types/dto/animais/SectorDTO";
import React, { ReactNode } from "react";
import { BaiaDTO } from "@/types/dto/animais/CanilDTO";

type CardItemSectorProps = {
  setor?: SectorDTO;
  baia?: BaiaDTO;
  pathImage?: any;

  iconButon?: ReactNode;
};

function CardItemSector({
  setor,
  baia,
  pathImage,
  iconButon,
}: CardItemSectorProps) {
  return (
    <View style={{ backgroundColor: "transparent" }}>
      <Card style={{ backgroundColor: "#ffffff", borderRadius: 10 }}>
        <>
          <View
            style={{
              flex: 1,
              height: "100%",
              width: "22%",
              borderCurve: "circular",
              borderTopRightRadius: 40,
              borderRadius: 10,
              borderEndEndRadius: 40,
              position: "absolute",
              backgroundColor: "#62C189",
            }}
          />
        </>
        <Card.Content>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingTop: 20,
              paddingLeft: 5,
              backgroundColor: "transparent",
            }}
          >
            {setor ? (
              <Avatar.Text
                label={setor.setor}
                size={40}
                color="#000000"
                style={{
                  backgroundColor: "#5FC2BF",
                  borderWidth: 1,
                  borderColor: "#00000037",
                }}
              />
            ) : (
              <Avatar.Image
                source={pathImage}
                size={40}
                style={{
                  backgroundColor: "#5FC2BF",
                  borderWidth: 1,
                  borderColor: "#00000037",
                }}
              />
            )}
            <View style={{ marginLeft: 20, backgroundColor: "transparent" }}>
              <Title style={{ fontWeight: "bold", fontSize: 24 }}>
                {setor
                  ? `Setor ${setor.setor}`
                  : baia
                  ? `Baia ${baia.numeroBaia}`
                  : ""}
              </Title>
              <Paragraph>
                Qtd. de{" "}
                {setor
                  ? `baias: ${setor.baias.length}`
                  : baia
                  ? `animais: ${baia.animais.length}`
                  : ""}
              </Paragraph>
            </View>
            <View>{iconButon}</View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "transparent",
              marginTop: 10,
            }}
          >
            <View
              style={{ alignItems: "center", backgroundColor: "transparent" }}
            >
              <Text>Info?</Text>
              <Text style={{ fontSize: 12 }}>teste info</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text>Info 2?</Text>
              <Text style={{ fontSize: 12 }}>Teste info2</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text>Info 3?</Text>
              <Text style={{ fontSize: 12 }}>Teste info3</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}

export default CardItemSector;

import { Card, Title, Paragraph } from "react-native-paper";
import { View } from "@/components/Themed";
import { Text } from "react-native";
import React, { ReactNode } from "react";
import * as S from "./index.styles";

type CardItemSectorProps = {
  title: string;
  subtitle: string;
  rightComponent: ReactNode;
  iconButon?: ReactNode;
};

function CardItem({
  title,
  subtitle,
  rightComponent,
  iconButon,
}: CardItemSectorProps) {
  return (
    <S.MainContainer>
      <S.CardContainer>
        <>
          <S.GreenBackground />
        </>
        <Card.Content>
          <S.ViewContentContainer>
            {rightComponent}
            <S.ViewTitlesContainer>
              <S.TitleCard>{title}</S.TitleCard>
              <Paragraph>{subtitle}</Paragraph>
            </S.ViewTitlesContainer>
            <View>{iconButon}</View>
          </S.ViewContentContainer>

          <S.ViewInformationContainer>
            <S.ViewInformation>
              <S.BorderRightInformationText>Info?</S.BorderRightInformationText>
              <S.ItemInformation>
                <S.BorderRightInformationText>
                  Teste info
                </S.BorderRightInformationText>
              </S.ItemInformation>
            </S.ViewInformation>
            <S.ViewInformation>
              <Text>Info 2?</Text>
              <S.ItemInformation>Teste info2</S.ItemInformation>
            </S.ViewInformation>
            <S.ViewInformation>
              <Text>Info 3?</Text>
              <S.ItemInformation>Teste info3</S.ItemInformation>
            </S.ViewInformation>
          </S.ViewInformationContainer>
        </Card.Content>
      </S.CardContainer>
    </S.MainContainer>
  );
}

export default CardItem;

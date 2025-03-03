import { Card, Title, Paragraph } from "react-native-paper";
import { View } from "@/components/Themed";
import { Text } from "react-native";
import React, { ReactNode } from "react";
import * as S from "./index.styles";

function shortenString(input: string): string {
  if (input.length > 30) {
    return input.substring(0, 25) + "...";
  }
  return input;
}

type CardItemSectorProps = {
  title: string;
  subtitle: string;
  rightComponent: ReactNode;
  iconButon?: ReactNode;
  titleInfo?: string;
  info?: string;
  titleInfo2?: string;
  info2?: string;
  titleInfo3?: string;
  info3?: string | ReactNode;
};

function CardItem({
  title,
  subtitle,
  rightComponent,
  iconButon,
  titleInfo2 = "",
  info2 = "",
  titleInfo3 = "",
  info3 = "",
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
            <S.ViewFirstInformation>
              <Text>{titleInfo2}</Text>
              <S.ItemInformation>{shortenString(info2)}</S.ItemInformation>
            </S.ViewFirstInformation>
            <S.ViewInformation>
              <Text>{titleInfo3}</Text>
              <S.ItemInformation>{info3}</S.ItemInformation>
            </S.ViewInformation>
          </S.ViewInformationContainer>
        </Card.Content>
      </S.CardContainer>
    </S.MainContainer>
  );
}

export default CardItem;

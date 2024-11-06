import { Card, CardProps, Title, TitleProps } from "react-native-paper";
import styled from "styled-components/native";

export const MainContainer = styled.View`
  background-color: transparent;
`;

export const CardContainer = styled(Card)<CardProps>`
  background-color: white;
  border-radius: 10px;
`;

export const GreenBackground = styled.View`
  flex: 1;
  height: 100%;
  width: 22%;
  border-top-right-radius: 40px;
  border-radius: 10px;
  border-end-end-radius: 40px;
  position: absolute;
  background-color: #03943f;
`;

export const ViewContentContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: 20px;
  padding-left: 5px;
  background-color: transparent;
`;

export const ViewTitlesContainer = styled.View`
  margin-left: 25px;
  background-color: transparent;
`;

export const TitleCard = styled(Title)<TitleProps>`
  font-weight: bold;
  font-size: 24px;
`;

export const ViewInformationContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: transparent;
  margin-top: 10px;
`;

export const ViewInformation = styled.View`
  align-items: center;
  background-color: transparent;
`;

export const ItemInformation = styled.Text`
  font-size: 12px;
`;

export const BorderRightInformationText = styled.Text`
  color: white;
`;

import { Button, Card, Props } from "react-native-paper";
import styled from "styled-components/native";

export const MainContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  flex-direction: row;
  overflow: auto;
`;

export const SectorButton = styled(Button)<Props>`
  background-color: #25bf22;
  width: 110px;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TextButton = styled.Text`
  color: white;
  font-size: 25px;
`;

export const Title = styled.Text`
  font-size: 30px;
  font-weight: bold;
  margin-left: 10px;
`;

export const TitleContainer = styled.View`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  gap: 10px;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: white;
`;

export const ViewList = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ViewListSector = styled.View`
  width: 90%;
  margin: 10px;
  border-radius: 10px;
`;

import { Avatar, AvatarTextProps } from "react-native-paper";
import styled from "styled-components/native";

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

export const AvatarText = styled(Avatar.Text)<AvatarTextProps>`
  background-color: #5fc2bf;
  border-width: 1px;
  border-color: #00000037;
  color: #000000;
`;

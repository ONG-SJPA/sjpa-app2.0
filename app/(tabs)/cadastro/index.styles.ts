import { Avatar, AvatarTextProps } from "react-native-paper";
import styled from "styled-components/native";

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

export const AvatarTextSection = styled(Avatar.Text)<AvatarTextProps>`
  border-width: 1px;
  border-color: #00000037;
  background-color: #5fc2bf;
  color: #000000;
`;

import { Avatar, AvatarImageProps } from "react-native-paper";
import styled from "styled-components/native";

export const ViewListBay = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ViewListItem = styled.View`
  width: 90%;
  margin: 10px;
  border-radius: 10px;
`;

export const AvatarImage = styled(Avatar.Image)<AvatarImageProps>`
  border-width: 1px;
  border-color: #00000037;
  background-color: #5fc2bf;
`;

export const ViewLoading = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
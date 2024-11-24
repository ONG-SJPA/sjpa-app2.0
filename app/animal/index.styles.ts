import { Card } from "react-native-paper";
import styled from "styled-components/native";

export const AnimalContainer = styled.View`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  padding: 10px;
`;

export const AvatarTitle = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const ContentInfo = styled.View`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
`;

export const CardContainer = styled(Card.Content)`
  background-color: #a4efad;
  border-radius: 15px 5px;
  padding: 10px;
`;

export const ViewLoading = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
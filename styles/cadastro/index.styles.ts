import { Button, Props } from "react-native-paper";
import styled from "styled-components/native";

export const StyledMainContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  flex-direction: row;
`;

export const StyledSectorButton = styled(Button)<Props>`
  background-color: #25bf22;
  width: 110px;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledTextButton = styled.Text`
  color: white;
  font-size: 25px;
`;

export const StyledTitle = styled.Text`
  font-size: 30px;
  font-weight: bold;
`;

export const StyledTitleContainer = styled.View`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  gap: 10px;
`;

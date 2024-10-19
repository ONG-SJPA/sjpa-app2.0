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

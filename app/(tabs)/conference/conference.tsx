import CommonLayout from "@/components/Layout/CommonLayout";
import { View } from "react-native";
import { useCallback, useState } from "react";
import { CheckDTO } from "@/types/dto/check/CheckDTO";
import { createCheck, getChecks } from "@/repository/check.repository";
import CheckCard from "../../../components/CheckCard";
import * as S from "./index.styles";
import { Dialog, Text, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useFocusEffect } from "@react-navigation/native";

export default function ConferenceScreen() {
  const [checks, setChecks] = useState<CheckDTO[]>([]);
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  useFocusEffect(
    useCallback(() => {
      getChecks().then((checks) => {
        setChecks(checks);
      });
    }, []),
  );

  return (
    <CommonLayout>
      <S.ViewScrollView>
        <S.ViewButton
          labelStyle={{
            color: "#000000",
            fontSize: 16,
            fontWeight: "bold",
          }}
          icon={() => (
            <Icon name="plus" size={22} /> // Tamanho definido manualmente
          )}
          onPress={showDialog}
        >
          Iniciar Nova Checagem
        </S.ViewButton>
        {checks.map((check, i) => (
          <CheckCard key={check.id} check={check} isPast={i > 0} />
        ))}
      </S.ViewScrollView>
      {visible ? (
        <S.CenteredView>
          <S.ViewShowDialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Checagem</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">
                Tem certeza que deseja iniciar uma nova checagem em{" "}
                {new Date().toLocaleDateString()}?
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={async () => {
                  hideDialog();
                }}
              >
                CANCELAR
              </Button>
              <Button
                onPress={async () => {
                  await createCheck(new Date());
                  getChecks().then((checks) => {
                    setChecks(checks);
                  });
                  hideDialog();
                }}
              >
                CONFIRMAR
              </Button>
            </Dialog.Actions>
          </S.ViewShowDialog>
        </S.CenteredView>
      ) : (
        <View></View>
      )}
    </CommonLayout>
  );
}

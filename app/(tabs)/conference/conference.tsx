import CommonLayout from "@/components/Layout/CommonLayout";
import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { CheckDTO } from "@/types/dto/check/CheckDTO";
import { createCheck, getChecks } from "@/repository/check.repository";
import CheckCard from "../../../components/CheckCard";
import {
  Button,
  Dialog,
  PaperProvider,
  Portal,
  Text,
} from "react-native-paper";

export default function ConferenceScreen() {
  const [checks, setChecks] = useState<CheckDTO[]>([]);
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  useEffect(() => {
    getChecks().then((checks) => {
      setChecks(checks);
    });
  }, []);

  return (
    <CommonLayout>
      <ScrollView>
        <Button onPress={showDialog}>Iniciar Nova Checagem</Button>
        {checks.map((check, i) => (
          <CheckCard key={check.id} check={check} isPast={i > 0} />
        ))}
        <PaperProvider>
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
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
            </Dialog>
          </Portal>
        </PaperProvider>
      </ScrollView>
    </CommonLayout>
  );
}

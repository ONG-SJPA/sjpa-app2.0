import { CheckDTO } from "@/types/dto/check/CheckDTO";
import { Avatar, IconButton } from "react-native-paper";
import * as S from "../app/(tabs)/conference/index.styles";
import { useEffect, useState } from "react";
import { missingSomeCheck } from "@/repository/animal.repository";

export default function CheckCard({
  check,
  isPast,
}: {
  check: CheckDTO;
  isPast: boolean;
}) {
  const [isMissingSomeAnimal, setIsMissingSomeAnimal] = useState(false);

  useEffect(() => {
    if (isPast) {
      setIsMissingSomeAnimal(false);
    } else {
      missingSomeCheck(check.id).then((isMissingSomeAnimal) => {
        setIsMissingSomeAnimal(isMissingSomeAnimal);
      });
    }
  }, []);

  return (
    <S.ViewCardContainer
      title={check.check.toDate().toLocaleDateString()}
      subtitle={isMissingSomeAnimal ? "Pendente" : "Concluído"}
      left={(props: any) => (
        <Avatar.Icon
          {...props}
          icon={isMissingSomeAnimal ? "minus-circle" : "check"}
          color="#ffffff"
          style={{
            backgroundColor: isMissingSomeAnimal ? "#ff0000" : "#00ff00",
          }}
        />
      )}
      right={(props: any) => (
        <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
      )}
    />
  );
}

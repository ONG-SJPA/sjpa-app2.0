import CommonLayout from "@/components/Layout/CommonLayout";
import { ScrollView } from "react-native";
import { Avatar, IconButton } from "react-native-paper";
import * as S from "./index.styles";

export default function ConferenceScreen() {
  return (
    <CommonLayout>
      <ScrollView>
        <S.ViewCardContainer
          title="22/10/2024"
          subtitle="Não iniciado"
          left={(props: any) => (
            <Avatar.Icon
              {...props}
              icon="minus-circle"
              color="#ffffff"
              style={{
                backgroundColor: "#ff0000",
              }}
            />
          )}
          right={(props: any) => (
            <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
          )}
        />
        <S.ViewCardContainer
          title="21/10/2024"
          subtitle="Em progresso"
          left={(props: any) => (
            <Avatar.Icon
              {...props}
              icon="progress-clock"
              color="#ffffff"
              style={{
                backgroundColor: "#ff8400",
              }}
            />
          )}
          right={(props: any) => (
            <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
          )}
        />
        <S.ViewCardContainer
          title="20/10/2024"
          subtitle="Concluído"
          left={(props: any) => (
            <Avatar.Icon
              {...props}
              icon="check"
              color="#ffffff"
              style={{
                backgroundColor: "#0cdb0c",
              }}
            />
          )}
          right={(props: any) => (
            <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
          )}
        />
        <S.ViewCardContainer
          title="19/10/2024"
          subtitle="Concluído"
          left={(props: any) => (
            <Avatar.Icon
              {...props}
              icon="check"
              color="#ffffff"
              style={{
                backgroundColor: "#0cdb0c",
              }}
            />
          )}
          right={(props: any) => (
            <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
          )}
        />
        <S.ViewCardContainer
          title="18/10/2024"
          subtitle="Concluído"
          left={(props: any) => (
            <Avatar.Icon
              {...props}
              icon="check"
              color="#ffffff"
              style={{
                backgroundColor: "#0cdb0c",
              }}
            />
          )}
          right={(props: any) => (
            <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
          )}
        />
        <S.ViewCardContainer
          title="17/10/2024"
          subtitle="Concluído"
          left={(props: any) => (
            <Avatar.Icon
              {...props}
              icon="check"
              color="#ffffff"
              style={{
                backgroundColor: "#0cdb0c",
              }}
            />
          )}
          right={(props: any) => (
            <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
          )}
        />
        <S.ViewCardContainer
          title="17/10/2024"
          subtitle="Concluído"
          left={(props: any) => (
            <Avatar.Icon
              {...props}
              icon="check"
              color="#ffffff"
              style={{
                backgroundColor: "#0cdb0c",
              }}
            />
          )}
          right={(props: any) => (
            <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
          )}
        />
        <S.ViewCardContainer
          title="17/10/2024"
          subtitle="Concluído"
          left={(props: any) => (
            <Avatar.Icon
              {...props}
              icon="check"
              color="#ffffff"
              style={{
                backgroundColor: "#0cdb0c",
              }}
            />
          )}
          right={(props: any) => (
            <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
          )}
        />
        <S.ViewCardContainer
          title="17/10/2024"
          subtitle="Concluído"
          left={(props: any) => (
            <Avatar.Icon
              {...props}
              icon="check"
              color="#ffffff"
              style={{
                backgroundColor: "#0cdb0c",
              }}
            />
          )}
          right={(props: any) => (
            <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
          )}
        />
        <S.ViewCardContainer
          title="17/10/2024"
          subtitle="Concluído"
          left={(props: any) => (
            <Avatar.Icon
              {...props}
              icon="check"
              color="#ffffff"
              style={{
                backgroundColor: "#0cdb0c",
              }}
            />
          )}
          right={(props: any) => (
            <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
          )}
        />
        <S.ViewCardContainer
          title="17/10/2024"
          subtitle="Concluído"
          left={(props: any) => (
            <Avatar.Icon
              {...props}
              icon="check"
              color="#ffffff"
              style={{
                backgroundColor: "#0cdb0c",
              }}
            />
          )}
          right={(props: any) => (
            <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
          )}
        />
        <S.ViewCardContainer
          title="17/10/2024"
          subtitle="Concluído"
          left={(props: any) => (
            <Avatar.Icon
              {...props}
              icon="check"
              color="#ffffff"
              style={{
                backgroundColor: "#0cdb0c",
              }}
            />
          )}
          right={(props: any) => (
            <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
          )}
        />
      </ScrollView>
    </CommonLayout>
  );
}

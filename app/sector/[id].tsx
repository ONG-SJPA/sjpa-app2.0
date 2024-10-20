// app/detail/[id].tsx
import React from "react";
import { Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSectorPage } from "./hooks/useSectorPage";
import * as S from "@/app/(tabs)/cadastro/index.styles";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AnimalType } from "@/types/enum/animal/AnimalTypeEnum";
import CardItemSector from "@/components/card";
import { TouchableOpacity } from "react-native-gesture-handler";

const SectorPage = () => {
  const params = useLocalSearchParams<{ id: string }>(); // Usando useSearchParams com TypeScript
  const { id } = params;

  const { sector } = useSectorPage({ sectorCode: id });

  return (
    <SafeAreaView
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <S.ViewList>
        {sector ? (
          sector.baias.map((x) => {
            const pathImage =
              x.tipo === AnimalType.Dog
                ? require("./../../assets/images/dog.jpg")
                : require("./../../assets/images/cat.jpg");
            return (
              <S.ViewListSector key={x.numeroBaia}>
                <TouchableOpacity
                  key={x.numeroBaia}
                  onPress={() => router.push(`/baia/${x.numeroBaia}`)}
                >
                  <CardItemSector baia={x} pathImage={pathImage} />
                </TouchableOpacity>
              </S.ViewListSector>

              // <View key={x.numeroBaia}>
              //   <Card.Title
              //     title={`Baia ${x.numeroBaia}`}
              //     subtitle={`Quantidade de animais: ${x.animais.length} ${
              //       AnimalType[
              //         x.tipo.toString().split(".")[0] as keyof typeof AnimalType
              //       ]
              //     }(s)`}
              //     left={(props) => <Avatar.Image {...props} source={pathImage} />}
              //     // right={(props) => (
              //     //   <Link href={`/baia/${x.numeroBaia}`} asChild>
              //     //     <IconButton
              //     //       {...props}
              //     //       icon="dots-vertical"
              //     //       onPress={() => {}}
              //     //     />
              //     //   </Link>
              //     // )}
              //   />
              // </View>
            );
          })
        ) : (
          <View>
            <Text>Setor não encontrado</Text>
          </View>
        )}
      </S.ViewList>
    </SafeAreaView>
  );
};

export default SectorPage;

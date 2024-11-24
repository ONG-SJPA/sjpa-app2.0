import { getBaiaById } from "@/repository/baia.repository";
import { useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { UseFormSetValue } from "react-hook-form";
import { FormData } from "./types";
import { useFocusEffect } from "@react-navigation/native";

interface OwnProps {
  setValue: UseFormSetValue<FormData>;
}

export const useEditBaiaPage = ({ setValue }: OwnProps) => {
  const params = useLocalSearchParams<{ id: string }>();
  const { id } = params;

  useFocusEffect(
    useCallback(() => {
      async function fetchBaia() {
        const baia = await getBaiaById(id);

        if (!baia) {
          return;
        }

        setValue("numeroBaia", baia?.numeroBaia ?? "");
        setValue("tipo", baia?.tipo ?? "");
        setValue("observacao", baia?.observacao ?? "");
        setValue("id", baia?.id ?? "");
      }
      fetchBaia();
    }, []),
  );
};

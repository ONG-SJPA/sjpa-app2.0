import { getBaiaById } from "@/repository/baia.repository";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";
import { FormData } from "./types";

interface OwnProps {
  setValue: UseFormSetValue<FormData>;
}

export const useEditBaiaPage = ({ setValue }: OwnProps) => {
  const params = useLocalSearchParams<{ id: string }>();
  const { id } = params;

  useEffect(() => {
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
  }, []);
};

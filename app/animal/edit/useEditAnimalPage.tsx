import { getBaiaById } from "@/repository/baia.repository";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { FormData } from "./types";
import { getAnimalById } from "@/repository/animal.repository";
import { AnimalDTO } from "@/types/dto/animal/AnimalDTO";

interface OwnProps {
  setValue: UseFormSetValue<FormData>;
}

export const useEditAnimalPage = ({ setValue }: OwnProps) => {
  const params = useLocalSearchParams<{ id: string }>();
  const { id } = params;

  useEffect(() => {
    async function fetchBaia() {
      const animal = await getAnimalById(id);

      if (!animal) {
        throw new Error("Animal não encontrado");
      }

      setValue("nome", animal.nome);
      setValue("idade", animal.idade);
      setValue("tipo", animal.tipo);
      setValue("raca", animal.raca);
      setValue("observacao", animal.observacao);
    }
    fetchBaia();
  }, []);
};

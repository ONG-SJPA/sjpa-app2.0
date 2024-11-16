import { SectorDTO } from "@/types/dto/setor/SectorDTO";
import { useCallback, useEffect, useState } from "react";
import data from "@/mockData/data.json";
import { getBaiaById } from "@/repository/baia.repository";
import { AnimalDTO } from "@/types/dto/animal/AnimalDTO";
import { getAnimalsByBaiaId } from "@/repository/animal.repository";
import { BaiaDTO } from "@/types/dto/baia/BaiaDTO";
import { useFocusEffect } from "@react-navigation/native";

interface OwnProps {
  baiaId: string;
}

export const useBaiaPage = ({ baiaId }: OwnProps) => {
  const [baia, setBaia] = useState<BaiaDTO | null>(null);
  const [animais, setAnimais] = useState<AnimalDTO[]>([]);

  const fetchBaia = useCallback(async () => {
    const baiaData = await getBaiaById(baiaId);
    const animais = await getAnimalsByBaiaId(baiaId);
    setBaia(baiaData);
    setAnimais(animais);
  }, [baiaId]);

  useFocusEffect(
    useCallback(() => {
      fetchBaia();
      return () => {
        console.log("Saindo da rota");
      };
    }, [fetchBaia]),
  );

  // useEffect(() => {
  //   async function fetchBaia() {
  //     const baiaData = await getBaiaById(baiaId);
  //     const animais = await getAnimalsByBaiaId(baiaId);
  //     setBaia(baiaData);
  //     setAnimais(animais);
  //   }
  //   fetchBaia();
  // }, []);

  return { baia, animais };
};

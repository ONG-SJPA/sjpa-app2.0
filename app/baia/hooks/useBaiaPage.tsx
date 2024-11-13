import { SectorDTO } from "@/types/dto/setor/SectorDTO";
import { useEffect, useState } from "react";
import data from "@/mockData/data.json";
import { BaiaDTO } from "@/types/dto/animais/BaiaDTO";
import { getBaiaById } from "@/repository/baia.repository";
import { AnimalDTO } from "@/types/dto/animal/AnimalDTO";
import { getAnimalsByBaiaId } from "@/repository/animal.repository";

interface OwnProps {
  baiaId: string;
}

export const useBaiaPage = ({ baiaId }: OwnProps) => {
  const [baia, setBaia] = useState<BaiaDTO | null>(null);
  const [animais, setAnimais] = useState<AnimalDTO[]>([]);

  useEffect(() => {
    async function fetchBaia() {
      const baiaData = await getBaiaById(baiaId);
      const animais = await getAnimalsByBaiaId(baiaId);
      setBaia(baiaData);
      setAnimais(animais);
    }
    fetchBaia();
  }, []);

  return { baia, animais };
};

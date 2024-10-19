import { SectorDTO } from "@/types/dto/animais/SectorDTO";
import { useEffect, useState } from "react";
import data from "@/mockData/data.json";

export const useCadastroPage = () => {
  const [sectors, setSectors] = useState<SectorDTO[]>([]);

  useEffect(() => {
    const sctors = data.canil.setores as SectorDTO[];
    setSectors(sctors);
  }, []);

  return { sectors };
};

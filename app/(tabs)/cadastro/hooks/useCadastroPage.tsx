import firebase from "@/firebase/initializer";
import { getAllSectors } from "@/repository/setor.repository";
import { SectorDTO } from "@/types/dto/setor/SectorDTO";
import { useEffect, useState } from "react";

export const useCadastroPage = () => {
  const [sectors, setSectors] = useState<SectorDTO[]>([]);

  useEffect(() => {
    async function fetchSector() {
      const sectors = await getAllSectors();
      console.log(sectors);
      setSectors(sectors ?? []);
    }
    fetchSector();
  }, []);

  return { sectors };
};

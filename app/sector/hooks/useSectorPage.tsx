import { SectorDTO } from "@/types/dto/animais/SectorDTO";
import { useEffect, useState } from "react";
import data from "@/mockData/data.json";

interface OwnProps {
  sectorCode: string;
}

export const useSectorPage = ({ sectorCode }: OwnProps) => {
  const [sector, setSector] = useState<SectorDTO | null>(null);

  useEffect(() => {
    const sctors = data.canil.setores as SectorDTO[];
    const sectorData: SectorDTO | null =
      sctors.find((s) => s.setor === sectorCode) ?? null;
    setSector(sectorData);
  }, []);

  return { sector };
};

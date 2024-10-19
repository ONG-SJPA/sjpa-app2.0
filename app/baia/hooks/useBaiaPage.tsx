import { SectorDTO } from "@/types/dto/animais/SectorDTO";
import { useEffect, useState } from "react";
import data from "@/mockData/data.json";
import { BaiaDTO } from "@/types/dto/animais/CanilDTO";

interface OwnProps {
  baiaId: number;
  sectorCode: string;
}

export const useBaiaPage = ({ baiaId, sectorCode }: OwnProps) => {
  const [baia, setBaia] = useState<BaiaDTO | null>(null);

  useEffect(() => {
    const sctors = data.canil.setores as SectorDTO[];
    const sectorData: SectorDTO | null =
      sctors.find((s) => s.setor === sectorCode) ?? null;
    const baiaData: BaiaDTO | null =
      sectorData?.baias.find((b) => b.numeroBaia === baiaId) ?? null;
    setBaia(baiaData);
  }, []);

  return { baia };
};

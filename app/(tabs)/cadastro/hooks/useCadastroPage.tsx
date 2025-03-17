import { getAllSectors } from "@/repository/setor.repository";
import { SectorDTO } from "@/types/dto/setor/SectorDTO";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";

export const useCadastroPage = () => {
  const [sectors, setSectors] = useState<SectorDTO[]>([]);

  const minhaFuncao = useCallback(async () => {
    const sectors = await getAllSectors();
    setSectors(sectors ?? []);
  }, []); // As dependências precisam estar corretas para evitar chamadas extras.

  useFocusEffect(
    useCallback(() => {
      minhaFuncao();
      // Retorno opcional para cleanup quando a tela perde o foco
      return;
    }, [minhaFuncao]),
  );

  // useEffect(() => {
  //   async function fetchSector() {
  //     const sectors = await getAllSectors();
  //     setSectors(sectors ?? []);
  //   }

  //   fetchSector();
  // }, []);

  return { sectors };
};

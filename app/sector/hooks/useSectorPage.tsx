import { getBaiasByIdSetor } from "@/repository/baia.repository";
import { getSectorByCode } from "@/repository/setor.repository";
import { BaiaDTO } from "@/types/dto/baia/BaiaDTO";
import { SectorDTO } from "@/types/dto/setor/SectorDTO";
import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";

export const useSectorPage = () => {
  const params = useLocalSearchParams<{ name: string }>();
  const { name } = params;

  const [sector, setSector] = useState<SectorDTO | null>(null);
  const [baias, setBaias] = useState<BaiaDTO[]>([]);

  const fetchSector = useCallback(async () => {
    const sector = await getSectorByCode(name);
    setSector(sector ?? null);

    const baias = await getBaiasByIdSetor(sector?.id ?? "");
    setBaias(baias);
  }, [name]);

  useFocusEffect(
    useCallback(() => {
      fetchSector();
      return;
    }, [fetchSector]),
  );

  // useEffect(() => {
  //   async function fetchSector() {
  //     const sector = await getSectorByCode(id);
  //     setSector(sector ?? null);

  //     const baias = await getBaiasByIdSetor(sector?.id ?? "");
  //     setBaias(baias);
  //   }
  //   fetchSector();
  // }, []);

  return { sector, baias };
};

import { getSectorByCode } from "@/repository/setor.repository";
import { SectorDTO } from "@/types/dto/setor/SectorDTO";
import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";

export const useEditSectorsPage = () => {
  const params = useLocalSearchParams<{ id: string }>();
  const { id } = params;

  const [sector, setSector] = useState<SectorDTO | null>(null);

  useFocusEffect(
    useCallback(() => {
      async function fetchSector() {
        const sector = await getSectorByCode(id);
        setSector(sector ?? null);
      }
      fetchSector();
    }, []),
  );

  return { sector };
};

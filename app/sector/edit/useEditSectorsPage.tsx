import { getSectorByCode } from "@/repository/setor.repository";
import { SectorDTO } from "@/types/dto/setor/SectorDTO";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export const useEditSectorsPage = () => {
  const params = useLocalSearchParams<{ name: string }>();
  const { name } = params;

  const [sector, setSector] = useState<SectorDTO | null>(null);

  useEffect(() => {
    async function fetchSector() {
      const sector = await getSectorByCode(name);
      setSector(sector ?? null);
    }
    fetchSector();
  }, []);

  return { sector };
};

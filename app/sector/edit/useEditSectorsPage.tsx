import { getSectorByCode } from "@/repository/setor.repository";
import { SectorDTO } from "@/types/dto/setor/SectorDTO";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export const useEditSectorsPage = () => {
  const params = useLocalSearchParams<{ id: string }>();
  const { id } = params;

  const [sector, setSector] = useState<SectorDTO | null>(null);

  console.log("id", id);
  useEffect(() => {
    async function fetchSector() {
      const sector = await getSectorByCode(id);
      setSector(sector ?? null);
    }
    fetchSector();
  }, []);

  return { sector };
};

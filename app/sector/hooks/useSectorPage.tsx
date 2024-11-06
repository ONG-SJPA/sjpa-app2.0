import { useEffect, useState } from "react";
import data from "@/mockData/data.json";
import { SectorDTO } from "@/types/dto2/sector/SectorDTO";
import { get, ref } from "firebase/database";
import database from "@/firebase/realtimeDatabase";

interface OwnProps {
  sectorCode: string;
}

export const useSectorPage = ({ sectorCode }: OwnProps) => {
  const [sector, setSector] = useState<SectorDTO | null>(null);

  useEffect(() => {
    const sectorsRef = ref(database, "sectors");
    get(sectorsRef).then((snapshot) => {
      if (snapshot.exists()) {
        const sectorData = snapshot.val();
        const sector = sectorData[sectorCode];
        setSector(sector);
      }
    });
  }, []);

  return { sector };
};

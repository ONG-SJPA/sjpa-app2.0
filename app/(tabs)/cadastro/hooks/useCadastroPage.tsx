import database from "@/firebase/realtimeDatabase";
import { SectorDTO } from "@/types/dto2/sector/SectorDTO";
import { off, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

export const useCadastroPage = () => {
  const [sectors, setSectors] = useState<SectorDTO[]>([]);
  const sectorsRef = ref(database, "sectors");

  useEffect(() => {
    const listener = onValue(sectorsRef, (snapshot) => {
      if (snapshot.exists()) {
        const sectors: SectorDTO[] = [];
        snapshot.forEach((child) => {
          sectors.push({
            code: child.key,
            description: child.child("description").val(),
            numberOfBays: child.child("bays").exists()
              ? Object.values(child.child("bays").val()).length
              : 0,
          });
        });
        setSectors(sectors);
      }
    });

    // Limpe o listener quando o componente for desmontado
    return () => off(sectorsRef, "value", listener);
  }, []);

  return { sectors }; // Retorne isLoading para controlar a renderização
};

import database from "@/firebase/realtimeDatabase";
import { CreateSectorDTO } from "@/types/dto2/sector/CreateSectorDTO";
import { get, ref, set } from "firebase/database";

const key = "sectors";

export const CreateSector = (createDto: CreateSectorDTO) => {
  const sectorRef = ref(database, `${key}/${createDto.letter}`);
  set(sectorRef, "-");
};

export const GetSectors = async () => {
  const sectorRef = ref(database, key);

  const snapshot = await get(sectorRef);

  if (snapshot.exists()) {
    return snapshot.child;
  }

  return null;
};

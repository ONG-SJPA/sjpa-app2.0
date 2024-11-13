import firebase from "@/firebase/initializer";
import { SectorCreateDTO } from "@/types/dto/setor/SectorCreateDTO";
import { SectorDTO } from "@/types/dto/setor/SectorDTO";
import { SectorEditDTO } from "@/types/dto/setor/SectorEditDTO";

export async function getAllSectors(): Promise<SectorDTO[]> {
  const sectors = await firebase
    .firestore()
    .collection("setores")
    .orderBy("nome", "asc")
    .get();
  return sectors.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    } as SectorDTO;
  });
}

export async function getSectorByCode(
  sectorCode: string,
): Promise<SectorDTO | null> {
  const sectors = await firebase
    .firestore()
    .collection("setores")
    .where("nome", "==", sectorCode)
    .limit(1)
    .get();
  const sectorData = sectors.docs
    .map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      } as SectorDTO;
    })
    .find(() => true);
  return sectorData ?? null;
}

export async function createSector(sector: SectorCreateDTO): Promise<void> {
  await firebase
    .firestore()
    .collection("setores")
    .add({
      ...sector,
      animais: [],
      baias: [],
    });
}

export async function updateSector(sector: SectorEditDTO): Promise<void> {
  const existingSector = await getSectorByCode(sector.nome);

  await firebase
    .firestore()
    .collection("setores")
    .doc(existingSector?.id)
    .update({
      ...existingSector,
      ...sector,
    });
}

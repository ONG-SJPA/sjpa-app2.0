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

  const lastCheck = await firebase
    .firestore()
    .collection("checks")
    .orderBy("check", "desc")
    .limit(1)
    .get();

  const allAnimals = await firebase.firestore().collection("animais").get();

  return sectors.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
      missingCheck:
        lastCheck.docs.length > 0
          ? allAnimals.docs.some(
              (animal) =>
                animal.data().idSetor === doc.id &&
                animal.data().lastCheck !== lastCheck.docs[0].id,
            )
          : false,
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

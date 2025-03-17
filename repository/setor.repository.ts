import { db } from "@/firebase/initializer";
import { SectorCreateDTO } from "@/types/dto/setor/SectorCreateDTO";
import { SectorDTO } from "@/types/dto/setor/SectorDTO";
import { SectorEditDTO } from "@/types/dto/setor/SectorEditDTO";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";

export async function getAllSectors(): Promise<SectorDTO[]> {
  const sectorsCollection = collection(db, "setores");
  const sectorsQuery = query(sectorsCollection, orderBy("nome", "asc"));
  const sectors = await getDocs(sectorsQuery);

  const checksCollection = collection(db, "checks");
  const lastCheckQuery = query(
    checksCollection,
    orderBy("check", "desc"),
    limit(1),
  );
  const lastCheck = await getDocs(lastCheckQuery);

  const allAnimalsCollection = collection(db, "animais");
  const allAnimals = await getDocs(allAnimalsCollection);

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
  const sectorsCollection = collection(db, "setores");
  const sectorsQuery = query(
    sectorsCollection,
    where("nome", "==", sectorCode),
    limit(1),
  );
  const sectors = await getDocs(sectorsQuery);

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

export async function getSectorById(id: string): Promise<SectorDTO | null> {
  const sectorDoc = doc(db, "setores", id);
  const sector = await getDoc(sectorDoc);
  const sectorData = {
    id: sector.id,
    ...sector.data(),
  } as SectorDTO;
  return sectorData ?? null;
}

export async function createSector(sector: SectorCreateDTO): Promise<void> {
  await addDoc(collection(db, "setores"), {
    ...sector,
    animais: [],
    baias: [],
  });
}

export async function updateSector(sector: SectorEditDTO): Promise<void> {
  const existingSector = await getSectorByCode(sector.nome);

  if (existingSector) {
    const sectorDoc = doc(db, "setores", existingSector.id);
    await updateDoc(sectorDoc, {
      ...existingSector,
      ...sector,
    });
  }
}

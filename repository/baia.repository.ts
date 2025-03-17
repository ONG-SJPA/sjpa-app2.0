import { db } from "@/firebase/initializer";
import { BaiaDTO } from "@/types/dto/baia/BaiaDTO";
import { BaiaCreateDTO } from "@/types/dto/baia/BaiaCreateDTO";
import { BaiaEditDTO } from "@/types/dto/baia/BaiaEditDTO";
import { getSectorByCode } from "./setor.repository";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  orderBy,
  limit,
  arrayUnion,
  FieldValue,
  getDoc,
} from "firebase/firestore";

export async function getBaiasByIdSetor(idSetor: string): Promise<BaiaDTO[]> {
  const baiasCollection = collection(db, "baias");
  const baiasQuery = query(baiasCollection, orderBy("numeroBaia", "asc"));
  const baias = await getDocs(baiasQuery);

  const checksCollection = collection(db, "checks");
  const lastCheckQuery = query(
    checksCollection,
    orderBy("check", "desc"),
    limit(1),
  );
  const lastCheck = await getDocs(lastCheckQuery);

  const animaisCollection = collection(db, "animais");
  const allAnimalsQuery = query(
    animaisCollection,
    where("idSetor", "==", idSetor),
  );
  const allAnimals = await getDocs(allAnimalsQuery);

  return baias.docs
    .map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
        missingCheck:
          lastCheck.docs.length > 0
            ? allAnimals.docs.some(
                (animal) =>
                  animal.data().idBaia === doc.id &&
                  animal.data().lastCheck !== lastCheck.docs[0].id,
              )
            : false,
      } as BaiaDTO;
    })
    .filter((baia) => baia.idSetor === idSetor);
}

export async function getBaiaById(id: string): Promise<BaiaDTO | null> {
  const baiaDoc = doc(db, "baias", id);
  const baia = await getDoc(baiaDoc);
  return baia.exists()
    ? ({
        id: baia.id,
        ...baia.data(),
      } as BaiaDTO)
    : null;
}

export async function createBaia(baia: BaiaCreateDTO): Promise<void> {
  const sector = await getSectorByCode(baia.setorCode);

  if (!sector) {
    throw new Error("Setor não encontrado");
  }

  const createdBaiaRef = await addDoc(collection(db, "baias"), {
    tipo: baia.tipo,
    numeroBaia: baia.numeroBaia,
    observacao: baia.observacao,
    idSetor: sector.id,
    animais: [],
  });

  const setorRef = doc(db, "setores", sector.id);

  await updateDoc(setorRef, {
    baias: arrayUnion(createdBaiaRef),
  });
}

export async function updateBaia(baia: BaiaEditDTO): Promise<void> {
  const baiaRef = doc(db, "baias", baia.id);
  await updateDoc(baiaRef, {
    ...baia,
  });
}

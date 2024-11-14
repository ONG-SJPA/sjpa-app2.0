import firebase from "@/firebase/initializer";
import { BaiaDTO } from "@/types/dto/baia/BaiaDTO";
import { BaiaCreateDTO } from "@/types/dto/baia/BaiaCreateDTO";
import { BaiaEditDTO } from "@/types/dto/baia/BaiaEditDTO";
import { getSectorByCode } from "./setor.repository";

export async function getBaiasByIdSetor(idSetor: string): Promise<BaiaDTO[]> {
  const baias = await firebase.firestore().collection("baias").get();
  return baias.docs
    .map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      } as BaiaDTO;
    })
    .filter((baia) => baia.idSetor === idSetor);
}

export async function getBaiaById(id: string): Promise<BaiaDTO | null> {
  const baia = await firebase.firestore().collection("baias").doc(id).get();
  return baia.exists
    ? ({
        id: baia.id,
        ...baia.data(),
      } as BaiaDTO)
    : null;
}

export async function createBaia(baia: BaiaCreateDTO): Promise<void> {
  const firestore = firebase.firestore();

  const sector = await getSectorByCode(baia.setorCode);

  if (!sector) {
    throw new Error("Setor não encontrado");
  }

  const createdBaiaRef = await firestore.collection("baias").add({
    tipo: baia.tipo,
    numeroBaia: baia.numeroBaia,
    observacao: baia.observacao,
    idSetor: sector.id,
    animais: [],
  });

  const setorRef = firestore.collection("setores").doc(sector.id);

  await setorRef.update({
    baias: firebase.firestore.FieldValue.arrayUnion(createdBaiaRef),
  });
}

export async function updateBaia(baia: BaiaEditDTO): Promise<void> {
  await firebase.firestore().collection("baias").doc(baia.id).update(baia);
}

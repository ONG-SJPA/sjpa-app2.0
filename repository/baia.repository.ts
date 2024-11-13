import firebase from "@/firebase/initializer";
import { BaiaDTO } from "@/types/dto/animais/BaiaDTO";

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

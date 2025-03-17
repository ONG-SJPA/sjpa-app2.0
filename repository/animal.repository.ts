import { db } from "@/firebase/initializer";
import { AnimalCreateDTO } from "@/types/dto/animal/AnimalCreateDTO";
import { AnimalDTO } from "@/types/dto/animal/AnimalDTO";
import { getBaiaById } from "./baia.repository";
import { AnimalEditDTO } from "@/types/dto/animal/AnimalEditDTO";
import { AnimalDeleteDTO } from "@/types/dto/animal/AnimalDeleteDto";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  limit,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

export async function missingSomeCheck(idCheck: string): Promise<boolean> {
  const animaisCollection = collection(db, "animais");

  const q1 = query(animaisCollection, where("lastCheck", "!=", idCheck));
  const animals = await getDocs(q1);

  const q2 = query(animaisCollection, where("lastCheck", "==", ""));
  const animalsWithNullCheck = await getDocs(q2);

  animals.docs.push(...animalsWithNullCheck.docs);

  return animals.docs.length > 0;
}

export async function getAnimalsByBaiaId(idBaia: string): Promise<AnimalDTO[]> {
  const animaisCollection = collection(db, "animais");
  const animals = await getDocs(animaisCollection);

  return animals.docs
    .map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      } as AnimalDTO;
    })
    .filter((animal) => animal.idBaia === idBaia);
}

export async function getAnimalById(id: string): Promise<AnimalDTO | null> {
  const animaisCollection = collection(db, "animais");
  const animals = await getDocs(animaisCollection);

  const animalData = animals.docs
    .map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      } as AnimalDTO;
    })
    .find((animal) => animal.id === id);

  return animalData ?? null;
}

export async function createAnimal(animal: AnimalCreateDTO): Promise<void> {
  const baia = await getBaiaById(animal.idBaia);

  if (!baia) {
    throw new Error("Baia não encontrada");
  }

  const createdAnimalRef = await addDoc(collection(db, "animais"), {
    nome: animal.nome,
    idade: animal.idade,
    tipo: animal.tipo,
    raca: animal.raca,
    observacao: animal.observacao,
    idBaia: baia.id,
    idSetor: baia.idSetor,
    lastCheck: "",
  });

  const baiaRef = doc(db, "baias", baia.id);

  await updateDoc(baiaRef, {
    animais: arrayUnion(createdAnimalRef),
  });
}

export async function updateAnimal(animal: AnimalEditDTO): Promise<void> {
  const animalRef = doc(db, "animais", animal.id);

  await updateDoc(animalRef, {
    nome: animal.nome,
    idade: animal.idade,
    tipo: animal.tipo,
    raca: animal.raca,
    observacao: animal.observacao,
  });
}

export async function deleteAnimal(animal: AnimalDeleteDTO): Promise<void> {
  const baia = await getBaiaById(animal.idBaia);

  const animalRef = doc(db, "animais", animal.id);
  await deleteDoc(animalRef);

  if (!baia) {
    throw new Error("Baia não encontrada");
  }

  const baiaRef = doc(db, "baias", baia?.id);

  await updateDoc(baiaRef, {
    animais: arrayRemove(animalRef),
  });
}

export const checkAnimal = async (idAnimal: string, check: boolean) => {
  const animalRef = doc(db, "animais", idAnimal);

  const checksCollection = collection(db, "checks");
  const q = query(checksCollection, orderBy("check", "desc"), limit(1));
  const lastCheck = await getDocs(q);

  if (lastCheck.docs.length === 0) {
    throw new Error("Nenhum check encontrado");
  }

  await updateDoc(animalRef, {
    lastCheck: check ? lastCheck.docs[0].id : "",
  });
};

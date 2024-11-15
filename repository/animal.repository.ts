import firebase from "@/firebase/initializer";
import { AnimalCreateDTO } from "@/types/dto/animal/AnimalCreateDTO";
import { AnimalDTO } from "@/types/dto/animal/AnimalDTO";
import { getBaiaById } from "./baia.repository";
import { AnimalEditDTO } from "@/types/dto/animal/AnimalEditDTO";

export async function getAnimalsByBaiaId(idBaia: string): Promise<AnimalDTO[]> {
  const animals = await firebase.firestore().collection("animais").get();
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
  const animals = await firebase.firestore().collection("animais").get();
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

  const createdAnimalRef = await firebase
    .firestore()
    .collection("animais")
    .add({
      nome: animal.nome,
      idade: animal.idade,
      tipo: animal.tipo,
      raca: animal.raca,
      observacao: animal.observacao,
      idBaia: baia.id,
      idSetor: baia.idSetor,
    });

  const baiaRef = firebase.firestore().collection("baias").doc(baia.id);

  await baiaRef.update({
    animais: firebase.firestore.FieldValue.arrayUnion(createdAnimalRef),
  });
}

export async function updateAnimal(animal: AnimalEditDTO): Promise<void> {
  const animalRef = firebase.firestore().collection("animais").doc(animal.id);

  await animalRef.update({
    nome: animal.nome,
    idade: animal.idade,
    tipo: animal.tipo,
    raca: animal.raca,
    observacao: animal.observacao,
  });
}

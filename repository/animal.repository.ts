import firebase from "@/firebase/initializer";
import { AnimalDTO } from "@/types/dto/animal/AnimalDTO";

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

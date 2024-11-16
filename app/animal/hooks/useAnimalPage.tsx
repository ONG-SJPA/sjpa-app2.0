import { getAnimalById } from "@/repository/animal.repository";
import { AnimalDTO } from "@/types/dto/animal/AnimalDTO";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";

export const useAnimalPage = () => {
  const params = useLocalSearchParams<{ id: string }>();
  const { id } = params;
  const [animal, setAnimal] = useState<AnimalDTO | null>(null);

  const fetchAnimal = useCallback(async () => {
    const animal = await getAnimalById(id);
    setAnimal(animal);
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      fetchAnimal();
      return () => {
        console.log("Saindo da rota");
      };
    }, [fetchAnimal]),
  );

  // useEffect(() => {
  //   async function fetchAnimal() {
  //     const animal = await getAnimalById(id);

  //     setAnimal(animal);
  //   }
  //   fetchAnimal();
  // }, []);

  return { animal };
};

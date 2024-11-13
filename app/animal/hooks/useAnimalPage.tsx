import { getAnimalById } from "@/repository/animal.repository";
import { AnimalDTO } from "@/types/dto/animal/AnimalDTO";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export const useAnimalPage = () => {
  const params = useLocalSearchParams<{ id: string }>();
  const { id } = params;
  const [animal, setAnimal] = useState<AnimalDTO | null>(null);

  useEffect(() => {
    async function fetchSector() {
      const animal = await getAnimalById(id);

      setAnimal(animal);
    }
    fetchSector();
  }, []);

  return { animal };
};

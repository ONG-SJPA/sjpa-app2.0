import { AnimalType } from "@/types/enum/animal/AnimalTypeEnum";
import { AnimalDTO } from "./AnimalDTO";

export type BaiaDTO  = {
  numeroBaia: number;
  tipo: AnimalType;
  animais: AnimalDTO[];
}

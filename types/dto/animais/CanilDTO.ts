import { AnimalTypeEnum } from "@/types/enum/animal/AnimalTypeEnum";
import { AnimalDTO } from "./AnimalDTO";

export interface BaiaDTO {
  numeroBaia: number;
  tipo: AnimalTypeEnum;
  animais: AnimalDTO[];
}

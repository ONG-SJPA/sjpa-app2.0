import { AnimalType } from "@/types/enum/animal/AnimalTypeEnum";
import { AnimalDTO } from "./AnimalDTO";

export type BaiaDTO = {
  id: string;
  numeroBaia: number;
  tipo: AnimalType;
  animais: string[];
  observacao: string;
  idSetor: string;
};

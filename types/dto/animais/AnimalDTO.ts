import { AnimalType } from "@/types/enum/animal/AnimalTypeEnum";

export type AnimalDTO = {
  nome: string;
  // tipo: AnimalTypeEnum;
  idade: number;
  raca: string;
  observacao: string;
}

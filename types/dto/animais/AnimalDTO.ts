import { AnimalTypeEnum } from "@/types/enum/animal/AnimalTypeEnum";

export interface AnimalDTO {
  nome: string;
  // tipo: AnimalTypeEnum;
  idade: number;
  raca: string;
  observacao: string;
}

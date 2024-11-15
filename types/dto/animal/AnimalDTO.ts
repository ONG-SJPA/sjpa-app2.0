import { AnimalType } from "@/types/enum/animal/AnimalTypeEnum";

export type AnimalDTO = {
  id: string;
  nome: string;
  tipo: AnimalType;
  idade: number;
  raca: string;
  observacao: string;
  idBaia: string;
};

import { AnimalType } from "@/types/enum/animal/AnimalTypeEnum";

export interface BaiaEditDTO {
  id: string;
  numeroBaia: number;
  tipo: AnimalType;
  observacao: string;
}

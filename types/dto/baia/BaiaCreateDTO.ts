import { AnimalType } from "@/types/enum/animal/AnimalTypeEnum";

export interface BaiaCreateDTO {
  numeroBaia: number;
  tipo: AnimalType;
  setorCode: string;
  observacao: string;
}

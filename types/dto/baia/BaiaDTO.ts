import { AnimalType } from "@/types/enum/animal/AnimalTypeEnum";

export interface BaiaDTO {
  id: string;
  numeroBaia: number;
  tipo: AnimalType;
  animais: string[];
  observacao: string;
  idSetor: string;
  missingCheck: boolean;
}

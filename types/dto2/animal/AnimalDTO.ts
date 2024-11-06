import { AnimalType } from "../../enum/animal/AnimalTypeEnum";
import { SexType } from "../../enum/animal/SexTypeEnum";

export interface AnimalDTO {
  description: string;
  name: string;
  sex: SexType;
  type: AnimalType;
}

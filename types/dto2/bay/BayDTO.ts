import { AnimalType } from "@/types/enum/animal/AnimalTypeEnum";
import { AnimalDTO } from "../../dto/animais/AnimalDTO";

export interface BayDTO {
  description: string;
  animals: { [key: string]: AnimalDTO };
  bayNumber: number;
  type: AnimalType;
}

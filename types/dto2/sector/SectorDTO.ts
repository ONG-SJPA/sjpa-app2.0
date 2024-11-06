import { AnimalDTO } from "../../dto/animais/AnimalDTO";
import { BayDTO } from "../bay/BayDTO";

export interface SectorDTO {
  description: string;
  // animals: { [key: string]: AnimalDTO };
  // bays: { [key: string]: BayDTO };
  code: string;
  numberOfBays: number;
}

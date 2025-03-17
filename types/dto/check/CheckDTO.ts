import { Timestamp } from "firebase/firestore";

export interface CheckDTO {
  id: string;
  check: Timestamp;
}

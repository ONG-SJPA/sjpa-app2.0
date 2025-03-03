import firebase from "@/firebase/initializer";

export interface CheckDTO {
  id: string;
  check: firebase.firestore.Timestamp;
}

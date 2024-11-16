import firebase from "@/firebase/initializer";
import { CheckDTO } from "@/types/dto/check/CheckDTO";

export async function getChecks(): Promise<CheckDTO[]> {
  const checks = await firebase
    .firestore()
    .collection("checks")
    .orderBy("check", "desc")
    .get();

  return checks.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    } as CheckDTO;
  });
}

export async function getLastCheck(): Promise<CheckDTO | null> {
  const lastCheck = await firebase
    .firestore()
    .collection("checks")
    .orderBy("check", "desc")
    .limit(1)
    .get();

  return {
    id: lastCheck.docs[0].id,
    check: lastCheck.docs[0].data().check,
  };
}

export async function createCheck(date: Date): Promise<void> {
  const timestamp = firebase.firestore.Timestamp.fromDate(date);
  await firebase.firestore().collection("checks").add({ check: timestamp });
}

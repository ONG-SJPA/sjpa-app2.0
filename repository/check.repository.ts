import { db } from "@/firebase/initializer";
import { CheckDTO } from "@/types/dto/check/CheckDTO";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  addDoc,
  Timestamp,
} from "firebase/firestore";

export async function getChecks(): Promise<CheckDTO[]> {
  const checksCollection = collection(db, "checks");
  const checksQuery = query(checksCollection, orderBy("check", "desc"));
  const checks = await getDocs(checksQuery);

  return checks.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    } as CheckDTO;
  });
}

export async function getLastCheck(): Promise<CheckDTO | null> {
  const checksCollection = collection(db, "checks");
  const lastCheckQuery = query(
    checksCollection,
    orderBy("check", "desc"),
    limit(1),
  );
  const lastCheck = await getDocs(lastCheckQuery);

  if (lastCheck.empty) {
    return null;
  }

  return {
    id: lastCheck.docs[0].id,
    check: lastCheck.docs[0].data().check,
  };
}

export async function createCheck(date: Date): Promise<void> {
  const timestamp = Timestamp.fromDate(date);
  await addDoc(collection(db, "checks"), { check: timestamp });
}

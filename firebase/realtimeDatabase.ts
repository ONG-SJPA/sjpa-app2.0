import { getDatabase } from "firebase/database";
import app from "./initializer";

const database = getDatabase(app);

export default database;

import { loadDB, saveDB } from "../_db.js";
import { v4 as uuid } from "uuid";

export default function handler(req, res) {
  const db = loadDB();
  const token = uuid();
  db.sessions[token] = { created: Date.now() };
  saveDB(db);
  res.json({ token });
}

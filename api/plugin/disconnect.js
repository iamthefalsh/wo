import { loadDB, saveDB } from "../_db.js";

export default function handler(req, res) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const db = loadDB();
  delete db.activeProjectBySession[token];
  saveDB(db);
  res.json({ ok: true });
}

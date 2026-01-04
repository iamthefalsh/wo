import { loadDB, saveDB } from "../_db.js";

export default function handler(req, res) {
  const { sessionToken, projectId } = req.body;
  const db = loadDB();
  db.activeProjectBySession[sessionToken] = projectId;
  saveDB(db);
  res.json({ ok: true });
}

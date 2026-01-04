import { loadDB } from "../_db.js";

export default function handler(req, res) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const db = loadDB();
  const projectId = db.activeProjectBySession[token];
  res.json({
    messages: projectId ? db.projects[projectId].messages : []
  });
}

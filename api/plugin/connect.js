import { loadDB } from "../_db.js";

export default function handler(req, res) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const db = loadDB();

  const projectId = db.activeProjectBySession[token];
  if (!projectId) {
    return res.json({ status: "waiting" });
  }

  const project = db.projects[projectId];
  res.json({
    status: "connected",
    project
  });
}

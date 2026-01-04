import { loadDB, saveDB } from "../_db.js";
import { callAI } from "./_ai.js";

export default async function handler(req, res) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const { text } = req.body;

  const db = loadDB();
  const projectId = db.activeProjectBySession[token];
  if (!projectId) return res.status(401).end();

  const project = db.projects[projectId];

  // Push user message
  project.messages.push({
    role: "user",
    content: text
  });

  // SYSTEM PROMPT (CRITICAL)
  const systemPrompt = {
    role: "system",
    content: `
You are Acidnade AI, an expert Roblox developer assistant.

Rules:
- Be concise
- Prefer structured answers
- Never generate full code unless asked
- Explain before acting
- Think in steps
`
  };

  const aiMessage = await callAI([
    systemPrompt,
    ...project.messages
  ]);

  project.messages.push(aiMessage);
  saveDB(db);

  res.json({ message: aiMessage });
}

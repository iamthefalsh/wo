import { v4 as uuid } from "uuid";

const sessions = {};

/**
 * Helper to send HTML
 */
function html(res, body) {
  res.setHeader("Content-Type", "text/html");
  res.status(200).send(body);
}

/**
 * Helper to send JSON
 */
function json(res, body) {
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(body);
}

export default async function handler(req, res) {
  const { url, method } = req;

  // ==========================
  // SITE (ROOT)
  // ==========================
  if (url === "/" && method === "GET") {
    return html(
      res,
      `
<!DOCTYPE html>
<html>
<head>
  <title>Acidnade</title>
  <style>
    body {
      background:#0f0f0f;
      color:white;
      font-family:sans-serif;
      padding:40px;
    }
    button {
      background:#7cff6b;
      border:none;
      padding:10px 16px;
      border-radius:8px;
      cursor:pointer;
    }
    textarea {
      width:100%;
      height:80px;
      border-radius:8px;
      padding:8px;
    }
  </style>
</head>
<body>
  <h1>🧪 Acidnade</h1>
  <p>Status: Online</p>

  <textarea id="msg" placeholder="Say something..."></textarea><br/><br/>
  <button onclick="send()">Send</button>

  <pre id="log"></pre>

  <script>
    async function send() {
      const text = msg.value;
      const res = await fetch("/chat", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ text })
      });
      const data = await res.json();
      log.textContent += "\\nAI: " + data.reply;
    }
  </script>
</body>
</html>
`
    );
  }

  // ==========================
  // CHAT API
  // ==========================
  if (url === "/chat" && method === "POST") {
    let body = "";
    req.on("data", c => (body += c));
    req.on("end", async () => {
      const { text } = JSON.parse(body || "{}");

      // AI stub (real AI later)
      const reply = `Echo: ${text}`;

      return json(res, { reply });
    });
    return;
  }

  // ==========================
  // HEALTH
  // ==========================
  if (url === "/health") {
    return json(res, { ok: true });
  }

  // ==========================
  // 404 (FALLBACK)
  // ==========================
  res.status(404).send("Not Found");
}

const params = new URLSearchParams(location.search);
const projectId = params.get("id");

const chat = document.getElementById("chat");
const input = document.getElementById("input");

// Load conversation
async function loadConversation() {
  const res = await fetch("/api/plugin/conversation", {
    headers: {
      Authorization: "Bearer web"
    }
  });

  const data = await res.json();
  chat.innerHTML = "";

  for (const msg of data.messages || []) {
    addMessage(msg.role, msg.content);
  }
}

function addMessage(role, text) {
  const div = document.createElement("div");
  div.className = `msg ${role}`;
  div.textContent = `${role}: ${text}`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

async function send() {
  const text = input.value.trim();
  if (!text) return;

  addMessage("user", text);
  input.value = "";

  await fetch("/api/ai/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer web"
    },
    body: JSON.stringify({ text })
  });

  // Reload after AI response
  setTimeout(loadConversation, 500);
}

// Initial load
loadConversation();

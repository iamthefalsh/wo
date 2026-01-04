export async function callAI(messages) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gemini-3-flash-preview",
      messages,
      temperature: 0.6
    })
  });

  const data = await res.json();
  return data.choices[0].message;
}

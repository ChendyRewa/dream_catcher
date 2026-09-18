import OpenAI from "openai";
const openai = new OpenAI({
  baseURL: process.env.OLLAMA_BASE_URL || "http://localhost:11434/v1",
  apiKey: "ollama", // required by the SDK but ignored by Ollama
});

// Call local Ollama server (OpenAI-compatible API) for dream interpretation
export async function getDreamInterpretation(dreamText) {
  const model = process.env.OLLAMA_MODEL || "qwen2:7b";

  try {
    const message = await openai.chat.completions.create({
      model,
      max_tokens: 512,
      messages: [
        {
          role: "system",
          content:
            "You are a thoughtful dream interpreter. Be insightful but gentle, and consider common dream symbolism. Keep your interpretation to 2-3 paragraphs.",
        },
        {
          role: "user",
          content: `Dream: ${dreamText}`,
        },
      ],
    });
    return message.choices[0].message.content.trim();
  } catch (error) {
    console.error("Ollama API error:", error);
    throw new Error(`API error: ${error.message}`);
  }
}

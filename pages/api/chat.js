export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

const SYSTEM_PROMPT = `You are an expert automotive assistant.
You remember the conversation and maintain context.
You specialize in cars, modifications, performance, pricing, troubleshooting, and recommendations.
Always answer concisely and contextually.`

const MAX_MESSAGES = 15

function trimConversation(messages) {
  const firstSystem = messages.find((msg) => msg.role === "system")
  const nonSystemMessages = messages.filter((msg) => msg.role !== "system")
  const recentNonSystem = nonSystemMessages.slice(-(MAX_MESSAGES - 1))

  if (firstSystem) {
    return [firstSystem, ...recentNonSystem]
  }

  return [{ role: "system", content: SYSTEM_PROMPT }, ...nonSystemMessages.slice(-(MAX_MESSAGES - 1))]
}

export default async function handler(req, res) {
  console.log("🔥 REQUEST HIT:", new Date().toISOString(), req.body);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." })
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: "Missing OPENAI_API_KEY environment variable." })
  }

  const incomingMessages = req.body?.messages
  if (!Array.isArray(incomingMessages) || incomingMessages.length === 0) {
    return res.status(400).json({ error: "Invalid request body. 'messages' array is required." })
  }

  try {
    const sanitizedMessages = incomingMessages
      .filter((msg) => msg && typeof msg === "object")
      .map((msg) => ({
        role: msg.role,
        content: typeof msg.content === "string" ? msg.content.trim() : "",
      }))
      .filter(
        (msg) =>
          (msg.role === "system" || msg.role === "user" || msg.role === "assistant") && msg.content.length > 0
      )

    if (sanitizedMessages.length === 0) {
      return res.status(400).json({ error: "No valid messages provided." })
    }

    const preparedMessages = trimConversation(sanitizedMessages)

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: preparedMessages,
        temperature: 0.4,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("OpenAI API error:", data)
      return res.status(response.status).json({
        error: data?.error?.message || "Failed to fetch response from OpenAI.",
      })
    }

    const reply = data?.choices?.[0]?.message?.content?.trim()
    if (!reply) {
      return res.status(500).json({ error: "OpenAI returned an empty response." })
    }

    const updatedMessages = trimConversation([...preparedMessages, { role: "assistant", content: reply }])

    return res.status(200).json({ reply, messages: updatedMessages })
  } catch (error) {
    console.error("Chat API route error:", error)
    return res.status(500).json({ error: "Internal server error." })
  }
}

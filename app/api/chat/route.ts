import { generateText } from "ai"
import { getSystemPrompt } from "@/lib/ai-persona"

export async function POST(request: Request) {
  try {
    const { messages, businessName, knowledgeBase } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: "Invalid messages" }, { status: 400 })
    }

    const systemPrompt = getSystemPrompt(businessName || "FOL.AI", knowledgeBase)

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      system: systemPrompt,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    })

    return Response.json({ message: text })
  } catch (error) {
    console.error("Chat API error:", error)
    return Response.json({ error: "Pati një gabim. Ju lutem provoni përsëri." }, { status: 500 })
  }
}

import { generateText } from "ai"
import { getSystemPrompt } from "@/lib/ai-persona"

// WhatsApp webhook verification (GET) and message handling (POST)

export async function GET(request: Request) {
  // Webhook verification for Meta WhatsApp Business API
  const { searchParams } = new URL(request.url)

  const mode = searchParams.get("hub.mode")
  const token = searchParams.get("hub.verify_token")
  const challenge = searchParams.get("hub.challenge")

  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN

  if (mode === "subscribe" && token === verifyToken) {
    console.log("Webhook verified successfully")
    return new Response(challenge, { status: 200 })
  }

  return new Response("Forbidden", { status: 403 })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Handle WhatsApp message
    const entry = body.entry?.[0]
    const changes = entry?.changes?.[0]
    const value = changes?.value
    const messages = value?.messages

    if (!messages || messages.length === 0) {
      return Response.json({ status: "no messages" })
    }

    const message = messages[0]
    const from = message.from // Phone number
    const messageText = message.text?.body

    if (!messageText) {
      return Response.json({ status: "no text message" })
    }

    // Generate AI response
    const systemPrompt = getSystemPrompt("Demo Business") // Would be fetched from DB

    const { text: aiResponse } = await generateText({
      model: "openai/gpt-4o-mini",
      system: systemPrompt,
      messages: [{ role: "user", content: messageText }],
    })

    // Send response back via WhatsApp API
    const phoneNumberId = value.metadata.phone_number_id
    await sendWhatsAppMessage(phoneNumberId, from, aiResponse)

    return Response.json({ status: "success" })
  } catch (error) {
    console.error("WhatsApp webhook error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function sendWhatsAppMessage(phoneNumberId: string, to: string, message: string) {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN

  if (!accessToken) {
    console.error("Missing WHATSAPP_ACCESS_TOKEN")
    return
  }

  const response = await fetch(`https://graph.facebook.com/v18.0/${phoneNumberId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body: message },
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error("Failed to send WhatsApp message:", error)
  }
}

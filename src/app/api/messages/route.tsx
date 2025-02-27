//The API Layer to provde for Cross-Platfom
import { NextResponse, NextRequest } from "next/server"
import {
  getMessages,
  deleteMessage,
  saveMessage,
} from "@/lib/messages/messagesDB"
import { Message } from "@/types/messages"

// Handle GET requests (retrieve all messages)
export async function GET(): Promise<
  NextResponse<Message[] | { error: string }>
> {
  try {
    // Fetch messages from the database
    const messages: Message[] = await getMessages()
    return NextResponse.json(messages, { status: 200 })
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    )
  }
}

// Handle DELETE requests (delete a message by ID)
export async function DELETE(
  request: NextRequest
): Promise<NextResponse<{ success: boolean } | { error: string }>> {
  try {
    const { id } = await request.json() // Extract the ID from the request body
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }
    await deleteMessage(id) // Delete the message from the database
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Error deleting message:", error)
    return NextResponse.json(
      { error: "Failed to delete message" },
      { status: 500 }
    )
  }
}

//Handle POST requests (add a message)
export async function POST(
  request: NextRequest
): Promise<NextResponse<Message | { error: string }>> {
  // Parse the request body to get the message content
  const content = await request.json()

  // const testString = content.toString()
  // console.log("Test String:", testString)
  // console.log("Test String 2:", testString2)
  // console.log("Content:", content)
  const newMessage = await saveMessage(content.content)
  return NextResponse.json(newMessage, { status: 201 })
}

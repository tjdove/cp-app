//The API Layer to provide for Cross-Platform
import { NextResponse, NextRequest } from "next/server"
import {
  getMessages,
  deleteMessage,
  saveMessage,
} from "@/lib/messages/messagesDB"
import { Message } from "@/types/messages"
import { auth } from "@clerk/nextjs/server"

// Handle GET requests (retrieve all messages for the authenticated user)
export async function GET(): Promise<
  NextResponse<Message[] | { error: string }>
> {
  try {
    const { userId } = await auth() // Get the authenticated user's ID
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Fetch messages for the authenticated user
    const messages: Message[] = await getMessages(userId)
    return NextResponse.json(messages, { status: 200 })
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    )
  }
}

// Handle DELETE requests (delete a message by ID for the authenticated user)
export async function DELETE(
  request: NextRequest
): Promise<NextResponse<{ success: boolean } | { error: string }>> {
  try {
    const { userId } = await auth() // Get the authenticated user's ID
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await request.json() // Extract the ID from the request body
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    // Delete the message for the authenticated user
    await deleteMessage(id, userId)
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Error deleting message:", error)
    return NextResponse.json(
      { error: "Failed to delete message" },
      { status: 500 }
    )
  }
}

// Handle POST requests (add a message for the authenticated user)
export async function POST(
  request: NextRequest
): Promise<NextResponse<Message | { error: string }>> {
  try {
    const { userId } = await auth() // Get the authenticated user's ID
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { content } = await request.json() // Parse the request body
    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 })
    }

    // Save the message for the authenticated user
    const newMessage = await saveMessage(content, userId)
    return NextResponse.json(newMessage, { status: 201 })
  } catch (error) {
    console.error("Error adding message:", error)
    return NextResponse.json(
      { error: "Failed to add message" },
      { status: 500 }
    )
  }
}

// lib/db.ts
import sqlite3 from "sqlite3"
import { open, Database } from "sqlite"
import { Message } from "@/types/messages"

// Open the SQLite database
async function getDb(): Promise<Database> {
  try {
    return await open({
      filename: "./src/lib/messages/cp-app.db",
      driver: sqlite3.Database,
    })
  } catch (error) {
    console.error("Error opening database:", error)
    throw error
  }
}

// Save a message for a specific user
export async function saveMessage(content: string, userId: string): Promise<Message> {
  try {
    const db = await getDb()
    const timestamp = Date.now()
    const result = await db.run(
      "INSERT INTO messages (userId, messageType, content, timestamp) VALUES (?, ?, ?, ?)",
      [userId, "defaultMessageType", content, timestamp]
    )

    return {
      id: result.lastID!,
      userId,
      messageType: "defaultMessageType",
      content,
      timestamp,
    }
  } catch (error) {
    console.error("Error saving message:", error)
    throw error
  }
}

// Get messages for a specific user
export async function getMessages(userId: string): Promise<Message[]> {
  try {
    const db = await getDb()
    return db.all<Message[]>("SELECT * FROM messages WHERE userId = ? ORDER BY timestamp DESC", userId)
  } catch (error) {
    console.error("Error fetching messages:", error)
    throw error
  }
}

// Delete a message by ID for a specific user
export async function deleteMessage(id: number, userId: string): Promise<void> {
  try {
    const db = await getDb()
    await db.run("DELETE FROM messages WHERE id = ? AND userId = ?", [id, userId])
  } catch (error) {
    console.error("Error deleting message:", error)
    throw error
  }
}

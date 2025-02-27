// lib/db.ts
import sqlite3 from "sqlite3"
import { open, Database } from "sqlite"
import { Message } from "@/types/messages"

let db: Database | null = null

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

export async function saveMessage(content: string): Promise<Message> {
  try {
    const db = await getDb()
    const timestamp = Date.now()
    // Insert the message into the database
    const result = await db.run(
      "INSERT INTO messages (userId, messageType, content, timestamp) VALUES (?, ?, ?, ?)",
      ["defaultUserId", "defaultMessageType", content, timestamp]
    )

    //create new message
    const newMessage: Message = {
      id: result.lastID!, // SQLite returns this after the INSERT
      content,
      timestamp: timestamp,
      userId: "defaultUserId",
      messageType: "defaultMessageType",
    }
    return newMessage
  } catch (error) {
    console.error("Error saving message:", error)
    throw error
  }
}

//await db.all('SELECT * FROM messages');  ORDER BY timestamp DESC
export async function getMessages(): Promise<Message[]> {
  const db = await getDb()
  return db.all<Message[]>("SELECT * FROM messages")
}
// Delete a message by ID
export async function deleteMessage(id: number): Promise<void> {
  const db = await getDb()
  await db.run("DELETE FROM messages WHERE id = ?", id)
}

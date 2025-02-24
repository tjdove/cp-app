// lib/db.ts
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import { Message } from '@/types/messages';

let db: Database | null = null;

async function getDb(): Promise<Database> {
  if (!db) {
    db = await open({
      filename: './messages.db',
      driver: sqlite3.Database,
    });
    // Create messages table if it doesn't exist
    await db.exec(`
      CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY,
        content TEXT NOT NULL,
        timestamp INTEGER NOT NULL
      )
    `);
  }
  return db;
}

export async function saveMessage(content: string): Promise<Message> {
  const id = crypto.randomUUID();
  const message: Message = {
    id,
    content,
    timestamp: Date.now(),
    userId: 'defaultUserId', // Replace with actual userId
    messageType: 'defaultMessageType' // Replace with actual messageType
  };
  
  const db = await getDb();
  await db.run(
    'INSERT INTO messages (id, content, timestamp) VALUES (?, ?, ?)',
    id,
    content,
    message.timestamp
  );
  
  return message;
}

export async function getMessages(): Promise<Message[]> {
  const db = await getDb();
  return db.all<Message[]>('SELECT * FROM messages ORDER BY timestamp DESC');
}

export async function deleteMessage(id: string): Promise<void> {
  const db = await getDb();
  await db.run('DELETE FROM messages WHERE id = ?', id);
}
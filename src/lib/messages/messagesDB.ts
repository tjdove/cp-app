// lib/db.ts
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import { Message } from '@/types/messages';

let db: Database | null = null;

// Open the SQLite database
async function getDb(): Promise<Database> {
  try {
    return await open({
      filename: './src/lib/messages/cp-app.db',
      driver: sqlite3.Database,
    });
  } catch (error) {
    console.error('Error opening database:', error);
    throw error;
  }
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


//await db.all('SELECT * FROM messages'); 
export async function getMessages(): Promise<Message[]> {
  const db = await getDb();
  return db.all<Message[]>('SELECT * FROM messages ORDER BY timestamp DESC');
}
 // Delete a message by ID
export async function deleteMessage(id: string): Promise<void> {
  const db = await getDb();
  await db.run('DELETE FROM messages WHERE id = ?', id);
}
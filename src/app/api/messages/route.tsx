//The API Layer to provde for Cross-Platfom
import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Open the SQLite database
async function getDb() {
  return open({
    filename: './src/lib/messages/cp-app.db',
    driver: sqlite3.Database,
  });
}

// Handle POST requests (add a message)
export async function POST(request: Request) {
  const db = await getDb();
  const { id, userId, messageId, messageType, content, timestamp } = await request.json();
  await db.run(
    'INSERT INTO messages (id, userId, messageId, messageType, content, timestamp) VALUES (?, ?, ?, ?, ?, ?)',
    [id, userId, messageId, messageType, content, timestamp]
  );
  return NextResponse.json(
    { message: 'Message added', data: { id, userId, messageId, messageType, content, timestamp } },
    { status: 201 }
  );
}

// Handle GET requests (retrieve all messages)
export async function GET() {
  const db = await getDb();
  const messages = await db.all('SELECT * FROM messages');
  return NextResponse.json(messages, { status: 200 });
}
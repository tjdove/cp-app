//The API Layer to provde for Cross-Platfom
import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { getMessages } from '@/lib/messages/messagesDB';
import { Message } from '@/types/messages';


// Handle POST requests (add a message)
// export async function POST(request: Request) {
//   const db = await getDb();
//   const { id, userId, messageId, messageType, content, timestamp } = await request.json();
//   await db.run(
//     'INSERT INTO messages (id, userId, messageId, messageType, content, timestamp) VALUES (?, ?, ?, ?, ?, ?)',
//     [id, userId, messageId, messageType, content, timestamp]
//   );
//   return NextResponse.json(
//     { message: 'Message added', data: { id, userId, messageId, messageType, content, timestamp } },
//     { status: 201 }
//   );
// }

// Handle GET requests (retrieve all messages)
// export async function GET() {
//   //const db = await getDb();
//   const messages = await getMessages();
//   return NextResponse.json(messages, { status: 200 });
// }

// Handle GET requests (retrieve all messages)
export async function GET(): Promise<NextResponse<Message[] | { error: string }>> {
  try {
    const messages: Message[] = await getMessages();
    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

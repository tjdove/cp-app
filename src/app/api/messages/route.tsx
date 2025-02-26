//The API Layer to provde for Cross-Platfom
import { NextResponse, NextRequest } from 'next/server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { getMessages,deleteMessage } from '@/lib/messages/messagesDB';
import { Message } from '@/types/messages';


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

// export async function DELETE(request: NextRequest) {
//   try {
//     const { id } = await request.json();
//     if (!id) {
//       return NextResponse.json({ error: 'ID is required' }, { status: 400 });
//     }
//     await deleteMessage(id);
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
//   }
// }

// Handle DELETE requests (delete a message by ID)
export async function DELETE(request: NextRequest): Promise<NextResponse<{ success: boolean } | { error: string }>> {
  try {
    const { id } = await request.json(); // Extract the ID from the request body
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    await deleteMessage(id); // Delete the message from the database
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
  }
}
//deleteMessage()


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
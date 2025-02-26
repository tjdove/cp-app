import { NextResponse } from 'next/server';
import { saveMessage, deleteMessage, getMessages } from '@/lib/messages/messagesDB';

export async function GET() {
  try {
    const messages = await getMessages();
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  try {
    const { content } = await request.json();
    const newMessage = await saveMessage(content);
    return NextResponse.json(newMessage);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await deleteMessage(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.error();
  }
}

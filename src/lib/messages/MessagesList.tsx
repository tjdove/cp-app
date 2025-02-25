"use client"
import { useEffect, useState } from 'react';
import { Message } from '@/types/messages'; // Import the Message type

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await fetch('/api/messages'); // Call the API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }
        const data: Message[] = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }

    fetchMessages();
  }, []);

  return (
    <div>
      <h1>Messages</h1>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            {message.content} - {new Date(message.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
"use client"
import { useEffect, useState } from 'react';
import { Message } from '@/types/messages';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
//import { Typography } from '@/components/ui/typography';

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await fetch('/api/messages');
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

  // Delete a message
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch('/api/messages', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete message');
      }

      // Remove the deleted message from the state
      setMessages((prevMessages) => prevMessages.filter((message) => message.id !== id.toString()));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              Messages
            </CardTitle>
          </CardHeader>
        </Card>

        <div className="space-y-4">
          {messages.map((message) => (
            <Card key={message.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h1  className="text-lg text-gray-800">
                  {message.content}
                </h1>
                <span  className="text-sm text-gray-500 mt-2">
                  {new Date(message.timestamp).toLocaleString()}
                </span>
                <Button
                  variant="destructive"
                  className="mt-4"
                  onClick={() => handleDelete(Number(message.id))}
                >
                  Delete - {message.id}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" onClick={() => window.location.reload()}>
            Refresh Messages
          </Button>
        </div>
      </div>
    </div>
  );
}
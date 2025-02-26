"use client"
import { useEffect, useState } from 'react';
import { Message } from '@/types/messages';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
//import { Typography } from '@/components/ui/typography';
import { Trash2 } from "lucide-react";
import { Badge } from '@/components/ui/badge';
// import { useClipboard } from 'use-clipboard-copy';

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
            <Card 
  key={message.id} 
  className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-primary rounded-lg overflow-hidden"
>
  <CardHeader className="pb-2">
      <Badge variant={message.messageType === 'text' ? 'outline' : 'secondary'} className="mb-2" key={message.id}>
      {/* <Badge variant={message.messageType === 'text' ? 'outline' : 'secondary'} className="mb-2">
        {message.messageType}
      </Badge> */}
      <span className="text-xs text-muted-foreground font-mono">
        {new Date(message.timestamp).toLocaleString("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          weekday: "short",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })}
      </span>
    </Badge>
  </CardHeader>
  <CardContent className="pt-0">
    <p className="text-base font-medium text-card-foreground leading-relaxed">
      {message.content}
    </p>
  </CardContent>
  <CardFooter className="flex justify-end pb-4">
    <Button
      variant="ghost"
      size="sm"
      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
      onClick={() => handleDelete(Number(message.id))}
    >
      <Trash2 className="h-4 w-4 mr-2" />
      <span>Delete</span>
    </Button>
  </CardFooter>
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
"use client"

import { Message } from "@/types/messages";
import { getMessages } from "@/lib/messages/messagesDB";
import React, { useState, useEffect } from "react";

const MessageList: React.FC = () => {
  // State to hold the messages
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch messages when the component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getMessages(); // Using await here
        setMessages(data);
      } catch (err) {
        setError("Failed to load messages");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages(); // Call the async function
  }, []); // Empty dependency array means it runs once on mount

  // Render based on state
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Messages</h1>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
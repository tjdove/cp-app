"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
//import { useState } from "react";
import { Paperclip } from "lucide-react";
import { Message } from "@/types/messages";
import { getMessages } from "@/lib/messages/messagesDB"; 
import React, { useState, useEffect } from "react";

interface FormProps {
  // Add props if needed, e.g., onSubmit: () => void;
}
//getMessages(): Promise<Message[]> 

export default function Home({}: FormProps) {
  const [message, setMessage] = useState("");
  // const loadedMessages: Message[] = await getMessages();


  // const [messages, setMessages] = useState<Message[]>([]);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Form submitted with value:', message);
    // Handle the form submission logic here
    // For example, you can send the message to an API or perform any other action
    // Reset the message state after submission
    setMessage("");
  };

  const handleClipboardSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Submitted message:", message);
    // Handle the form submission logic here
    // For example, you can send the message to an API or perform any other action
    // Reset the message state after submission
    setMessage("");
  };

  return (
    <Card className="text-gray-500">
      {/* <h1>Paste a link:</h1> */}
      <form onSubmit={handleSubmit}>
        <Textarea
          name="message"
          id="message"
          placeholder="Paste your link here..."
          rows={10}
          maxLength={800}
          autoFocus
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex items-center justify-between w-full mt-4">
          <Button type="submit">
            Submit
          </Button>
          <Button type="button" onClick={handleClipboardSubmit}>
            <Paperclip />
            Clipboard
          </Button>
        </div>
      </form>
    </Card>
  );
}
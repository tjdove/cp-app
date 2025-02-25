"use client"
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Link, Paperclip } from "lucide-react";

export default function Home() {
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Submitted message:", message);
    console.log("Submitting button:", message);
    // Handle the form submission logic here
    // For example, you can send the message to an API or perform any other action
    // Reset the message state after submission


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
          <Button type="button"  name="submit">
            Submit
          </Button>
          <Button type="button" name="submitClipboard">
            <Paperclip  />
            Clipboard
          </Button>
        </div>
      </form>
    </Card>
  );
}
"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

interface FormProps {
  onSubmit: (content: string) => void;
}

export default function LinkSubmissionForm({ onSubmit }: FormProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Message submitted:", message);
    if (message.length != 0) {
      onSubmit(message);
      setMessage("");
    }
  };

  return (
    // <div className="text-gray-500">
    //   <form onSubmit={handleSubmit}>
    //     <Textarea
    //       name="message"
    //       id="message"
    //       placeholder="Note here..."
    //       rows={4}
    //       maxLength={800}
    //       autoFocus
    //       value={message}
    //       onChange={(e) => setMessage(e.target.value)}
    //     />
    //     <div className="flex items-center justify-between w-full mt-4">
    //       <Button type="submit">Send</Button>
    //     </div>
    //   </form>
    // </div>
    <div className="bg-[#643016] text-white p-6 rounded-2xl shadow-md w-full">
      <form onSubmit={handleSubmit}>
        {/* <label
          htmlFor="message"
          className="block text-sm font-medium text-[#e0d2c1] mb-2"
        >
          Your Note
        </label> */}
        <Textarea
          name="message"
          id="message"
          placeholder="Note here..."
          rows={4}
          maxLength={800}
          autoFocus
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-3 rounded-lg bg-[#ffce95] text-white placeholder-[#b6a89e] focus:outline-none focus:ring-2 focus:ring-[#7da7c5] border border-[#6b4b3f]"
        />
        <div className="flex items-center justify-between w-full mt-4">
          <Button
            type="submit"
            className="w-full bg-[#d9822b] hover:bg-[#f39c49] text-white font-semibold py-2 px-4 rounded-xl transition duration-200 shadow-sm"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}

"use client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Paperclip } from "lucide-react"
import React, { useState } from "react"

interface FormProps {
  onSubmit: (content: string) => void
}

export default function LinkSubmissionForm({ onSubmit }: FormProps) {
  const [message, setMessage] = useState("")

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log("Message submitted:", message)
    onSubmit(message)
    setMessage("")
  }

  const handleClipboardSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onSubmit(message)
    setMessage("")
  }

  return (
    <Card className="text-gray-500">
      <form onSubmit={handleSubmit}>
        <Textarea
          name="message"
          id="message"
          placeholder="Paste your link here..."
          rows={4}
          maxLength={800}
          autoFocus
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex items-center justify-between w-full mt-4">
          <Button type="submit">Submit</Button>
          <Button type="button" onClick={handleClipboardSubmit}>
            <Paperclip />
            Clipboard
          </Button>
        </div>
      </form>
    </Card>
  )
}

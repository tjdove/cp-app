"use client"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import LinkSubmissionForm from "@/components/LinkSubmissionForm"
import MessagesList from "@/lib/messages/MessagesList"
import { Message } from "@/types/messages"

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    async function fetchMessages() {
      try {
        // Fetch messages from the API
        const response = await fetch("/api/messages")
        if (!response.ok) {
          throw new Error("Failed to fetch messages")
        }
        const data: Message[] = await response.json()
        setMessages(data)
      } catch (error) {
        console.error("Error fetching messages:", error)
      }
    }

    fetchMessages()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      // Send a DELETE request to the API to delete the message
      const response = await fetch("/api/messages", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })
      // Check if the response is OK (status code 200-299)
      if (!response.ok) {
        throw new Error("Failed to delete message")
      }
      // Remove the deleted message from the state
      setMessages((prevMessages) =>
        prevMessages.filter((message) => message.id !== id)
      )
    } catch (error) {
      console.error("Error deleting message:", error)
    }
  }

  const handleAddMessage = async (content: string) => {
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      })

      if (!response.ok) {
        throw new Error("Failed to add message")
      }

      const newMessage: Message = await response.json()
      setMessages((prevMessages) => [...prevMessages, newMessage])
    } catch (error) {
      console.error("Error adding message:", error)
    }
  }

  return (
    <>
      <div className="flex flex-col border-dotted items-center justify-center min-h-screen p-4">
        <Card className="text-gray-600">
          <div className="flex flex-col items-center justify-center w-full max-w-md p-6 space-y-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold">Welcome to OnlyLinks...</h1>
            We get it done.
            <LinkSubmissionForm onSubmit={handleAddMessage} />
            <MessagesList messages={messages} onDelete={handleDelete} />
          </div>
        </Card>
      </div>
    </>
  )
}

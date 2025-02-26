"use client"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import LinkSubmissionForm from "@/components/ui/LinkSubmissionForm"
import MessagesList from "@/lib/messages/MessagesList"
import { Message } from "@/types/messages"

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    async function fetchMessages() {
      try {
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
      const response = await fetch("/api/messages", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) {
        throw new Error("Failed to delete message")
      }

      setMessages((prevMessages) =>
        prevMessages.filter((message) => message.id !== id.toString())
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

      <div className="flex items-stretch bg-grey-lighter">
        <div className="flex-1 text-grey-darker text-center bg-grey-light px-4 py-2 m-2">
          1
        </div>
        <div className="flex-1 text-grey-darker text-center bg-grey-light px-4 py-2 m-2">
          2
        </div>
        <div className="flex-1 text-grey-darker text-center bg-grey-light px-4 py-2 m-2">
          3
        </div>
      </div>
    </>
  )
}

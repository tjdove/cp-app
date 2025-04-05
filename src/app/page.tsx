"use client"
import { useEffect, useState } from "react"
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
      setMessages((prevMessages) => [newMessage,...prevMessages])
    } catch (error) {
      console.error("Error adding message:", error)
    }
  }

  return (
    <>
  <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-amber-50">
    <div className="w-full max-w-md">
      <div className="relative overflow-hidden rounded-xl shadow-xl bg-gradient-to-br from-amber-800 to-amber-700">
        <div className="absolute top-0 right-0 w-32 h-32 -mr-10 -mt-10 bg-blue-500 opacity-20 rounded-full blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 -ml-10 -mb-10 bg-orange-500 opacity-20 rounded-full blur-xl"></div>
        
        <div className="relative p-8">
          <div className="flex flex-col items-center justify-center space-y-2">
            <h1 className="text-3xl font-bold text-amber-50">Welcome to OnlyLinks</h1>
            <p className="text-amber-200 italic font-medium">We get it done.</p>
              <LinkSubmissionForm onSubmit={handleAddMessage} />
            <div className="w-full p-6 bg-[#643016] rounded-lg border-brown-700">
              <h2 className="text-xl font-semibold text-amber-200 mb-4">
                Your Links
              </h2>
              <MessagesList messages={messages} onDelete={handleDelete} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</>
  )
}

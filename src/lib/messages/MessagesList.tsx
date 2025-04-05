"use client"
import { Message } from "@/types/messages"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface MessagesListProps {
  messages: Message[]
  onDelete: (id: number) => void
}

export default function MessagesList({
  messages,
  onDelete,
}: MessagesListProps) {
  return (

      <div className="max-w-4xl mx-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <Card
            key={message.id}
            className="bg-[#ffce95] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-primary rounded-lg overflow-hidden flex flex-col h-full"
          >
            <CardContent className="p-4 flex-grow">
              <p className="text-base font-medium text-card-foreground leading-relaxed">
                {message.content}
              </p>
            </CardContent>
            
            <CardFooter className="flex items-center justify-between px-4 pb-3 pt-2 bg-white/10">
              <div className="flex items-center space-x-2">
                <Badge
                  variant={message.messageType === "text" ? "outline" : "secondary"}
                  className="py-1 px-2"
                >
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
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                className="border text-destructive hover:bg-destructive/10 hover:text-destructive px-2 py-1"
                onClick={() => onDelete(Number(message.id))}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                <span className="sr-only md:not-sr-only">Delete</span>
              </Button>
            </CardFooter>
          </Card>
          ))}
        </div>

        <div className="mt-8 text-center py-2">
          <Button variant="outline" onClick={() => window.location.reload()}
            className ="w-full bg-[#d9822b] hover:bg-[#f39c49] text-white font-semibold py-2 px-4 rounded-xl transition duration-200 shadow-sm">
            Refresh Messages
          </Button>
        </div>
      </div>
      )
}

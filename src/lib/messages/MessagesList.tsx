"use client"
import { Message } from "@/types/messages"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
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
              <CardContent className="pt-2">
                <p className="text-base font-medium text-card-foreground leading-relaxed">
                  {message.content}
                </p>
              </CardContent>
              <CardFooter className="flex justify-end pb-4">
                <Badge
                  variant={
                    message.messageType === "text" ? "outline" : "secondary"
                  }
                  className="mb-2"
                  key={message.id}
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
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => onDelete(Number(message.id))}
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
  )
}


import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "@/components/ui/use-toast"
import { ModeToggle } from '@/components/ModeToggle';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Scroll to bottom on new messages
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    const userMessage: Message = {
      id: uuidv4(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setNewMessage('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newMessage }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botMessage: Message = {
        id: uuidv4(),
        text: data.response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      })
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <Card className="flex-grow overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Chat with AkiliSpa AI</h2>
            <ModeToggle />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col h-full">
          <div ref={chatContainerRef} className="flex-grow overflow-y-auto mb-4 pr-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
                {message.sender === 'bot' && (
                  <Avatar className="w-8 h-8 mr-2">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                )}
                <div className={`rounded-xl px-4 py-2 ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs text-muted-foreground">{new Date(message.timestamp).toLocaleTimeString()}</p>
                </div>
                {message.sender === 'user' && (
                  <Avatar className="w-8 h-8 ml-2">
                    <AvatarFallback>
                      {user && typeof user === 'object' && 'name' in user && typeof user.name === 'string' 
                        ? user.name.slice(0, 2).toUpperCase() 
                        : 'U'}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center">
            <Input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-grow mr-2"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatPage;

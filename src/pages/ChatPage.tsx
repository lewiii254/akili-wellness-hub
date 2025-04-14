
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { ModeToggle } from '@/components/ModeToggle';
import { Send, Sparkles } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Simple function to generate IDs without external dependencies
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Mental health focused responses
const mentalHealthResponses = [
  "It sounds like you're going through a challenging time. How can I support you today?",
  "Remember that it's okay to prioritize your mental wellbeing. What self-care activities help you feel better?",
  "Your feelings are valid. Would you like to talk more about what's bothering you?",
  "Taking care of your mental health is important. Have you considered trying mindfulness or meditation?",
  "Sometimes just talking about our feelings can help reduce their intensity. I'm here to listen.",
  "It's brave of you to share your thoughts. What support systems do you have in place right now?",
  "Small steps toward wellness matter. What's one small thing you could do today to support your mental health?"
];

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([{
    id: generateId(),
    text: "Hi there! I'm your mental wellness assistant. How are you feeling today?",
    sender: 'bot',
    timestamp: new Date(),
  }]);
  const [newMessage, setNewMessage] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    const userMessage: Message = {
      id: generateId(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setNewMessage('');

    try {
      // Simulating AI response with mental health focus
      setTimeout(() => {
        const randomResponse = mentalHealthResponses[Math.floor(Math.random() * mentalHealthResponses.length)];
        const botMessage: Message = {
          id: generateId(),
          text: randomResponse,
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages(prevMessages => [...prevMessages, botMessage]);
      }, 1000);
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Card className="w-full shadow-lg border-2 border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Sparkles className="text-primary h-5 w-5 mr-2" />
              <h2 className="text-xl font-semibold">Mental Wellness Chat</h2>
            </div>
            <ModeToggle />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col h-[70vh]">
          <div 
            ref={chatContainerRef} 
            className="flex-grow overflow-y-auto mb-4 pr-2 space-y-4 bg-background/80 p-4 rounded-lg"
            style={{ height: "calc(70vh - 140px)" }}
          >
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-3`}>
                {message.sender === 'bot' && (
                  <Avatar className="w-8 h-8 mr-2">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                  </Avatar>
                )}
                <div className={`max-w-[80%] rounded-xl px-4 py-2 ${
                  message.sender === 'user' 
                    ? 'bg-primary text-primary-foreground rounded-br-none shadow-md' 
                    : 'bg-secondary text-secondary-foreground rounded-bl-none shadow-md'
                }`}>
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">{new Date(message.timestamp).toLocaleTimeString()}</p>
                </div>
                {message.sender === 'user' && (
                  <Avatar className="w-8 h-8 ml-2">
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      {user && typeof user === 'object' && 'name' in user && typeof user.name === 'string' 
                        ? user.name.slice(0, 2).toUpperCase() 
                        : 'U'}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center mt-2 border-t pt-4">
            <Input
              type="text"
              placeholder="Share how you're feeling..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-grow mr-2 shadow-sm border-secondary"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button onClick={handleSendMessage} className="rounded-full" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatPage;

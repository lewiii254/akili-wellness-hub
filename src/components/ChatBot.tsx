
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  MessageCircle,
  Send,
  X,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Sample bot responses
const botResponses = [
  "I'm here to support you on your mental wellness journey. How can I help today?",
  "Taking care of your mental health is important. Would you like some resources on meditation?",
  "It sounds like you're going through a difficult time. Remember that it's okay to ask for help.",
  "Have you tried any breathing exercises today? They can be very helpful for managing stress.",
  "I notice you might be feeling anxious. Would you like me to suggest some grounding techniques?",
  "Remember, small steps toward wellness are still progress. Be kind to yourself.",
];

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I'm your AkiliSpa wellness assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response after a short delay
    setTimeout(() => {
      const randomResponse =
        botResponses[Math.floor(Math.random() * botResponses.length)];
      const botMessage: Message = {
        id: messages.length + 2,
        text: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Chat button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center p-4 rounded-full bg-akili-purple text-white shadow-lg hover:bg-akili-dark-purple transition-colors"
        aria-label="Open chat"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>

      {/* Chat window */}
      <div
        className={cn(
          "fixed bottom-20 right-6 z-50 w-80 md:w-96 rounded-2xl shadow-xl transform transition-all duration-300 ease-in-out",
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        )}
      >
        <Card className="overflow-hidden border-2 border-primary/20">
          {/* Chat header */}
          <div className="bg-gradient-to-r from-akili-purple to-akili-blue p-4 text-white flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5" />
              <h3 className="font-medium">Akili Wellness Assistant</h3>
            </div>
            <button
              onClick={toggleChat}
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Close chat"
            >
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>

          {/* Chat messages */}
          <div className="h-96 overflow-y-auto p-4 bg-white dark:bg-gray-900 flex flex-col space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "max-w-[85%] p-3 rounded-2xl",
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground self-end rounded-br-none"
                    : "bg-secondary text-secondary-foreground self-start rounded-bl-none"
                )}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            ))}
            {isTyping && (
              <div className="max-w-[85%] p-3 rounded-2xl bg-secondary text-secondary-foreground self-start rounded-bl-none">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-akili-purple animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-akili-purple animate-pulse delay-150" />
                  <div className="w-2 h-2 rounded-full bg-akili-purple animate-pulse delay-300" />
                </div>
              </div>
            )}
          </div>

          {/* Chat input */}
          <form onSubmit={handleSubmit} className="p-3 bg-secondary flex">
            <Input
              placeholder="Type a message..."
              value={inputValue}
              onChange={handleInputChange}
              className="flex-1 mr-2 bg-background focus-visible:ring-primary"
            />
            <Button type="submit" size="icon" className="rounded-full">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default ChatBot;

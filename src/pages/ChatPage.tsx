
import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

// Sample bot responses
const botResponses = [
  "I'm here to support you on your mental wellness journey. How can I help today?",
  "Taking care of your mental health is important. Would you like some resources on meditation?",
  "It sounds like you're going through a difficult time. Remember that it's okay to ask for help.",
  "Have you tried any breathing exercises today? They can be very helpful for managing stress.",
  "I notice you might be feeling anxious. Would you like me to suggest some grounding techniques?",
  "Remember, small steps toward wellness are still progress. Be kind to yourself.",
  "If you're experiencing serious mental health concerns, I'd recommend reaching out to a professional therapist.",
  "Deep breathing can be very effective for managing stress. Try breathing in for 4 counts, hold for 4, and exhale for 6.",
  "Journaling can be a helpful way to process your thoughts and emotions. Would you like some journaling prompts?",
  "Regular physical activity can have significant benefits for mental health. Even a short walk can help clear your mind.",
];

// Sample initial bot messages - explicitly typed as Message[]
const initialBotMessages: Message[] = [
  {
    id: 1,
    text: "Hi there! I'm your AkiliSpa wellness assistant. How can I help you today?",
    sender: "bot",
  },
  {
    id: 2,
    text: "You can ask me about mental health resources, coping strategies, or wellness tips. I'm here to support you!",
    sender: "bot",
  },
];

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>(initialBotMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 gradient-bg">
      <div className="max-w-4xl mx-auto">
        {/* Chat Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">AkiliSpa Wellness Assistant</h1>
          <p className="text-lg text-muted-foreground">
            I'm here to provide support, resources, and guidance for your mental wellness journey.
          </p>
        </div>

        {/* Chat Container */}
        <div className="bg-background rounded-2xl border shadow-lg overflow-hidden">
          {/* Chat Messages */}
          <div className="h-[500px] overflow-y-auto p-4 flex flex-col space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "max-w-[80%] p-4 rounded-2xl flex",
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground self-end rounded-br-none"
                    : "bg-secondary text-secondary-foreground self-start rounded-bl-none"
                )}
              >
                <div className="flex-shrink-0 mr-3">
                  {message.sender === "user" ? (
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground">
                      <User className="h-4 w-4" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-akili-purple to-akili-blue flex items-center justify-center text-white">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="max-w-[80%] p-4 rounded-2xl bg-secondary text-secondary-foreground self-start rounded-bl-none flex">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-akili-purple to-akili-blue flex items-center justify-center text-white">
                    <Bot className="h-4 w-4" />
                  </div>
                </div>
                <div className="flex items-end">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-akili-purple animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-akili-purple animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 rounded-full bg-akili-purple animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-3 bg-secondary border-t">
            <form onSubmit={handleSubmit} className="flex items-center">
              <Input
                placeholder="Type your message here..."
                value={inputValue}
                onChange={handleInputChange}
                className="flex-1 mr-2 bg-background focus-visible:ring-primary"
              />
              <Button type="submit" size="icon" className="rounded-full">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-secondary/50 rounded-lg text-sm text-muted-foreground">
          <p>
            <strong>Disclaimer:</strong> This AI assistant is not a substitute for professional mental health advice, diagnosis, or treatment. 
            If you're experiencing a mental health crisis or emergency, please contact a crisis hotline or seek immediate medical attention.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

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
  Brain,
  Heart,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

// Enhanced mental health focused bot responses with more personalized and supportive content
const botResponses = [
  // General support messages
  "I'm here to support your mental wellbeing. What's on your mind today?",
  "Remember that it's okay to not be okay sometimes. Would you like some self-care techniques?",
  "Taking small steps for your mental health can make a big difference. Have you tried any mindfulness exercises lately?",
  
  // Anxiety and stress responses
  "It sounds like you're feeling anxious. Let's try a quick grounding technique: name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.",
  "Deep breathing can help in moments of anxiety. Try breathing in for 4 counts, hold for 2, and exhale for 6. Would you like to try this together?",
  "Stress affects our mind and body. What physical sensations are you noticing right now? Sometimes being aware of them can help us manage them better.",
  
  // Depression and mood support
  "On difficult days, even small accomplishments matter. What's one small thing you did today that you can acknowledge?",
  "Depression can make everything feel overwhelming. Let's break things down into smaller, manageable steps. What's one tiny thing you could do for yourself today?",
  "Your feelings are valid, and you're not alone in experiencing them. Many people go through similar struggles with their mental health.",
  
  // Self-care suggestions
  "Self-care is essential for mental wellbeing. This could mean taking a walk, reading a book, or just sitting quietly for a few minutes. What form of self-care appeals to you today?",
  "Getting enough sleep is crucial for mental health. Would you like some tips for better sleep habits?",
  "Physical activity, even just a short walk, can boost your mood by releasing endorphins. Have you moved your body today?",
  
  // Connection and support
  "Connecting with others can help improve your mental wellbeing. Is there someone supportive you could reach out to today?",
  "It's important to be kind to yourself during difficult times. How would you comfort a friend going through what you're experiencing?",
  "Remember that seeking help is a sign of strength, not weakness. Professional support can make a big difference in your mental health journey.",
];

// Mental health resources
const mentalHealthResources = [
  {
    title: "Crisis Support",
    description: "If you're in crisis, text HOME to 741741 to reach a crisis counselor.",
    icon: ShieldCheck,
  },
  {
    title: "Mindfulness Techniques",
    description: "Practice mindfulness to reduce stress and improve focus.",
    icon: Brain,
  },
  {
    title: "Self-Care Ideas",
    description: "Simple daily activities to support your mental wellbeing.",
    icon: Heart,
  },
];

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  resources?: boolean;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I'm your mental wellness assistant. How are you feeling today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [name, setName] = useState("");

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const processWithAI = async (message: string, previousMessages: Message[]) => {
    try {
      const { data, error } = await supabase.functions.invoke('chat-response', {
        body: { message, previousMessages }
      });

      if (error) throw error;
      return data.response;
    } catch (error) {
      console.error('Error processing with AI:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await processWithAI(inputValue, messages);
      
      const botMessage: Message = {
        id: messages.length + 2,
        text: response,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "I apologize, but I'm having trouble responding right now. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Chat button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center p-4 rounded-full bg-akili-purple text-white shadow-lg hover:bg-akili-dark-purple transition-colors"
        aria-label="Open mental wellness chat"
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
              <h3 className="font-medium">Mental Wellness Assistant</h3>
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
              <React.Fragment key={message.id}>
                <div
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
                
                {/* Show resources if indicated */}
                {message.resources && (
                  <div className="self-start max-w-[90%] mt-2 mb-1">
                    <p className="text-xs text-muted-foreground mb-2">Resources that might help:</p>
                    <div className="space-y-2">
                      {mentalHealthResources.map((resource, index) => (
                        <div 
                          key={index}
                          className="bg-secondary/30 rounded-lg p-2 flex items-start gap-2 border border-primary/10 hover:bg-secondary/50 transition-colors cursor-pointer"
                        >
                          <resource.icon className="w-4 h-4 text-primary mt-0.5" />
                          <div>
                            <p className="text-xs font-medium">{resource.title}</p>
                            <p className="text-xs text-muted-foreground">{resource.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </React.Fragment>
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
          <form onSubmit={handleSubmit} className="p-3 bg-secondary/30 flex">
            <Input
              placeholder="Share how you're feeling..."
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

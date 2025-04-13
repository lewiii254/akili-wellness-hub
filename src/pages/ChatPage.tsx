
import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Bot, User, RefreshCw, Brain, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

// Enhanced AI responses with more mental health focus
const botResponses = [
  {
    trigger: ["anxious", "anxiety", "worried", "stress", "stressed"],
    responses: [
      "It sounds like you might be experiencing some anxiety. Deep breathing can help - try breathing in for 4 counts, hold for 4, and exhale for 6.",
      "Anxiety is a natural response, but there are ways to manage it. Have you tried the 5-4-3-2-1 grounding technique? Notice 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.",
      "When feeling anxious, it can help to challenge negative thoughts. Try asking yourself: What's the evidence for and against this thought? Is there another way to look at the situation?",
    ]
  },
  {
    trigger: ["sad", "depression", "depressed", "unhappy", "down"],
    responses: [
      "I'm sorry to hear you're feeling down. Remember that emotions are temporary and it's okay to not be okay sometimes. Would you like to talk more about what's contributing to these feelings?",
      "Depression can make everyday tasks feel overwhelming. Try breaking things down into smaller, more manageable steps, and celebrate small victories.",
      "Even small amounts of physical activity can help improve mood. Could you try a short walk or some gentle stretching?",
    ]
  },
  {
    trigger: ["meditation", "mindfulness", "relax", "calm"],
    responses: [
      "Meditation can be a powerful tool for mental wellness. Try starting with just 5 minutes of focusing on your breath - in through the nose, out through the mouth.",
      "A simple mindfulness exercise is to focus completely on one of your senses for a few minutes. What can you hear right now? Try to notice sounds you normally tune out.",
      "Progressive muscle relaxation can help release physical tension. Start at your toes and work up to your head, tensing each muscle group for 5 seconds, then releasing.",
    ]
  },
  // Default responses when no specific triggers match
  {
    trigger: ["default"],
    responses: [
      "I'm here to support you on your mental wellness journey. How can I help today?",
      "Taking care of your mental health is important. Would you like some resources on meditation or stress management?",
      "It sounds like you're going through a difficult time. Remember that it's okay to ask for help when you need it.",
      "Have you tried any breathing exercises today? They can be very helpful for managing stress.",
      "Remember, small steps toward wellness are still progress. Be kind to yourself.",
      "If you're experiencing serious mental health concerns, I'd recommend reaching out to a professional therapist.",
      "Journaling can be a helpful way to process your thoughts and emotions. Would you like some journaling prompts?",
      "Regular physical activity can have significant benefits for mental health. Even a short walk can help clear your mind.",
    ]
  }
];

// Sample initial bot messages
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
  const [aiMode, setAiMode] = useState<"standard" | "advanced">("advanced");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const getAIResponse = (userInput: string) => {
    // Simple AI response logic based on keyword matching
    const userInputLower = userInput.toLowerCase();
    
    // Check for specific triggers
    for (const category of botResponses) {
      if (category.trigger === ["default"]) continue;
      
      const hasMatch = category.trigger.some(keyword => 
        userInputLower.includes(keyword)
      );
      
      if (hasMatch) {
        const responses = category.responses;
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }
    
    // Default to general responses if no triggers matched
    const defaultResponses = botResponses.find(category => 
      category.trigger.includes("default")
    )?.responses || [];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
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
      let response;
      
      if (aiMode === "advanced") {
        response = getAIResponse(userMessage.text);
      } else {
        // Standard mode - random response
        const randomResponse =
          botResponses.find(cat => cat.trigger.includes("default"))?.responses[
            Math.floor(Math.random() * botResponses.find(cat => cat.trigger.includes("default"))?.responses.length || 0)
          ] || "I'm here to help.";
        response = randomResponse;
      }
      
      const botMessage: Message = {
        id: messages.length + 2,
        text: response,
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const toggleAIMode = () => {
    const newMode = aiMode === "standard" ? "advanced" : "standard";
    setAiMode(newMode);
    toast({
      title: `AI Mode: ${newMode === "advanced" ? "Advanced" : "Standard"}`,
      description: newMode === "advanced" 
        ? "Using context-aware responses for better conversation" 
        : "Using standard response patterns",
    });
  };

  const clearChat = () => {
    setMessages(initialBotMessages);
    toast({
      title: "Chat cleared",
      description: "Starting a fresh conversation",
    });
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
          <div className="flex justify-center mt-4 space-x-4">
            <Button variant="outline" size="sm" onClick={toggleAIMode} className="flex items-center">
              <Brain className="w-4 h-4 mr-2" />
              {aiMode === "advanced" ? "Advanced AI" : "Standard AI"}
            </Button>
            <Button variant="outline" size="sm" onClick={clearChat} className="flex items-center">
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset Chat
            </Button>
          </div>
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
                      {aiMode === "advanced" ? <Sparkles className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
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
                    {aiMode === "advanced" ? <Sparkles className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
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

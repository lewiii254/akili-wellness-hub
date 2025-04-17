
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { message, previousMessages } = await req.json()
    
    // Analyze message sentiment to tailor response
    const sentiment = analyzeSentiment(message.toLowerCase())
    
    // Get context from previous messages
    const context = getConversationContext(previousMessages)

    // Generate appropriate response based on sentiment and context
    const response = generateResponse(message, sentiment, context)

    return new Response(
      JSON.stringify({ response }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})

// Simple sentiment analysis function
function analyzeSentiment(message: string): 'positive' | 'negative' | 'neutral' {
  const positiveWords = ['good', 'great', 'happy', 'better', 'improve', 'hope', 'calm', 'relaxed', 'motivated']
  const negativeWords = ['sad', 'depressed', 'anxious', 'worried', 'stress', 'bad', 'afraid', 'scared', 'overwhelmed']
  
  let positiveScore = 0
  let negativeScore = 0
  
  positiveWords.forEach(word => {
    if (message.includes(word)) positiveScore++
  })
  
  negativeWords.forEach(word => {
    if (message.includes(word)) negativeScore++
  })
  
  if (positiveScore > negativeScore) return 'positive'
  if (negativeScore > positiveScore) return 'negative'
  return 'neutral'
}

// Extract conversation context
function getConversationContext(messages: any[]): string {
  if (!messages || messages.length === 0) return 'initial'
  
  // Check for repeated patterns or specific topics
  const lastThreeMessages = messages.slice(-3).map(m => m.text?.toLowerCase() || '')
  
  if (lastThreeMessages.some(msg => 
      msg.includes('anxiety') || 
      msg.includes('anxious') || 
      msg.includes('worry'))) {
    return 'anxiety'
  }
  
  if (lastThreeMessages.some(msg => 
      msg.includes('sad') || 
      msg.includes('depress') || 
      msg.includes('down'))) {
    return 'depression'
  }
  
  if (lastThreeMessages.some(msg => 
      msg.includes('sleep') || 
      msg.includes('tired') || 
      msg.includes('insomnia'))) {
    return 'sleep'
  }
  
  return 'general'
}

// Generate response based on sentiment and context
function generateResponse(message: string, sentiment: string, context: string): string {
  // Enhanced mental health focused bot responses with more personalized and supportive content
  const responses = {
    anxiety: [
      "It sounds like you're feeling anxious. Let's try a quick grounding technique: name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.",
      "Deep breathing can help in moments of anxiety. Try breathing in for 4 counts, hold for 2, and exhale for 6. Would you like to try this together?",
      "Anxiety affects our mind and body. What physical sensations are you noticing right now? Sometimes being aware of them can help us manage them better."
    ],
    depression: [
      "On difficult days, even small accomplishments matter. What's one small thing you did today that you can acknowledge?",
      "Depression can make everything feel overwhelming. Let's break things down into smaller, manageable steps. What's one tiny thing you could do for yourself today?",
      "Your feelings are valid, and you're not alone in experiencing them. Many people go through similar struggles with their mental health."
    ],
    sleep: [
      "Sleep troubles can significantly impact our mental wellbeing. Have you established a consistent bedtime routine?",
      "Some find that limiting screen time before bed and practicing gentle stretching helps improve sleep quality. Would these be options for you to try?",
      "If racing thoughts keep you awake, writing them down in a journal before bed might help clear your mind. It's like giving your thoughts a place to rest outside your head."
    ],
    general: {
      positive: [
        "It's wonderful to hear you're feeling good! What specific things have been contributing to your positive mood?",
        "Those moments of positivity are worth celebrating. How might you extend this good feeling into other areas of your life?",
        "I'm glad things are going well. Building on positive experiences can help strengthen our resilience for more challenging times."
      ],
      negative: [
        "I'm sorry to hear you're having a difficult time. Would you like to tell me more about what's been challenging for you?",
        "It takes courage to acknowledge when we're struggling. Remember that seeking support, like you're doing now, is a sign of strength.",
        "These feelings won't last forever, even though they might feel overwhelming right now. What's one small thing that might bring you a moment of relief?"
      ],
      neutral: [
        "How have you been taking care of your mental wellbeing lately?",
        "Sometimes checking in with ourselves helps us notice patterns in our thoughts and feelings. Have you noticed any patterns recently?",
        "What's one small thing you could do today that might support your mental health?"
      ]
    },
    initial: [
      "Welcome! I'm here to support your mental wellbeing journey. How are you feeling today?",
      "Hi there! I'm your mental wellness assistant. What brings you here today?",
      "Hello! I'm here to chat about mental wellbeing. How can I support you today?"
    ]
  }
  
  // Select appropriate response pool
  let responsePool
  if (context === 'initial') {
    responsePool = responses.initial
  } else if (['anxiety', 'depression', 'sleep'].includes(context)) {
    responsePool = responses[context as 'anxiety' | 'depression' | 'sleep']
  } else {
    responsePool = responses.general[sentiment as 'positive' | 'negative' | 'neutral']
  }
  
  // Select random response from appropriate pool
  const randomIndex = Math.floor(Math.random() * responsePool.length)
  return responsePool[randomIndex]
}

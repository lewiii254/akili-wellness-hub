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
    const { content } = await req.json()
    
    if (!content) {
      throw new Error('No journal content provided')
    }
    
    // Simple sentiment analysis
    const sentiment = analyzeSentiment(content)
    
    // Generate appropriate suggestion based on content and sentiment
    const suggestion = generateSuggestion(content, sentiment)
    
    return new Response(
      JSON.stringify({ suggestion }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error processing journal:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})

// Simple rule-based sentiment analysis
function analyzeSentiment(text: string): 'positive' | 'negative' | 'neutral' | 'anxious' | 'depressed' {
  const lowerText = text.toLowerCase()
  
  // Define keyword patterns
  const anxietyPattern = /(worry|anxious|nervous|panic|stress|overwhelm|afraid)/g
  const depressionPattern = /(sad|depress|hopeless|tired|exhaust|lonely|empty|unmotivated)/g
  const positivePattern = /(happy|grateful|joy|excit|accomplish|proud|relax|calm|peace)/g
  const negativePattern = /(angry|frustrat|upset|annoyed|disappoint|irritat)/g
  
  // Count matches
  const anxietyCount = (lowerText.match(anxietyPattern) || []).length
  const depressionCount = (lowerText.match(depressionPattern) || []).length
  const positiveCount = (lowerText.match(positivePattern) || []).length
  const negativeCount = (lowerText.match(negativePattern) || []).length
  
  // Determine dominant sentiment
  const counts = [
    { type: 'anxious', count: anxietyCount },
    { type: 'depressed', count: depressionCount },
    { type: 'positive', count: positiveCount },
    { type: 'negative', count: negativeCount }
  ]
  
  // Sort by count
  counts.sort((a, b) => b.count - a.count)
  
  // If highest count is 0 or tied with second highest, return neutral
  if (counts[0].count === 0 || (counts[1] && counts[0].count === counts[1].count)) {
    return 'neutral'
  }
  
  // Otherwise return the dominant sentiment
  return counts[0].type as 'positive' | 'negative' | 'neutral' | 'anxious' | 'depressed'
}

function generateSuggestion(content: string, sentiment: string): string {
  // Response templates based on detected sentiment
  const suggestions = {
    positive: [
      "It's great to see you're feeling positive! Consider building on this good energy by planning an activity you enjoy for tomorrow.",
      "Your positive mood is wonderful. Taking a moment to appreciate what's going well can help reinforce these good feelings.",
      "This positive energy is valuable! Think about what contributed to these good feelings, so you can create more moments like this."
    ],
    negative: [
      "I notice you may be feeling frustrated. Taking a few deep breaths or going for a short walk might help shift your perspective.",
      "When negative emotions arise, it can help to talk to someone you trust about what you're experiencing.",
      "It sounds like today has been challenging. Remember that all emotions are temporary, and treating yourself with kindness during difficult times is important."
    ],
    anxious: [
      "I'm noticing some anxiety in your entry. Grounding exercises like the 5-4-3-2-1 technique (notice 5 things you see, 4 things you feel, 3 things you hear, 2 things you smell, and 1 thing you taste) might help you feel more present.",
      "Anxiety can feel overwhelming. Consider taking a few minutes for some deep breathing - breathing in for 4 counts, holding for 2, and exhaling for 6 can help activate your body's relaxation response.",
      "When anxious thoughts arise, sometimes writing them down and asking 'What's the evidence for and against this thought?' can help put things in perspective."
    ],
    depressed: [
      "I notice some signs of low mood in your entry. Even small activities like taking a shower, stepping outside for fresh air, or calling a friend can sometimes help break the cycle.",
      "Remember that you don't have to face difficult feelings alone. Reaching out to a trusted friend, family member, or mental health professional is a sign of strength.",
      "When motivation is low, try breaking tasks into very small steps. Even accomplishing one tiny thing can help build momentum."
    ],
    neutral: [
      "Regular journaling like you're doing now is a great way to track patterns in your thoughts and emotions over time.",
      "Consider setting an intention for tomorrow. What's one small thing you could do to support your mental wellbeing?",
      "Reflection is a powerful tool for self-awareness. You might try adding a gratitude practice to your journaling routine by noting three things you appreciate each day."
    ]
  };
  
  // Select random suggestion based on sentiment
  const sentimentSuggestions = suggestions[sentiment as keyof typeof suggestions] || suggestions.neutral;
  const randomIndex = Math.floor(Math.random() * sentimentSuggestions.length);
  
  return sentimentSuggestions[randomIndex];
}

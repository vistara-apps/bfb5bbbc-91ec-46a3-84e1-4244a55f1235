import { XProfile, RoastRequest } from './types';
import { SAMPLE_ROASTS } from './constants';

// Mock X profile data for demo purposes
export async function fetchXProfile(username: string): Promise<XProfile> {
  // In a real implementation, this would call the X API
  // For now, return mock data
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
  
  return {
    username,
    displayName: username.charAt(0).toUpperCase() + username.slice(1),
    bio: "Living my best life 🌟 | Entrepreneur | Coffee lover ☕ | DM for collabs",
    followerCount: Math.floor(Math.random() * 10000) + 100,
    tweetCount: Math.floor(Math.random() * 5000) + 50,
    recentTweets: [
      "Just had the best coffee ever! ☕ #MondayMotivation",
      "Working on something big... stay tuned! 🚀",
      "Grateful for all the amazing people in my life 🙏",
      "Another day, another opportunity to grow 💪",
      "Weekend vibes are the best vibes ✨"
    ],
  };
}

export async function generateRoast(request: RoastRequest): Promise<string> {
  try {
    // In a real implementation, this would call OpenAI API
    // For now, generate a mock roast based on the profile
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate AI processing
    
    const username = request.xProfileUrl.split('/').pop() || request.name;
    const profile = await fetchXProfile(username);
    
    // Generate a personalized roast based on profile data
    const roastTemplates = [
      `${request.name}, your bio says "${profile.bio}" but your ${profile.followerCount} followers suggest otherwise.`,
      `With ${profile.tweetCount} tweets and ${profile.followerCount} followers, ${request.name}, you're really mastering the art of talking to yourself.`,
      `${request.name}, I see you tweet about being an entrepreneur. That's a fancy way of saying "unemployed with WiFi."`,
      `Your recent tweet "${profile.recentTweets[0]}" really shows the depth of your personality, ${request.name}. Shallow end of the pool depth.`,
      `${request.name}, you have ${profile.followerCount} followers but somehow still manage to tweet into the void.`,
    ];
    
    // Add some randomness to make it feel more dynamic
    const randomTemplate = roastTemplates[Math.floor(Math.random() * roastTemplates.length)];
    const randomSample = SAMPLE_ROASTS[Math.floor(Math.random() * SAMPLE_ROASTS.length)];
    
    return Math.random() > 0.5 ? randomTemplate : randomSample;
    
  } catch (error) {
    console.error('Error generating roast:', error);
    // Fallback to a generic roast
    return SAMPLE_ROASTS[Math.floor(Math.random() * SAMPLE_ROASTS.length)];
  }
}

// Real OpenAI integration (commented out for demo)
/*
export async function generateRoastWithOpenAI(request: RoastRequest): Promise<string> {
  const profile = await fetchXProfile(extractUsernameFromUrl(request.xProfileUrl));
  
  const prompt = `Generate a funny, witty roast for someone named ${request.name} based on their X/Twitter profile:
  
Bio: ${profile.bio}
Followers: ${profile.followerCount}
Tweets: ${profile.tweetCount}
Recent tweets: ${profile.recentTweets.join(', ')}

The roast should be:
- Funny and clever, not mean-spirited
- Based on their social media presence
- Include current internet trends/slang
- Keep it under 280 characters
- Make it shareable and entertaining

Roast:`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a witty AI that generates funny, clever roasts based on social media profiles. Keep roasts light-hearted and entertaining, never cruel or offensive.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 150,
      temperature: 0.9,
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content.trim();
}
*/

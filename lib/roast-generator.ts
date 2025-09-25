import { XProfile, RoastRequest } from './types';
import { SAMPLE_ROASTS } from './constants';

// Real X API integration
export async function fetchXProfile(username: string): Promise<XProfile> {
  try {
    // Remove @ symbol if present
    const cleanUsername = username.replace('@', '');

    // Get user profile information
    const userResponse = await fetch(`https://api.twitter.com/2/users/by/username/${cleanUsername}`, {
      headers: {
        'Authorization': `Bearer ${process.env.X_API_BEARER_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!userResponse.ok) {
      throw new Error(`Failed to fetch user profile: ${userResponse.status}`);
    }

    const userData = await userResponse.json();

    if (!userData.data) {
      throw new Error('User not found');
    }

    const user = userData.data;

    // Get recent tweets
    const tweetsResponse = await fetch(`https://api.twitter.com/2/users/${user.id}/tweets?max_results=10&tweet.fields=created_at,text,public_metrics`, {
      headers: {
        'Authorization': `Bearer ${process.env.X_API_BEARER_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    let recentTweets: string[] = [];
    if (tweetsResponse.ok) {
      const tweetsData = await tweetsResponse.json();
      recentTweets = tweetsData.data?.slice(0, 5).map((tweet: any) => tweet.text) || [];
    }

    return {
      username: user.username,
      displayName: user.name,
      bio: user.description || '',
      followerCount: user.public_metrics?.followers_count || 0,
      tweetCount: user.public_metrics?.tweet_count || 0,
      recentTweets,
    };
  } catch (error) {
    console.error('Error fetching X profile:', error);
    // Fallback to mock data if API fails
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
}

export async function generateRoast(request: RoastRequest): Promise<string> {
  try {
    const username = request.xProfileUrl.split('/').pop() || request.name;
    const profile = await fetchXProfile(username);

    // Try OpenAI API first
    if (process.env.OPENAI_API_KEY) {
      try {
        const prompt = `Generate a funny, witty roast for someone named ${request.name} based on their X/Twitter profile:

Bio: "${profile.bio || 'No bio available'}"
Followers: ${profile.followerCount.toLocaleString()}
Tweets: ${profile.tweetCount.toLocaleString()}
Recent tweets: ${profile.recentTweets.slice(0, 3).map(tweet => `"${tweet}"`).join(', ') || 'No recent tweets'}

The roast should be:
- Funny and clever, not mean-spirited
- Based on their social media presence and bio
- Include current internet trends/slang when appropriate
- Keep it under 280 characters (like a tweet)
- Make it shareable and entertaining
- Be light-hearted and fun, never cruel or offensive

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
                content: 'You are a witty AI that generates funny, clever roasts based on social media profiles. Keep roasts light-hearted and entertaining, never cruel or offensive. Focus on humor about online presence, bio content, and social media behavior.'
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

        if (response.ok) {
          const data = await response.json();
          const roast = data.choices[0]?.message?.content?.trim();
          if (roast && roast.length > 10) {
            return roast;
          }
        }
      } catch (openaiError) {
        console.error('OpenAI API error:', openaiError);
      }
    }

    // Fallback to template-based roasts if OpenAI fails or is not configured
    const roastTemplates = [
      `${request.name}, your bio says "${profile.bio?.slice(0, 50)}${profile.bio && profile.bio.length > 50 ? '...' : ''}" but your ${profile.followerCount.toLocaleString()} followers suggest otherwise.`,
      `With ${profile.tweetCount.toLocaleString()} tweets and ${profile.followerCount.toLocaleString()} followers, ${request.name}, you're really mastering the art of talking to yourself.`,
      `${request.name}, I see you tweet about being an entrepreneur. That's a fancy way of saying "unemployed with WiFi."`,
      `Your recent tweet "${profile.recentTweets[0]?.slice(0, 50)}${profile.recentTweets[0] && profile.recentTweets[0].length > 50 ? '...' : ''}" really shows the depth of your personality, ${request.name}. Shallow end of the pool depth.`,
      `${request.name}, you have ${profile.followerCount.toLocaleString()} followers but somehow still manage to tweet into the void.`,
      `${request.name}, your bio mentions "${profile.bio?.split('|')[0]?.trim() || 'something interesting'}" but based on your tweets, you're clearly an expert at "${profile.recentTweets[0]?.split(' ')[0] || 'social media'}"`,
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

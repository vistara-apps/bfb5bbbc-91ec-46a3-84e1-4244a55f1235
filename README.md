# RoastBot - Base MiniApp

Get hilariously roasted by AI, powered by your X profile.

## Features

- 🔥 **AI Roast Generation**: Personalized, witty roasts based on X profiles
- 🎯 **X Profile Integration**: Analyze public profiles for targeted humor
- 💰 **Micro-transactions**: Credit-based system with Base blockchain payments
- 📱 **Mobile-First**: Optimized for Farcaster frames and mobile devices
- 🎨 **Multi-Theme Support**: 5 different blockchain-inspired themes
- 🔗 **Social Sharing**: Easy sharing within Farcaster ecosystem

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (via OnchainKit)
- **Styling**: Tailwind CSS with custom design system
- **AI**: OpenAI GPT (configurable)
- **Social**: X/Twitter API integration
- **State**: Local storage with planned Redis integration

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your API keys
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:3000`

## Environment Variables

- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Coinbase Developer Platform API key
- `OPENAI_API_KEY`: OpenAI API key for real AI generation
- `X_API_KEY`, `X_API_SECRET`, `X_BEARER_TOKEN`: X/Twitter API credentials

## Architecture

### Data Model
- **User**: userId, xProfileUrl, creditsRemaining, lastRoastTimestamp
- **Roast**: roastId, userId, generatedText, timestamp, shareCount

### User Flows
1. **First Time**: Enter name/X profile → Generate roast → Share/buy more
2. **Credit Purchase**: Select package → Confirm transaction → Update balance

### Design System
- **Colors**: Warm social theme with dark teal background and coral accents
- **Typography**: Inter font with responsive sizing
- **Components**: Glass morphism cards with smooth animations
- **Motion**: Subtle transitions and loading states

## Deployment

The app is configured for deployment on Vercel or similar platforms:

```bash
npm run build
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

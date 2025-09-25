# RoastBot - Base MiniApp

Get hilariously roasted by AI, powered by your X profile.

## Features

- 🔥 **AI Roast Generation**: Personalized, witty roasts based on X profiles using OpenAI GPT
- 🎯 **X Profile Integration**: Real-time analysis of public X profiles and recent tweets
- 💰 **Micro-transactions**: Credit-based system with Base blockchain payments
- 📱 **Mobile-First**: Optimized for Farcaster frames and mobile devices
- 🎨 **Multi-Theme Support**: 5 different blockchain-inspired themes
- 🔗 **Social Sharing**: Easy sharing within Farcaster ecosystem
- 🗄️ **Production Database**: Upstash Redis for data persistence
- 🚀 **Production APIs**: RESTful API routes for all operations
- 🎭 **Farcaster Frames**: Full frame integration for viral sharing

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (via OnchainKit)
- **Database**: Upstash Redis
- **Styling**: Tailwind CSS with custom design system
- **AI**: OpenAI GPT-3.5/4 for roast generation
- **Social**: X/Twitter API v2 integration
- **Deployment**: Vercel-ready with API routes

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- API Keys for:
  - OpenAI (for AI roast generation)
  - X/Twitter API (for profile data)
  - Upstash Redis (for data persistence)
  - Coinbase Developer Platform (for OnchainKit)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd roastbot
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your API keys:
   ```env
   # OpenAI API Configuration
   OPENAI_API_KEY=your_openai_api_key_here

   # X (Twitter) API Configuration
   X_API_BEARER_TOKEN=your_x_api_bearer_token_here

   # Upstash Redis Configuration
   UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url_here
   UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token_here

   # OnchainKit Configuration
   NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key_here

   # Base URL for frames
   NEXT_PUBLIC_BASE_URL=https://your-domain.com
   ```

4. **Run development server**:
   ```bash
   npm run dev
   ```

5. **Open in browser**:
   Navigate to `http://localhost:3000`

## API Routes

### Roast Generation
- `POST /api/roast` - Generate a new roast
- `POST /api/roast/share` - Increment share count for a roast

### User Management
- `GET /api/user?userId={id}` - Get user data
- `POST /api/user` - Create/update user
- `PUT /api/user` - Update user credits/timestamps

### Analytics
- `GET /api/analytics` - Get app analytics

### Farcaster Frames
- `GET /api/frame` - Main frame
- `GET /api/frame/image` - Frame image
- `POST /api/frame/action` - Frame actions

## Architecture

### Data Model
- **User**: userId, xProfileUrl, creditsRemaining, lastRoastTimestamp
- **Roast**: roastId, userId, generatedText, timestamp, shareCount

### User Flows
1. **First Time**: Enter name/X profile → Generate roast → Share/buy more
2. **Credit Purchase**: Select package → Confirm Base transaction → Update balance
3. **Sharing**: Copy to clipboard or share via Farcaster

### Design System
- **Colors**: Warm social theme with dark teal background and coral accents
- **Typography**: Inter font with responsive sizing
- **Components**: Glass morphism cards with smooth animations
- **Motion**: Subtle transitions and loading states
- **Themes**: Default, Celo, Solana, Base, Coinbase variants

## Business Model

- **Free Tier**: 1 roast per day
- **Paid Tiers**:
  - 3 Roasts: 0.0005 ETH (~$0.50)
  - 10 Roasts: 0.0015 ETH (~$1.50)
  - 25 Roasts: 0.003 ETH (~$3.00)
- **Micro-transactions** via Base blockchain
- **Engagement Rewards**: Future feature for social sharing incentives

## Deployment

### Vercel Deployment

1. **Connect repository** to Vercel
2. **Add environment variables** in Vercel dashboard
3. **Deploy**:
   ```bash
   npm run build
   npm start
   ```

### Environment Setup

Ensure all required environment variables are set in your deployment platform.

## Development

### Project Structure
```
app/
├── api/                 # API routes
├── components/          # React components
├── globals.css          # Global styles
├── layout.tsx          # Root layout
└── page.tsx            # Main page

lib/
├── constants.ts        # App constants
├── database.ts         # Redis operations
├── roast-generator.ts  # AI roast logic
├── types.ts           # TypeScript types
└── utils.ts           # Utility functions
```

### Key Components
- **ProfileInput**: X profile input form
- **RoastCard**: Roast display with sharing
- **CreditCounter**: User credit management
- **CreditPurchase**: Payment modal
- **ActionButtons**: Share/retry actions

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For issues or questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments for implementation details

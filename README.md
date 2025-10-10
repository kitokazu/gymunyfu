# gymunyfu - Get Your Money Up Not Your Funny Up

A finance-focused social media platform where users share financial achievements, investments, and money management tips.

## Features

- **Social Feed**: Browse posts from the community with real-time updates
- **User Profiles**: Detailed profiles with financial information display
  - Income breakdown visualization
  - Bank accounts and credit cards
  - Investment portfolio tracking
- **Social Interactions**:
  - Like and comment on posts
  - Follow/unfollow users
  - Save posts for later
- **Tag System**: Filter posts by categories like investments, crypto, stocks, real estate, debt-free, etc.
- **Trending Topics**: Discover popular discussions and users to follow
- **Responsive Design**: Fully optimized for mobile and desktop

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Date Formatting**: date-fns
- **TypeScript**: Full type safety

## Firebase Setup (Required for Production)

This project is designed to work with Firebase for authentication and database. To set up:

1. Create a Firebase project at https://console.firebase.google.com
2. Enable Authentication with Google Sign-In provider
3. Create a Firestore database
4. Copy your Firebase config to `lib/firebase-template.ts`
5. Set up Firestore security rules from `firestore-rules-template.txt`
6. Add environment variables:
   \`\`\`
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   \`\`\`

## Database Collections

- `users`: User profiles and financial data
- `posts`: User posts with tags
- `comments`: Comments on posts
- `follows`: Follow relationships
- `likes`: Post and comment likes

## Getting Started

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

\`\`\`
app/
├── page.tsx              # Main feed
├── trending/             # Trending posts
├── following/            # Following feed
├── saved/                # Saved posts
├── settings/             # User settings
├── profile/[username]/   # User profiles
├── post/[id]/            # Post detail pages
└── tag/[tag]/            # Tag-filtered feeds

components/
├── feed/                 # Feed components
├── post/                 # Post components
├── profile/              # Profile components
└── layout/               # Layout components

lib/
├── types.ts              # TypeScript types
├── mock-data.ts          # Mock data for development
└── firebase-template.ts  # Firebase configuration template
\`\`\`

## Development Notes

- Currently using mock data for development
- Authentication and database integration pending Firebase setup
- All social interactions are client-side only (no persistence)
- Ready for Firebase integration following the template provided

## License

MIT

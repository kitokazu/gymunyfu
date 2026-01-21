/**
 * Seed script to populate Firestore with mock data
 *
 * Run with: npx tsx scripts/seed-firestore.ts
 *
 * First install tsx: npm install -D tsx dotenv
 *
 * Make sure your .env.local file has the Firebase configuration
 */

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, collection, getDocs, deleteDoc, Timestamp } from "firebase/firestore";
import * as dotenv from "dotenv";
import * as path from "path";

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Mock data with Timestamps
const mockUsers = [
  {
    id: "1",
    username: "wealthbuilder",
    displayName: "Sarah Chen",
    email: "sarah@example.com",
    bio: "Building wealth through smart investments | Real Estate & Tech Stocks | Sharing my journey to financial freedom",
    occupation: ["Software Engineer", "Real Estate Investor"],
    avatar: "/professional-woman-smiling.png",
    coverImage: "/modern-office-skyline.jpg",
    createdAt: Timestamp.fromDate(new Date("2024-01-15")),
    followersCount: 12500,
    followingCount: 450,
    postsCount: 5,
    financialProfile: {
      totalIncome: 185000,
      incomeBreakdown: [
        {
          id: "1",
          name: "Tech Salary",
          amount: 145000,
          type: "salary",
          frequency: "yearly",
        },
        {
          id: "2",
          name: "Rental Income",
          amount: 30000,
          type: "passive",
          frequency: "yearly",
        },
        {
          id: "3",
          name: "Dividend Income",
          amount: 10000,
          type: "investment",
          frequency: "yearly",
        },
      ],
      showIncomeAmounts: true,
      creditCards: [
        {
          id: "1",
          name: "Chase Sapphire Reserve",
          type: "Visa",
          benefits: [
            "3x points on travel and dining",
            "$300 annual travel credit",
            "Priority Pass lounge access",
          ],
        },
        {
          id: "2",
          name: "American Express Gold",
          type: "Amex",
          benefits: [
            "4x points at restaurants",
            "4x points at U.S. supermarkets",
            "$120 dining credit",
          ],
        },
        {
          id: "3",
          name: "Capital One Venture X",
          type: "Visa",
          benefits: [
            "2x miles on everything",
            "$300 annual travel credit",
            "10,000 anniversary bonus miles",
          ],
        },
      ],
      bankAccounts: [
        {
          id: "1",
          name: "Ally Bank",
          type: "savings",
          description: "High-yield savings with 4.5% APY",
        },
        {
          id: "2",
          name: "Chase",
          type: "checking",
          description: "Primary checking for daily expenses",
        },
        {
          id: "3",
          name: "Fidelity",
          type: "investment",
          description: "Brokerage account for stock trading",
        },
      ],
      investments: [
        {
          id: "1",
          name: "VOO",
          type: "stocks",
          category: "Index Funds",
          value: 85000,
          returnRate: 12.5,
        },
        {
          id: "2",
          name: "AAPL",
          type: "stocks",
          category: "Tech Stocks",
          value: 40000,
          returnRate: 15.2,
        },
        {
          id: "3",
          name: "123 Main St",
          type: "real-estate",
          category: "Rental Property",
          value: 450000,
          returnRate: 8.2,
        },
        {
          id: "4",
          name: "Bitcoin",
          type: "crypto",
          category: "Cryptocurrency",
          value: 25000,
          returnRate: 45.8,
        },
      ],
      loans: [
        { id: "1", name: "Primary Residence", type: "mortgage", lender: "Wells Fargo" },
        { id: "2", name: "Model 3", type: "auto", lender: "Tesla Finance" },
      ],
      showIncome: true,
      showAssets: true,
      showBankAccounts: true,
      showCreditCards: true,
      showInvestments: true,
      showLoans: true,
    },
  },
  {
    id: "2",
    username: "cryptoking",
    displayName: "Marcus Johnson",
    email: "marcus@example.com",
    bio: "Crypto investor since 2017 | DeFi enthusiast | Not financial advice",
    occupation: ["Crypto Trader", "Content Creator"],
    avatar: "/confident-man-with-glasses.jpg",
    createdAt: Timestamp.fromDate(new Date("2023-11-20")),
    followersCount: 8900,
    followingCount: 320,
    postsCount: 2,
    financialProfile: {
      totalIncome: 95000,
      showIncome: false,
      showAssets: false,
    },
  },
  {
    id: "3",
    username: "debtfreejourney",
    displayName: "Emily Rodriguez",
    email: "emily@example.com",
    bio: "Paid off $80K in debt! | Helping others achieve financial freedom | Budget coach",
    occupation: ["Budget Coach", "Financial Educator"],
    avatar: "/happy-woman-celebrating.jpg",
    createdAt: Timestamp.fromDate(new Date("2024-03-10")),
    followersCount: 15200,
    followingCount: 890,
    postsCount: 1,
    financialProfile: {
      totalIncome: 72000,
      showIncome: true,
      showAssets: true,
    },
  },
];

// Denormalized user data for posts/comments
function denormalizeUser(user: (typeof mockUsers)[0]) {
  return {
    id: user.id,
    username: user.username,
    displayName: user.displayName,
    avatar: user.avatar,
  };
}

const mockPosts = [
  {
    id: "1",
    userId: "1",
    user: denormalizeUser(mockUsers[0]),
    content:
      "Just closed on my third rental property! Cash flow positive from day one. The key was finding an undervalued property in an up-and-coming neighborhood. Happy to share my due diligence process if anyone is interested!",
    category: "achievement",
    tags: ["real-estate"],
    createdAt: Timestamp.fromDate(new Date("2024-10-08T14:30:00")),
    updatedAt: Timestamp.fromDate(new Date("2024-10-08T14:30:00")),
    likesCount: 342,
    commentsCount: 2,
  },
  {
    id: "2",
    userId: "2",
    user: denormalizeUser(mockUsers[1]),
    content:
      "Thoughts on the recent Bitcoin ETF approval? I think this is going to bring massive institutional money into crypto. Already seeing increased volume. What's your strategy?",
    category: "question",
    tags: ["crypto"],
    createdAt: Timestamp.fromDate(new Date("2024-10-08T10:15:00")),
    updatedAt: Timestamp.fromDate(new Date("2024-10-08T10:15:00")),
    likesCount: 156,
    commentsCount: 0,
  },
  {
    id: "3",
    userId: "3",
    user: denormalizeUser(mockUsers[2]),
    content:
      "DEBT FREE UPDATE: Made my final payment today! $80,000 paid off in 3 years. It wasn't easy, but it was worth it. To everyone on their debt-free journey - you got this!",
    category: "achievement",
    tags: ["debt-free"],
    createdAt: Timestamp.fromDate(new Date("2024-10-07T18:45:00")),
    updatedAt: Timestamp.fromDate(new Date("2024-10-07T18:45:00")),
    likesCount: 892,
    commentsCount: 0,
  },
  {
    id: "4",
    userId: "1",
    user: denormalizeUser(mockUsers[0]),
    content:
      "My dividend portfolio just hit $10K annual passive income! Started with $0 five years ago. Consistency and reinvesting dividends is the key. Here's my top holdings: VTI, SCHD, O, and JEPI.",
    category: "achievement",
    tags: ["stocks"],
    createdAt: Timestamp.fromDate(new Date("2024-10-07T09:20:00")),
    updatedAt: Timestamp.fromDate(new Date("2024-10-07T09:20:00")),
    likesCount: 445,
    commentsCount: 0,
  },
  {
    id: "5",
    userId: "2",
    user: denormalizeUser(mockUsers[1]),
    content:
      "Question for the group: What percentage of your portfolio do you keep in crypto vs traditional investments? I'm currently 30% crypto, 70% stocks/bonds. Thinking about rebalancing.",
    category: "question",
    tags: ["crypto", "stocks"],
    createdAt: Timestamp.fromDate(new Date("2024-10-06T16:30:00")),
    updatedAt: Timestamp.fromDate(new Date("2024-10-06T16:30:00")),
    likesCount: 89,
    commentsCount: 0,
  },
];

const mockComments = [
  {
    id: "1",
    postId: "1",
    userId: "2",
    user: denormalizeUser(mockUsers[1]),
    content:
      "Congrats! What was your down payment percentage? Looking to get into real estate myself.",
    createdAt: Timestamp.fromDate(new Date("2024-10-08T15:00:00")),
    likesCount: 12,
  },
  {
    id: "2",
    postId: "1",
    userId: "3",
    user: denormalizeUser(mockUsers[2]),
    content:
      "This is inspiring! Would love to hear more about your financing strategy.",
    createdAt: Timestamp.fromDate(new Date("2024-10-08T15:30:00")),
    likesCount: 8,
  },
];

async function seedUsers() {
  console.log("Seeding users...");

  for (const user of mockUsers) {
    const { id, ...userData } = user;
    await setDoc(doc(db, "users", id), userData);
    console.log(`  Created user: ${user.username}`);
  }
}

async function seedPosts() {
  console.log("Seeding posts...");

  for (const post of mockPosts) {
    const { id, ...postData } = post;
    await setDoc(doc(db, "posts", id), postData);
    console.log(`  Created post: ${post.id} by ${post.user.username}`);
  }
}

async function seedComments() {
  console.log("Seeding comments...");

  for (const comment of mockComments) {
    const { id, postId, ...commentData } = comment;
    await setDoc(doc(db, `posts/${postId}/comments`, id), { ...commentData, postId });
    console.log(`  Created comment: ${comment.id} on post ${postId}`);
  }
}

async function clearCollections() {
  console.log("Clearing existing data...");

  // Clear users
  const usersSnapshot = await getDocs(collection(db, "users"));
  for (const docSnap of usersSnapshot.docs) {
    await deleteDoc(docSnap.ref);
  }
  console.log("  Cleared users collection");

  // Clear posts and their subcollections
  const postsSnapshot = await getDocs(collection(db, "posts"));
  for (const postDoc of postsSnapshot.docs) {
    // Clear comments subcollection
    const commentsSnapshot = await getDocs(collection(db, `posts/${postDoc.id}/comments`));
    for (const commentDoc of commentsSnapshot.docs) {
      await deleteDoc(commentDoc.ref);
    }

    // Clear likes subcollection
    const likesSnapshot = await getDocs(collection(db, `posts/${postDoc.id}/likes`));
    for (const likeDoc of likesSnapshot.docs) {
      await deleteDoc(likeDoc.ref);
    }

    await deleteDoc(postDoc.ref);
  }
  console.log("  Cleared posts collection");

  // Clear follows
  const followsSnapshot = await getDocs(collection(db, "follows"));
  for (const docSnap of followsSnapshot.docs) {
    await deleteDoc(docSnap.ref);
  }
  console.log("  Cleared follows collection");
}

async function main() {
  console.log("Starting Firestore seed...\n");
  console.log(`Project ID: ${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}\n`);

  if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
    console.error("Error: NEXT_PUBLIC_FIREBASE_PROJECT_ID is not set");
    console.error("Make sure your .env.local file has the Firebase configuration");
    process.exit(1);
  }

  try {
    await clearCollections();
    console.log("");

    await seedUsers();
    console.log("");

    await seedPosts();
    console.log("");

    await seedComments();
    console.log("");

    console.log("Seed completed successfully!");
    console.log("\nYou can now:");
    console.log("  1. Run the app with: npm run dev");
    console.log("  2. Check the feed to see posts from Firestore");
    console.log("  3. Create new posts and see them persist");
    console.log("  4. Like posts and see the counts update");
    console.log("  5. Add comments and see them in real-time");
  } catch (error) {
    console.error("Error seeding Firestore:", error);
    process.exit(1);
  }

  process.exit(0);
}

main();

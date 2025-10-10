import type { User, Post, Comment, PostTag, PostCategory } from "./types"

export const mockUsers: User[] = [
  {
    id: "1",
    username: "wealthbuilder",
    displayName: "Sarah Chen",
    email: "sarah@example.com",
    bio: "💰 Building wealth through smart investments | Real Estate & Tech Stocks | Sharing my journey to financial freedom",
    occupation: ["Software Engineer", "Real Estate Investor"],
    avatar: "/professional-woman-smiling.png",
    coverImage: "/modern-office-skyline.jpg",
    createdAt: new Date("2024-01-15"),
    followersCount: 12500,
    followingCount: 450,
    postsCount: 234,
    financialProfile: {
      totalIncome: 185000,
      incomeBreakdown: [
        { id: "1", name: "Tech Salary", amount: 145000, type: "salary", frequency: "yearly" },
        { id: "2", name: "Rental Income", amount: 30000, type: "passive", frequency: "yearly" },
        { id: "3", name: "Dividend Income", amount: 10000, type: "investment", frequency: "yearly" },
      ],
      showIncomeAmounts: true,
      creditCards: [
        {
          id: "1",
          name: "Chase Sapphire Reserve",
          type: "Visa",
          benefits: ["3x points on travel and dining", "$300 annual travel credit", "Priority Pass lounge access"],
        },
        {
          id: "2",
          name: "American Express Gold",
          type: "Amex",
          benefits: ["4x points at restaurants", "4x points at U.S. supermarkets", "$120 dining credit"],
        },
        {
          id: "3",
          name: "Capital One Venture X",
          type: "Visa",
          benefits: ["2x miles on everything", "$300 annual travel credit", "10,000 anniversary bonus miles"],
        },
      ],
      bankAccounts: [
        { id: "1", name: "Ally Bank", type: "savings", description: "High-yield savings with 4.5% APY" },
        { id: "2", name: "Chase", type: "checking", description: "Primary checking for daily expenses" },
        { id: "3", name: "Fidelity", type: "investment", description: "Brokerage account for stock trading" },
      ],
      investments: [
        { id: "1", name: "VOO", type: "stocks", category: "Index Funds", value: 85000, returnRate: 12.5 },
        { id: "2", name: "AAPL", type: "stocks", category: "Tech Stocks", value: 40000, returnRate: 15.2 },
        {
          id: "3",
          name: "123 Main St",
          type: "real-estate",
          category: "Rental Property",
          value: 450000,
          returnRate: 8.2,
        },
        { id: "4", name: "Bitcoin", type: "crypto", category: "Cryptocurrency", value: 25000, returnRate: 45.8 },
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
    bio: "🚀 Crypto investor since 2017 | DeFi enthusiast | Not financial advice",
    occupation: ["Crypto Trader", "Content Creator"],
    avatar: "/confident-man-with-glasses.jpg",
    createdAt: new Date("2023-11-20"),
    followersCount: 8900,
    followingCount: 320,
    postsCount: 156,
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
    bio: "Paid off $80K in debt! 🎉 | Helping others achieve financial freedom | Budget coach",
    occupation: ["Budget Coach", "Financial Educator"],
    avatar: "/happy-woman-celebrating.jpg",
    createdAt: new Date("2024-03-10"),
    followersCount: 15200,
    followingCount: 890,
    postsCount: 412,
    financialProfile: {
      totalIncome: 72000,
      showIncome: true,
      showAssets: true,
    },
  },
]

export const mockPosts: Post[] = [
  {
    id: "1",
    userId: "1",
    user: mockUsers[0],
    content:
      "Just closed on my third rental property! 🏡 Cash flow positive from day one. The key was finding an undervalued property in an up-and-coming neighborhood. Happy to share my due diligence process if anyone is interested!",
    category: "achievement",
    tags: ["real-estate"],
    createdAt: new Date("2024-10-08T14:30:00"),
    updatedAt: new Date("2024-10-08T14:30:00"),
    likesCount: 342,
    commentsCount: 28,
  },
  {
    id: "2",
    userId: "2",
    user: mockUsers[1],
    content:
      "Thoughts on the recent Bitcoin ETF approval? I think this is going to bring massive institutional money into crypto. Already seeing increased volume. What's your strategy? 📈",
    category: "question",
    tags: ["crypto"],
    createdAt: new Date("2024-10-08T10:15:00"),
    updatedAt: new Date("2024-10-08T10:15:00"),
    likesCount: 156,
    commentsCount: 45,
  },
  {
    id: "3",
    userId: "3",
    user: mockUsers[2],
    content:
      "DEBT FREE UPDATE: Made my final payment today! $80,000 paid off in 3 years. It wasn't easy, but it was worth it. To everyone on their debt-free journey - you got this! 💪",
    category: "achievement",
    tags: ["debt-free"],
    createdAt: new Date("2024-10-07T18:45:00"),
    updatedAt: new Date("2024-10-07T18:45:00"),
    likesCount: 892,
    commentsCount: 67,
  },
  {
    id: "4",
    userId: "1",
    user: mockUsers[0],
    content:
      "My dividend portfolio just hit $10K annual passive income! Started with $0 five years ago. Consistency and reinvesting dividends is the key. Here's my top holdings: VTI, SCHD, O, and JEPI.",
    category: "achievement",
    tags: ["stocks"],
    createdAt: new Date("2024-10-07T09:20:00"),
    updatedAt: new Date("2024-10-07T09:20:00"),
    likesCount: 445,
    commentsCount: 34,
  },
  {
    id: "5",
    userId: "2",
    user: mockUsers[1],
    content:
      "Question for the group: What percentage of your portfolio do you keep in crypto vs traditional investments? I'm currently 30% crypto, 70% stocks/bonds. Thinking about rebalancing.",
    category: "question",
    tags: ["crypto", "stocks"],
    createdAt: new Date("2024-10-06T16:30:00"),
    updatedAt: new Date("2024-10-06T16:30:00"),
    likesCount: 89,
    commentsCount: 52,
  },
]

export const mockComments: Comment[] = [
  {
    id: "1",
    postId: "1",
    userId: "2",
    user: mockUsers[1],
    content: "Congrats! What was your down payment percentage? Looking to get into real estate myself.",
    createdAt: new Date("2024-10-08T15:00:00"),
    likesCount: 12,
  },
  {
    id: "2",
    postId: "1",
    userId: "3",
    user: mockUsers[2],
    content: "This is inspiring! Would love to hear more about your financing strategy.",
    createdAt: new Date("2024-10-08T15:30:00"),
    likesCount: 8,
  },
]

export const postCategories: { value: PostCategory; label: string; color: string }[] = [
  { value: "investment", label: "Investment", color: "bg-emerald-500" },
  { value: "question", label: "Question", color: "bg-blue-500" },
  { value: "announcement", label: "Announcement", color: "bg-purple-500" },
  { value: "discussion", label: "Discussion", color: "bg-orange-500" },
  { value: "achievement", label: "Achievement", color: "bg-yellow-500" },
  { value: "other", label: "Other", color: "bg-gray-500" },
]

export const postTags: { value: PostTag; label: string }[] = [
  { value: "stocks", label: "Stocks" },
  { value: "crypto", label: "Crypto" },
  { value: "real-estate", label: "Real Estate" },
  { value: "credit-cards", label: "Credit Cards" },
  { value: "savings", label: "Savings" },
  { value: "debt-free", label: "Debt Free" },
  { value: "side-hustle", label: "Side Hustle" },
  { value: "budgeting", label: "Budgeting" },
  { value: "retirement", label: "Retirement" },
  { value: "taxes", label: "Taxes" },
]

export const pinnedAssets = [
  { symbol: "BTC", name: "Bitcoin", price: 67234.5, change: 2.4, type: "crypto" as const },
  { symbol: "ETH", name: "Ethereum", price: 3456.78, change: -1.2, type: "crypto" as const },
  { symbol: "AAPL", name: "Apple", price: 178.23, change: 0.8, type: "stock" as const },
  { symbol: "TSLA", name: "Tesla", price: 242.84, change: 3.5, type: "stock" as const },
  { symbol: "NVDA", name: "NVIDIA", price: 875.28, change: 5.2, type: "stock" as const },
  { symbol: "SPY", name: "S&P 500 ETF", price: 445.67, change: 0.3, type: "stock" as const },
]

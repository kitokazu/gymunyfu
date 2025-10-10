export interface User {
  id: string
  username: string
  displayName: string
  email: string
  bio?: string
  occupation?: string[]
  avatar?: string
  coverImage?: string
  createdAt: Date
  // Financial profile data
  financialProfile?: FinancialProfile
  // Social stats
  followersCount: number
  followingCount: number
  postsCount: number
}

export interface FinancialProfile {
  // Income data
  totalIncome?: number
  incomeBreakdown?: IncomeSource[]
  showIncomeAmounts?: boolean
  // Assets
  creditCards?: CreditCard[]
  bankAccounts?: BankAccount[]
  investments?: Investment[]
  loans?: Loan[]
  // Privacy settings
  showIncome: boolean
  showAssets: boolean
  showBankAccounts?: boolean
  showCreditCards?: boolean
  showInvestments?: boolean
  showLoans?: boolean
}

export interface IncomeSource {
  id: string
  name: string
  amount: number
  type: "salary" | "business" | "investment" | "passive" | "other"
  frequency: "monthly" | "yearly" | "one-time"
}

export interface CreditCard {
  id: string
  name: string
  type?: string // e.g., "Visa", "Mastercard", "Amex"
  benefits?: string[] // Added benefits array for credit card perks
}

// Updated BankAccount interface with description field
export interface BankAccount {
  id: string
  name: string
  type: "checking" | "savings" | "investment"
  description?: string // Optional description for bank account
}

export interface Investment {
  id: string
  name: string
  type: "stocks" | "crypto" | "real-estate" | "bonds" | "other"
  category?: string // e.g., "Tech Stocks", "Index Funds", "Rental Property"
  value?: number
  returnRate?: number
}

export type PostCategory = "investment" | "question" | "announcement" | "discussion" | "achievement" | "other"

export interface Post {
  id: string
  userId: string
  user: User
  content: string
  category: PostCategory
  tags: PostTag[]
  images?: string[]
  createdAt: Date
  updatedAt: Date
  // Social engagement
  likesCount: number
  commentsCount: number
  isLiked?: boolean
}

export type PostTag =
  | "stocks"
  | "crypto"
  | "real-estate"
  | "credit-cards"
  | "savings"
  | "debt-free"
  | "side-hustle"
  | "budgeting"
  | "retirement"
  | "taxes"

export interface Comment {
  id: string
  postId: string
  userId: string
  user: User
  content: string
  createdAt: Date
  likesCount: number
  isLiked?: boolean
}

export interface Follow {
  id: string
  followerId: string
  followingId: string
  createdAt: Date
}

export interface Loan {
  id: string
  name: string
  type: "student" | "mortgage" | "auto" | "personal" | "business" | "other"
  lender?: string
}

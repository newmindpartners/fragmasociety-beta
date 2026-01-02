# Database Architecture Plan: Users & Deals

## Overview

This plan outlines the comprehensive database schema for Fragma Society, integrating:
- **Clerk Authentication** for user identity
- **User Profiles** with investor data, compliance, and portfolio
- **Deals** with full compliance requirements
- **Investments/Orders** for transaction tracking
- **Wallet & Banking** for funds management

---

## 1. USER MODEL (synced with Clerk)

### Data Sources
- **Clerk**: Authentication, email, OAuth providers, profile image
- **Early Access Form**: Initial investor questionnaire data
- **KYC (Sumsub)**: Identity verification status
- **Compliance Engine**: Investor classification, eligibility

### User Fields

```prisma
model User {
  id                    String    @id @default(uuid())
  
  // ===== CLERK SYNC =====
  clerkUserId           String    @unique
  email                 String    @unique
  emailVerified         Boolean   @default(false)
  
  // ===== PERSONAL INFO =====
  firstName             String?
  lastName              String?
  fullName              String?   // Computed: firstName + lastName
  displayName           String?   // User-chosen display name
  avatarUrl             String?
  bio                   String?
  phone                 String?
  phoneVerified         Boolean   @default(false)
  dateOfBirth           DateTime?
  
  // ===== LOCATION =====
  country               String?   // ISO 3166-1 alpha-2 (FR, US, CH, etc.)
  countryName           String?   // France, United States, Switzerland
  city                  String?
  address               String?
  postalCode            String?
  taxResidency          String?   // Country of tax residence
  nationality           String?
  
  // ===== INVESTOR CLASSIFICATION =====
  registeringAs         String    @default("individual") // individual, entity, trust
  entityName            String?   // For corporate/trust investors
  entityType            String?   // LLC, Corporation, Trust, etc.
  investorType          InvestorType @default(RETAIL)
  investorStatus        String?   // From early form: retail, professional, qualified
  classificationDate    DateTime?
  classifiedBy          String?   // admin, AI, self-declared
  
  // ===== KYC / COMPLIANCE =====
  kycStatus             KYCStatus @default(PENDING)
  kycApprovedAt         DateTime?
  kycExpiresAt          DateTime?
  sumsubApplicantId     String?
  sumsubReviewId        String?
  
  complianceStatus      ComplianceStatus @default(PENDING_REVIEW)
  complianceNotes       String?
  lastComplianceReview  DateTime?
  reviewedBy            String?
  
  // ===== RISK & PEP =====
  isPep                 Boolean   @default(false)
  pepDetails            String?
  isSanctioned          Boolean   @default(false)
  riskProfile           String?   // conservative, moderate, aggressive
  riskScore             Int?      // 1-10
  suitabilityScore      Int?      // 1-100
  
  // ===== FINANCIAL PROFILE =====
  annualIncome          String?   // Range: under_50k, 50k_100k, etc.
  investableCapital     String?   // Range: 10k_50k, 50k_100k, etc.
  totalAssets           Decimal?  @db.Decimal(18, 2)
  financialAssets       Decimal?  @db.Decimal(18, 2)
  netWorth              Decimal?  @db.Decimal(18, 2)
  sourceOfFunds         String?   // salary, business, inheritance, etc.
  
  // ===== US / ACCREDITED STATUS =====
  isUsPerson            Boolean   @default(false)
  usState               String?   // For US persons
  usAccreditedStatus    String?   // accredited, non-accredited
  usAccreditedQualifications String[] // Which criteria they meet
  
  // ===== EU PROFESSIONAL STATUS =====
  euProfessionalQualifications String[]
  euQualificationsCount String?   // How many criteria they meet
  professionalStatus    Boolean   @default(false)
  institutionalInvestor Boolean   @default(false)
  
  // ===== INVESTMENT PREFERENCES =====
  investmentHorizon     String?   // 1_3_years, 3_5_years, over_5_years
  preferredTicketSize   String?   // 5k_25k, 25k_100k, etc.
  investmentPriorities  String[]  // growth, income, capital_preservation
  assetInterests        String[]  // real_estate, art, film, music, etc.
  
  // ===== CONTACT PREFERENCES =====
  preferredContactChannel String?  // email, phone, whatsapp
  marketingConsent      Boolean   @default(false)
  consentToContact      Boolean   @default(false)
  
  // ===== MEMBERSHIP =====
  membershipTier        MembershipTier @default(FREE)
  membershipStartDate   DateTime?
  membershipEndDate     DateTime?
  referralCode          String?   @unique
  referredBy            String?   // User ID who referred them
  
  // ===== AGGREGATED STATS =====
  totalInvested         Decimal   @default(0) @db.Decimal(18, 2)
  totalReturns          Decimal   @default(0) @db.Decimal(18, 2)
  activeInvestments     Int       @default(0)
  completedInvestments  Int       @default(0)
  
  // ===== ADMIN FLAGS =====
  isAdmin               Boolean   @default(false)
  adminRole             AdminRole?
  isActive              Boolean   @default(true)
  isBanned              Boolean   @default(false)
  banReason             String?
  
  // ===== TIMESTAMPS =====
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt
  lastLoginAt           DateTime?
  lastActivityAt        DateTime?
  
  // ===== RELATIONS =====
  investments           Investment[]
  orders                Order[]
  wallets               Wallet[]
  transfers             Transfer[]
  documents             UserDocument[]
  notifications         Notification[]
  watchlist             Watchlist[]
  
  @@map("users")
}
```

### Enums for User

```prisma
enum InvestorType {
  RETAIL
  PROFESSIONAL
  QUALIFIED
  ACCREDITED       // US/Canada
  WHOLESALE        // Australia
  QII              // Japan
}

enum KYCStatus {
  PENDING
  IN_PROGRESS
  APPROVED
  REJECTED
  EXPIRED
}

enum ComplianceStatus {
  PENDING_REVIEW
  APPROVED
  REJECTED
  REQUIRES_DOCUMENTS
  SUSPENDED
  UNDER_INVESTIGATION
}

enum MembershipTier {
  FREE
  BASIC
  PREMIUM
  VIP
  INSTITUTIONAL
}

enum AdminRole {
  SUPER_ADMIN
  ADMIN
  MODERATOR
  COMPLIANCE_OFFICER
  SUPPORT
}
```

---

## 2. DEAL MODEL

### Deal Fields

```prisma
model Deal {
  id                    String    @id @default(uuid())
  
  // ===== BASIC INFO =====
  title                 String
  slug                  String    @unique
  description           String
  tagline               String?
  
  // ===== CATEGORIZATION =====
  category              String    // Real Estate, Entertainment, Art, etc.
  subcategory           String?   // Commercial, Film, Music, etc.
  assetClass            String?   // For compliance
  instrumentType        String    // Notes, Equity, Debt, etc.
  
  // ===== LEADERSHIP =====
  leaderName            String
  leaderRole            String
  leaderImage           String?
  
  // ===== INVESTMENT TERMS =====
  currency              String    @default("EUR")
  minTicket             Decimal   @db.Decimal(18, 2)
  maxTicket             Decimal?  @db.Decimal(18, 2)
  tokenPrice            Decimal?  @db.Decimal(18, 2)
  totalRaise            Decimal   @db.Decimal(18, 2)
  currentRaised         Decimal   @default(0) @db.Decimal(18, 2)
  targetReturn          String?   // "12-15%"
  term                  String?   // "3-5 years"
  distributionFrequency String?   // monthly, quarterly, annual
  
  // ===== COMPARTMENT & COMPLIANCE =====
  compartmentType       CompartmentType @default(PROFESSIONAL)
  
  requiresProspectus    Boolean   @default(false)
  prospectusUrl         String?
  prospectusApprovalDate DateTime?
  
  requiresPRIIPSKID     Boolean   @default(false)
  priipsKidUrl          String?
  
  requiresPPM           Boolean   @default(false)
  ppmUrl                String?
  
  cssfApproved          Boolean   @default(false)
  cssfApprovalDate      DateTime?
  cssfApprovalNumber    String?
  
  // ===== RISK DISCLOSURE =====
  riskLevel             Int       @default(5) // 1-10
  risk                  String?   // Low, Medium, High
  liquidityRisk         String?   // low, medium, high
  capitalAtRisk         Boolean   @default(true)
  risks                 Json?     // Array of risk descriptions
  
  // ===== MEDIA =====
  bannerImage           String?
  heroVideoUrl          String?
  pitchVideoUrl         String?
  teamVideoUrl          String?
  assetVideoUrl         String?
  assetImages           Json?     // Array of image URLs
  
  // ===== DEAL DATA =====
  financials            Json?
  marketData            Json?
  marketHighlights      Json?
  strategies            Json?
  team                  Json?
  timeline              Json?
  trackRecord           Json?
  caseStudies           Json?
  currentProperties     Json?
  specialOpportunity    Json?
  
  // ===== STATUS =====
  status                DealStatus @default(DRAFT)
  launchDate            DateTime?
  closeDate             DateTime?
  investorCount         Int       @default(0)
  
  // ===== GEOGRAPHIC RESTRICTIONS =====
  allowedCountries      String[]  // Empty = all allowed
  blockedCountries      String[]
  allowedInvestorTypes  InvestorType[]
  
  // ===== TIMESTAMPS =====
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt
  publishedAt           DateTime?
  
  // ===== RELATIONS =====
  investments           Investment[]
  orders                Order[]
  documents             DealDocument[]
  updates               DealUpdate[]
  comments              DealComment[]
  watchedBy             Watchlist[]
  
  @@map("deals")
}

enum CompartmentType {
  PROFESSIONAL
  RETAIL
}

enum DealStatus {
  DRAFT
  PENDING_APPROVAL
  ACTIVE
  FUNDED
  CLOSED
  CANCELLED
}
```

---

## 3. INVESTMENT MODEL

Tracks user investments in deals.

```prisma
model Investment {
  id                    String    @id @default(uuid())
  
  userId                String
  dealId                String
  
  // ===== INVESTMENT DETAILS =====
  amount                Decimal   @db.Decimal(18, 2)
  tokens                Int?      // Number of tokens/shares
  tokenPrice            Decimal?  @db.Decimal(18, 2)
  currency              String    @default("EUR")
  
  // ===== STATUS =====
  status                InvestmentStatus @default(PENDING)
  currentStep           InvestmentStep @default(VERIFY_IDENTITY)
  stepDeadline          DateTime?
  
  // ===== COMPLIANCE SIGN-OFFS =====
  kycVerified           Boolean   @default(false)
  suitabilityConfirmed  Boolean   @default(false)
  documentsAcknowledged Boolean   @default(false)
  riskDisclosureSigned  Boolean   @default(false)
  termsAccepted         Boolean   @default(false)
  termsAcceptedAt       DateTime?
  
  // ===== RETURNS =====
  totalReturns          Decimal   @default(0) @db.Decimal(18, 2)
  lastDistribution      Decimal?  @db.Decimal(18, 2)
  lastDistributionDate  DateTime?
  
  // ===== TIMESTAMPS =====
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt
  completedAt           DateTime?
  cancelledAt           DateTime?
  
  // ===== RELATIONS =====
  user                  User      @relation(fields: [userId], references: [id])
  deal                  Deal      @relation(fields: [dealId], references: [id])
  orders                Order[]
  distributions         Distribution[]
  
  @@unique([userId, dealId])
  @@map("investments")
}

enum InvestmentStatus {
  PENDING
  IN_PROGRESS
  FUNDED
  ACTIVE
  COMPLETED
  CANCELLED
  REFUNDED
}

enum InvestmentStep {
  VERIFY_IDENTITY
  SELECT_DEAL
  REVIEW_DOCUMENTS
  PAYMENT_PROCESSING
  FUNDS_IN_ESCROW
  INVESTMENT_COMPLETE
}
```

---

## 4. ORDER MODEL

For buy/sell orders in secondary market.

```prisma
model Order {
  id                    String    @id @default(uuid())
  transactionId         String    @unique // TXN-2024-00142
  
  userId                String
  dealId                String
  investmentId          String?
  
  // ===== ORDER DETAILS =====
  orderType             OrderType // BUY, SELL
  tokens                Int
  pricePerToken         Decimal   @db.Decimal(18, 2)
  totalAmount           Decimal   @db.Decimal(18, 2)
  fees                  Decimal   @default(0) @db.Decimal(18, 2)
  currency              String    @default("EUR")
  
  // ===== STATUS =====
  status                OrderStatus @default(PENDING)
  filledTokens          Int       @default(0)
  
  // ===== EXPIRY =====
  expiresAt             DateTime?
  
  // ===== TIMESTAMPS =====
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt
  executedAt            DateTime?
  cancelledAt           DateTime?
  
  // ===== RELATIONS =====
  user                  User      @relation(fields: [userId], references: [id])
  deal                  Deal      @relation(fields: [dealId], references: [id])
  investment            Investment? @relation(fields: [investmentId], references: [id])
  
  @@map("orders")
}

enum OrderType {
  BUY
  SELL
}

enum OrderStatus {
  PENDING
  ACTIVE
  PARTIAL
  COMPLETED
  CANCELLED
  EXPIRED
}
```

---

## 5. WALLET & TRANSFER MODELS

```prisma
model Wallet {
  id                    String    @id @default(uuid())
  userId                String
  
  // ===== WALLET INFO =====
  type                  WalletType @default(FIAT)
  currency              String    @default("EUR")
  balance               Decimal   @default(0) @db.Decimal(18, 2)
  pendingBalance        Decimal   @default(0) @db.Decimal(18, 2)
  
  // ===== CRYPTO WALLET (if applicable) =====
  walletAddress         String?
  chainId               String?
  
  // ===== STATUS =====
  isActive              Boolean   @default(true)
  
  // ===== TIMESTAMPS =====
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt
  
  // ===== RELATIONS =====
  user                  User      @relation(fields: [userId], references: [id])
  transfers             Transfer[]
  
  @@unique([userId, type, currency])
  @@map("wallets")
}

model Transfer {
  id                    String    @id @default(uuid())
  reference             String    @unique
  
  userId                String
  walletId              String?
  
  // ===== TRANSFER DETAILS =====
  type                  TransferType // DEPOSIT, WITHDRAWAL, INVESTMENT, DISTRIBUTION, FEE
  amount                Decimal   @db.Decimal(18, 2)
  currency              String    @default("EUR")
  
  // ===== BANK DETAILS =====
  bankName              String?
  accountLast4          String?
  
  // ===== STATUS =====
  status                TransferStatus @default(PENDING)
  
  // ===== NOTES =====
  notes                 String?
  
  // ===== TIMESTAMPS =====
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt
  completedAt           DateTime?
  
  // ===== RELATIONS =====
  user                  User      @relation(fields: [userId], references: [id])
  wallet                Wallet?   @relation(fields: [walletId], references: [id])
  
  @@map("transfers")
}

enum WalletType {
  FIAT
  CRYPTO
}

enum TransferType {
  DEPOSIT
  WITHDRAWAL
  INVESTMENT
  DISTRIBUTION
  FEE
  REFUND
}

enum TransferStatus {
  PENDING
  PROCESSING
  COMPLETED
  FAILED
  CANCELLED
}
```

---

## 6. SUPPORTING MODELS

```prisma
model Distribution {
  id                    String    @id @default(uuid())
  investmentId          String
  
  amount                Decimal   @db.Decimal(18, 2)
  currency              String    @default("EUR")
  type                  String    // dividend, interest, capital_return
  
  status                TransferStatus @default(PENDING)
  paidAt                DateTime?
  
  createdAt             DateTime  @default(now())
  
  investment            Investment @relation(fields: [investmentId], references: [id])
  
  @@map("distributions")
}

model Watchlist {
  id                    String    @id @default(uuid())
  userId                String
  dealId                String
  
  createdAt             DateTime  @default(now())
  
  user                  User      @relation(fields: [userId], references: [id])
  deal                  Deal      @relation(fields: [dealId], references: [id])
  
  @@unique([userId, dealId])
  @@map("watchlist")
}

model Notification {
  id                    String    @id @default(uuid())
  userId                String
  
  type                  String    // investment, payout, system, marketing
  title                 String
  message               String
  data                  Json?
  
  read                  Boolean   @default(false)
  readAt                DateTime?
  
  createdAt             DateTime  @default(now())
  
  user                  User      @relation(fields: [userId], references: [id])
  
  @@map("notifications")
}
```

---

## 7. CLERK WEBHOOK SYNC

### Webhook Events to Handle

| Event | Action |
|-------|--------|
| `user.created` | Create User record with clerkUserId, email, name |
| `user.updated` | Update email, name, avatar, phone |
| `user.deleted` | Soft delete or deactivate user |
| `session.created` | Update lastLoginAt |

### Sync Flow

```
Clerk Auth ─────► Webhook ─────► Backend API ─────► Prisma/PostgreSQL
     │                               │
     │                               ▼
     │                    ┌──────────────────┐
     │                    │  User Table      │
     │                    │  - clerkUserId   │
     │                    │  - email         │
     │                    │  - fullName      │
     │                    │  - avatarUrl     │
     │                    │  - + all fields  │
     │                    └──────────────────┘
     │
     └───► Frontend reads from Clerk for auth
           Backend reads from DB for business data
```

---

## 8. MIGRATION STRATEGY

### Phase 1: Create Schema
1. Add all new models to `schema.prisma`
2. Run `npx prisma db push` to create tables
3. Generate Prisma client

### Phase 2: Seed Existing Data
1. Sync existing Clerk users to User table
2. Import deals from Supabase deals table
3. Link early_access_submissions to users

### Phase 3: Add Webhooks
1. Register Clerk webhook endpoint
2. Implement user sync on auth events
3. Test user creation/update flow

### Phase 4: API Endpoints
1. User profile CRUD
2. Investment creation
3. Order management
4. Wallet operations

---

## 9. DASHBOARD DATA REQUIREMENTS

| Page | Data Needed |
|------|-------------|
| **Dashboard** | totalInvested, totalReturns, activeInvestments, availableBalance |
| **Portfolio** | investments[], holdings, performance, returns |
| **Earnings** | distributions[], upcomingPayouts, totalEarnings |
| **Wallet** | wallets[], transfers[], balance |
| **Settings** | full user profile, preferences, verification status |
| **KYC** | kycStatus, documents, verification steps |
| **Deals** | deals[], filters, watchlist |
| **Orders** | orders[], history, pending |

---

## Next Steps

1. ✅ Review and approve this plan
2. 🔲 Create Prisma schema
3. 🔲 Run migrations
4. 🔲 Add Clerk webhook sync
5. 🔲 Create API endpoints
6. 🔲 Connect frontend to real data
